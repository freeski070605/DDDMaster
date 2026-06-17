import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import { resolvePipelineStageId } from "@/lib/server/leadconnector";

export async function GET() {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await resolvePipelineStageId();
    return NextResponse.json(result, { status: result.ok ? 200 : 404 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch LeadConnector pipelines.";
    const permissionHint =
      message.includes("401") || message.includes("403") || /unauthor/i.test(message)
        ? "Private Integration Token is missing permissions. It likely needs opportunities.readonly access to read pipelines/stages."
        : "";

    return NextResponse.json(
      {
        ok: false,
        error: permissionHint || message,
      },
      { status: 400 },
    );
  }
}
