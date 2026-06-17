import dns from "node:dns";
import mongoose from "mongoose";

import { env, isDatabaseConfigured } from "@/lib/env";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = globalCache;

function getMongoUri() {
  const rawUri = env.mongodbUri as string;
  const parsed = new URL(rawUri);

  if (
    parsed.protocol === "mongodb+srv:" &&
    parsed.hostname === "ddd.hvvhbbq.mongodb.net"
  ) {
    const searchParams = new URLSearchParams(parsed.search);
    searchParams.set("authSource", searchParams.get("authSource") ?? "admin");
    searchParams.set(
      "replicaSet",
      searchParams.get("replicaSet") ?? "atlas-z4iw35-shard-0",
    );
    searchParams.set("tls", searchParams.get("tls") ?? "true");

    const hosts = [
      "ac-urntd8h-shard-00-00.hvvhbbq.mongodb.net:27017",
      "ac-urntd8h-shard-00-01.hvvhbbq.mongodb.net:27017",
      "ac-urntd8h-shard-00-02.hvvhbbq.mongodb.net:27017",
    ].join(",");

    return `mongodb://${parsed.username}:${parsed.password}@${hosts}${parsed.pathname}?${searchParams.toString()}`;
  }

  return rawUri;
}

export async function connectToDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(getMongoUri(), {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error) => {
        globalCache.promise = null;
        throw error;
      });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
