import { env } from "@/lib/env";

type JsonObject = Record<string, unknown>;

export type LeadConnectorResolvedPipeline = {
  pipelineId: string;
  pipelineName: string;
  stageId: string;
  stageName: string;
};

export type LeadConnectorSyncResult = {
  crmSyncStatus: "not_attempted" | "success" | "partial_success" | "failed";
  crmContactId?: string;
  crmTagsAdded: string[];
  crmTagSyncStatus: "not_attempted" | "success" | "failed";
  crmOpportunitySyncStatus:
    | "not_attempted"
    | "success"
    | "failed"
    | "failed_pipeline_stage_resolution";
  crmOpportunityId?: string;
  crmPipelineId?: string;
  crmPipelineName?: string;
  crmPipelineStageId?: string;
  crmPipelineStageName?: string;
  crmSyncedAt?: Date;
  crmSyncError?: string;
  crmSyncWarnings: string[];
  crmLastPayloadSummary?: JsonObject;
  crmLastResponseSummary?: JsonObject;
};

type InquiryForCrm = {
  _id?: unknown;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: Date | string;
  eventStartTime?: string;
  venue?: string;
  eventThemeOrColors?: string;
  budgetRange?: string;
  guestCount?: number;
  installationTime?: string;
  strikeTime?: string;
  inspirationNotes?: string;
  servicesNeeded?: string[];
  source?: string;
};

type LeadConnectorRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
};

const defaultTags = ["website-inquiry", "event-inquiry", "divine-decor", "new-lead"];

function requireLeadConnectorConfig() {
  if (!env.leadConnectorPrivateIntegrationToken) {
    throw new Error("LeadConnector private integration token is not configured.");
  }

  if (!env.leadConnectorLocationId) {
    throw new Error("LeadConnector location ID is not configured.");
  }
}

function buildUrl(path: string) {
  const base = env.leadConnectorApiBase.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function getNestedString(value: unknown, paths: string[][]) {
  for (const path of paths) {
    let cursor: unknown = value;

    for (const segment of path) {
      cursor = asObject(cursor)[segment];
    }

    if (typeof cursor === "string" && cursor.trim()) {
      return cursor.trim();
    }
  }

  return "";
}

function findArray(value: unknown, keys: string[]): unknown[] {
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

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

function getEntityId(value: unknown) {
  return getNestedString(value, [["id"], ["_id"]]);
}

function getEntityName(value: unknown) {
  return getNestedString(value, [["name"], ["title"]]);
}

function parseTagsFromEnv() {
  const tags = env.leadConnectorTriggerTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return tags.length ? tags : defaultTags;
}

function parseBudgetValue(budgetRange?: string) {
  if (!budgetRange) {
    return undefined;
  }

  const numbers = budgetRange.match(/\d[\d,]*/g)?.map((value) => Number(value.replaceAll(",", "")));

  if (!numbers?.length || numbers.some((value) => Number.isNaN(value))) {
    return undefined;
  }

  return Math.max(...numbers);
}

function summarizeError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown LeadConnector error";
}

function summarizeResponse(value: unknown): JsonObject {
  const object = asObject(value);
  return {
    id: getEntityId(object),
    contactId: getNestedString(object, [["contact", "id"], ["contact", "_id"], ["contactId"]]),
    opportunityId: getNestedString(object, [
      ["opportunity", "id"],
      ["opportunity", "_id"],
      ["id"],
      ["data", "id"],
    ]),
    keys: Object.keys(object).slice(0, 20),
  };
}

export async function leadConnectorRequest(
  path: string,
  options: LeadConnectorRequestOptions = {},
) {
  requireLeadConnectorConfig();

  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      Authorization: `Bearer ${env.leadConnectorPrivateIntegrationToken}`,
      Version: env.leadConnectorApiVersion,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text.slice(0, 500) };
    }
  }

  if (!response.ok) {
    const message =
      getNestedString(data, [["message"], ["error"], ["msg"]]) ||
      `LeadConnector request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function upsertLeadConnectorContact(inquiry: InquiryForCrm) {
  const firstName = inquiry.firstName ?? "";
  const lastName = inquiry.lastName ?? "";
  const name = inquiry.fullName || `${firstName} ${lastName}`.trim();
  const payload = {
    locationId: env.leadConnectorLocationId,
    firstName,
    lastName,
    name,
    email: inquiry.email,
    phone: inquiry.phone,
    source: "Divine Decor Website",
  };
  const response = await leadConnectorRequest("/contacts/upsert", {
    method: "POST",
    body: payload,
  });
  const contactId = getNestedString(response, [
    ["contact", "id"],
    ["contact", "_id"],
    ["id"],
    ["data", "id"],
  ]);

  if (!contactId) {
    throw new Error("LeadConnector contact upsert response did not include a contact ID.");
  }

  return { contactId, payload, response };
}

export async function addLeadConnectorTags(contactId: string, tags = parseTagsFromEnv()) {
  const payload = { tags };
  const response = await leadConnectorRequest(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: payload,
  });

  return { tags, payload, response };
}

export async function getLeadConnectorPipelines() {
  try {
    return await leadConnectorRequest("/opportunities/pipelines");
  } catch (error) {
    if (!env.leadConnectorLocationId) {
      throw error;
    }

    const query = new URLSearchParams({ locationId: env.leadConnectorLocationId });
    return leadConnectorRequest(`/opportunities/pipelines?${query.toString()}`);
  }
}

export async function resolveLeadConnectorPipelineAndStage(): Promise<LeadConnectorResolvedPipeline> {
  if (env.leadConnectorPipelineId && env.leadConnectorPipelineStageId) {
    return {
      pipelineId: env.leadConnectorPipelineId,
      pipelineName: env.leadConnectorPipelineName,
      stageId: env.leadConnectorPipelineStageId,
      stageName: env.leadConnectorDefaultStageName,
    };
  }

  const response = await getLeadConnectorPipelines();
  const pipelines = findArray(response, ["pipelines", "pipeline", "data"]);
  const pipeline = pipelines.find(
    (item) => normalizeName(getEntityName(item)) === normalizeName(env.leadConnectorPipelineName),
  );

  if (!pipeline) {
    throw new Error(
      `LeadConnector pipeline "${env.leadConnectorPipelineName}" could not be resolved. Check token opportunity scopes or set LEADCONNECTOR_PIPELINE_ID and LEADCONNECTOR_PIPELINE_STAGE_ID manually.`,
    );
  }

  const stages = findArray(pipeline, ["stages", "stage"]);
  const stage = stages.find(
    (item) => normalizeName(getEntityName(item)) === normalizeName(env.leadConnectorDefaultStageName),
  );

  if (!stage) {
    throw new Error(
      `LeadConnector stage "${env.leadConnectorDefaultStageName}" could not be resolved. Check token opportunity scopes or set LEADCONNECTOR_PIPELINE_ID and LEADCONNECTOR_PIPELINE_STAGE_ID manually.`,
    );
  }

  const pipelineId = getEntityId(pipeline);
  const stageId = getEntityId(stage);

  if (!pipelineId || !stageId) {
    throw new Error("LeadConnector pipeline or stage response did not include required IDs.");
  }

  return {
    pipelineId,
    pipelineName: getEntityName(pipeline) || env.leadConnectorPipelineName,
    stageId,
    stageName: getEntityName(stage) || env.leadConnectorDefaultStageName,
  };
}

export async function resolvePipelineStageId() {
  const response = await getLeadConnectorPipelines();
  const pipelines = findArray(response, ["pipelines", "pipeline", "data"]);
  const pipeline = pipelines.find((item) => {
    const pipelineId = getEntityId(item);
    const pipelineName = getEntityName(item);

    return (
      pipelineId === env.leadConnectorPipelineId ||
      normalizeName(pipelineName) === normalizeName(env.leadConnectorPipelineName)
    );
  });

  if (!pipeline) {
    return {
      ok: false as const,
      matchedPipeline: null,
      matchedStage: null,
      allPipelines: pipelines.map((item) => ({
        id: getEntityId(item),
        name: getEntityName(item),
      })),
      allStages: [],
      envLineToSet: "",
      error: `No pipeline matched ID "${env.leadConnectorPipelineId || "(not set)"}" or name "${env.leadConnectorPipelineName}".`,
    };
  }

  const stages = findArray(pipeline, ["stages", "stage"]).map((stage) => ({
    id: getEntityId(stage),
    name: getEntityName(stage),
  }));
  const matchedStage =
    stages.find(
      (stage) => normalizeName(stage.name) === normalizeName(env.leadConnectorDefaultStageName),
    ) ?? null;
  const matchedPipeline = {
    id: getEntityId(pipeline),
    name: getEntityName(pipeline),
  };

  if (!matchedStage) {
    return {
      ok: false as const,
      matchedPipeline,
      matchedStage: null,
      allPipelines: pipelines.map((item) => ({
        id: getEntityId(item),
        name: getEntityName(item),
      })),
      allStages: stages,
      envLineToSet: "",
      error: `Pipeline matched, but no stage matched "${env.leadConnectorDefaultStageName}".`,
    };
  }

  return {
    ok: true as const,
    matchedPipeline,
    matchedStage,
    allPipelines: pipelines.map((item) => ({
      id: getEntityId(item),
      name: getEntityName(item),
    })),
    allStages: stages,
    envLineToSet: `LEADCONNECTOR_PIPELINE_STAGE_ID=${matchedStage.id}`,
    error: "",
  };
}

export async function upsertLeadConnectorOpportunity(
  inquiry: InquiryForCrm,
  contactId: string,
  resolvedPipeline: LeadConnectorResolvedPipeline,
) {
  const monetaryValue = parseBudgetValue(inquiry.budgetRange);
  const name = `${inquiry.fullName || "Website Lead"} - ${inquiry.eventType || "Event Inquiry"}`;
  const payload: JsonObject = {
    locationId: env.leadConnectorLocationId,
    contactId,
    pipelineId: resolvedPipeline.pipelineId,
    pipelineStageId: resolvedPipeline.stageId,
    name,
    status: "open",
    source: "Divine Decor Website",
  };

  if (typeof monetaryValue === "number") {
    payload.monetaryValue = monetaryValue;
  }

  const response = await leadConnectorRequest("/opportunities/upsert", {
    method: "POST",
    body: payload,
  });
  const opportunityId = getNestedString(response, [
    ["opportunity", "id"],
    ["opportunity", "_id"],
    ["id"],
    ["data", "id"],
  ]);

  if (!opportunityId) {
    throw new Error("LeadConnector opportunity upsert response did not include an opportunity ID.");
  }

  return { opportunityId, payload, response };
}

export async function syncInquiryToLeadConnector(
  inquiry: InquiryForCrm,
): Promise<LeadConnectorSyncResult> {
  const result: LeadConnectorSyncResult = {
    crmSyncStatus: "not_attempted",
    crmTagsAdded: [],
    crmTagSyncStatus: "not_attempted",
    crmOpportunitySyncStatus: "not_attempted",
    crmSyncWarnings: [],
    crmLastPayloadSummary: {
      locationId: env.leadConnectorLocationId,
      pipelineName: env.leadConnectorPipelineName,
      stageName: env.leadConnectorDefaultStageName,
      inquiryId: inquiry._id ? String(inquiry._id) : "",
    },
  };

  if (!env.leadConnectorEnabled) {
    result.crmSyncError = "LeadConnector sync is disabled.";
    return result;
  }

  try {
    const contact = await upsertLeadConnectorContact(inquiry);
    result.crmContactId = contact.contactId;
    result.crmLastResponseSummary = {
      contact: summarizeResponse(contact.response),
    };

    try {
      const tags = await addLeadConnectorTags(contact.contactId);
      result.crmTagsAdded = tags.tags;
      result.crmTagSyncStatus = "success";
      result.crmLastResponseSummary = {
        ...result.crmLastResponseSummary,
        tags: summarizeResponse(tags.response),
      };
    } catch (error) {
      result.crmTagSyncStatus = "failed";
      result.crmSyncWarnings.push(`Tag sync failed: ${summarizeError(error)}`);
    }

    let resolvedPipeline: LeadConnectorResolvedPipeline;

    try {
      resolvedPipeline = await resolveLeadConnectorPipelineAndStage();
      result.crmPipelineId = resolvedPipeline.pipelineId;
      result.crmPipelineName = resolvedPipeline.pipelineName;
      result.crmPipelineStageId = resolvedPipeline.stageId;
      result.crmPipelineStageName = resolvedPipeline.stageName;
    } catch (error) {
      result.crmOpportunitySyncStatus = "failed_pipeline_stage_resolution";
      result.crmSyncStatus = "partial_success";
      result.crmSyncError = summarizeError(error);
      console.error("[leadconnector] pipeline/stage resolution failed", result.crmSyncError);
      return { ...result, crmSyncedAt: new Date() };
    }

    try {
      const opportunity = await upsertLeadConnectorOpportunity(
        inquiry,
        contact.contactId,
        resolvedPipeline,
      );
      result.crmOpportunityId = opportunity.opportunityId;
      result.crmOpportunitySyncStatus = "success";
      result.crmLastPayloadSummary = {
        ...result.crmLastPayloadSummary,
        opportunity: {
          pipelineId: resolvedPipeline.pipelineId,
          pipelineStageId: resolvedPipeline.stageId,
          status: "open",
          hasMonetaryValue: Object.hasOwn(opportunity.payload, "monetaryValue"),
        },
      };
      result.crmLastResponseSummary = {
        ...result.crmLastResponseSummary,
        opportunity: summarizeResponse(opportunity.response),
      };
    } catch (error) {
      result.crmOpportunitySyncStatus = "failed";
      result.crmSyncError = summarizeError(error);
    }

    result.crmSyncStatus =
      result.crmOpportunitySyncStatus === "success" && result.crmTagSyncStatus !== "failed"
        ? "success"
        : "partial_success";
    result.crmSyncedAt = new Date();
    return result;
  } catch (error) {
    result.crmSyncStatus = "failed";
    result.crmTagSyncStatus = "not_attempted";
    result.crmOpportunitySyncStatus = "not_attempted";
    result.crmSyncError = summarizeError(error);
    result.crmSyncedAt = new Date();
    return result;
  }
}

export function summarizeLeadConnectorPipelines(response: unknown) {
  return findArray(response, ["pipelines", "pipeline", "data"]).map((pipeline) => {
    const stages = findArray(pipeline, ["stages", "stage"]);

    return {
      id: getEntityId(pipeline),
      name: getEntityName(pipeline),
      totalStages: stages.length,
      stages: stages.map((stage) => ({
        id: getEntityId(stage),
        name: getEntityName(stage),
      })),
    };
  });
}
