import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env.local");

function loadEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const content = readFileSync(path, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ??= value;
  }
}

function getEnv(name, fallback = "") {
  return process.env[name]?.trim() || fallback;
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getNestedString(value, paths) {
  for (const path of paths) {
    let cursor = value;

    for (const segment of path) {
      cursor = asObject(cursor)[segment];
    }

    if (typeof cursor === "string" && cursor.trim()) {
      return cursor.trim();
    }
  }

  return "";
}

function findArray(value, keys) {
  if (Array.isArray(value)) {
    return value;
  }

  const object = asObject(value);

  for (const key of keys) {
    const nested = object[key];

    if (Array.isArray(nested)) {
      return nested;
    }

    if (nested && typeof nested === "object") {
      const nestedArray = findArray(nested, keys);

      if (nestedArray.length) {
        return nestedArray;
      }

      if (key === "pipeline" || key === "stage") {
        return [nested];
      }
    }
  }

  return [];
}

function getEntityId(value) {
  return getNestedString(value, [["id"], ["_id"]]);
}

function getEntityName(value) {
  return getNestedString(value, [["name"], ["title"]]);
}

function normalizeName(value) {
  return value.trim().toLowerCase();
}

function summarizeShape(value) {
  const object = asObject(value);

  return {
    topLevelKeys: Object.keys(object),
    dataKeys: Object.keys(asObject(object.data)),
    pipelinesCount: findArray(value, ["pipelines", "pipeline", "data"]).length,
  };
}

async function requestPipelines() {
  const apiBase = getEnv("LEADCONNECTOR_API_BASE", "https://services.leadconnectorhq.com").replace(
    /\/$/,
    "",
  );
  const apiVersion = getEnv("LEADCONNECTOR_API_VERSION", "2023-02-21");
  const token = getEnv("LEADCONNECTOR_PRIVATE_INTEGRATION_TOKEN");

  if (!token) {
    throw new Error("LEADCONNECTOR_PRIVATE_INTEGRATION_TOKEN is missing from .env.local.");
  }

  async function fetchPipelines(url) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: apiVersion,
        Accept: "application/json",
      },
    });
  }

  let response = await fetchPipelines(`${apiBase}/opportunities/pipelines`);

  if (response.status === 422 && getEnv("LEADCONNECTOR_LOCATION_ID")) {
    const query = new URLSearchParams({ locationId: getEnv("LEADCONNECTOR_LOCATION_ID") });
    response = await fetchPipelines(`${apiBase}/opportunities/pipelines?${query.toString()}`);
  }

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text.slice(0, 500) };
    }
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Private Integration Token is missing permissions. It likely needs opportunities.readonly access to read pipelines/stages.",
      );
    }

    throw new Error(
      `LeadConnector pipelines request failed with status ${response.status}. Safe response shape: ${JSON.stringify(
        summarizeShape(data),
      )}`,
    );
  }

  return data;
}

loadEnvFile(envPath);

const pipelineId = getEnv("LEADCONNECTOR_PIPELINE_ID", "bQU7HSaH7lp6HXOSlyKQ");
const pipelineName = getEnv("LEADCONNECTOR_PIPELINE_NAME", "Client Revenue Pipeline");
const stageName = getEnv("LEADCONNECTOR_DEFAULT_STAGE_NAME", "New Lead");

try {
  const data = await requestPipelines();
  const pipelines = findArray(data, ["pipelines", "pipeline", "data"]);

  console.log("Pipelines returned:");
  for (const pipeline of pipelines) {
    console.log(`- ${getEntityName(pipeline) || "(unnamed)"} :: ${getEntityId(pipeline) || "(no id)"}`);
  }

  const matchedPipeline = pipelines.find((pipeline) => {
    const id = getEntityId(pipeline);
    const name = getEntityName(pipeline);

    return id === pipelineId || normalizeName(name) === normalizeName(pipelineName);
  });

  if (!matchedPipeline) {
    console.error(`\nNo pipeline matched ID "${pipelineId}" or name "${pipelineName}".`);
    process.exitCode = 1;
  } else {
    const stages = findArray(matchedPipeline, ["stages", "stage"]).map((stage) => ({
      id: getEntityId(stage),
      name: getEntityName(stage),
    }));

    console.log(`\nStages for ${getEntityName(matchedPipeline)} (${getEntityId(matchedPipeline)}):`);
    for (const stage of stages) {
      console.log(`- ${stage.name || "(unnamed)"} :: ${stage.id || "(no id)"}`);
    }

    const matchedStage = stages.find(
      (stage) => normalizeName(stage.name) === normalizeName(stageName),
    );

    if (!matchedStage) {
      console.error(`\nPipeline matched, but no stage matched "${stageName}".`);
      process.exitCode = 1;
    } else {
      console.log("\nMatched stage:");
      console.log(`${matchedStage.name} :: ${matchedStage.id}`);
      console.log("\nCopy this into .env.local:");
      console.log(`LEADCONNECTOR_PIPELINE_STAGE_ID=${matchedStage.id}`);
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unable to find LeadConnector stage ID.");
  process.exitCode = 1;
}
