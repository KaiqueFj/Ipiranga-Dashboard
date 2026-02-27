import { getMonitorsByOrg } from "@/app/actions/monitors-action";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const org = searchParams.get("org") || "corp";

    const data = await getMonitorsByOrg(org);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Monitor route error:", error);
    return NextResponse.json({ error: "Error fetching monitors" }, { status: 500 });
  }
}
