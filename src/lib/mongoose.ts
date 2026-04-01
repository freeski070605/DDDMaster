import mongoose from "mongoose";

import { env, isDatabaseConfigured } from "@/lib/env";

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

export async function connectToDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(env.mongodbUri as string, {
      bufferCommands: false,
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
