import { NextResponse } from "next/server";

export function GET(
  _request: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  return params.then(({ formId }) =>
    NextResponse.redirect(`https://api.leadconnectorhq.com/widget/form/${formId}`),
  );
}
