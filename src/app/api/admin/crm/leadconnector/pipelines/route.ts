import { NextResponse } from "next/server";

import { readAdminSession } from "@/lib/auth";
import {
  getLeadConnectorPipelines,
  summarizeLeadConnectorPipelines,
} from "@/lib/server/leadconnector";

export async function GET() {
  const session = await readAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const response = await getLeadConnectorPipelines();
    return NextResponse.json({
      success: true,
      pipelines: summarizeLeadConnectorPipelines(response),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to fetch LeadConnector pipelines.",
      },
      { status: 400 },
    );
  }
}
