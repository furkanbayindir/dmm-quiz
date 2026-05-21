import { NextRequest, NextResponse } from "next/server";
import { addScore, getTopScores, getAllScores } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const all = new URL(req.url).searchParams.has("all");
    const entries = all ? await getAllScores() : await getTopScores(10);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("GET /api/scores error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, score } = body as { name: string; score: number };

    if (!name || typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }

    await addScore(name.trim(), score);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/scores error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
