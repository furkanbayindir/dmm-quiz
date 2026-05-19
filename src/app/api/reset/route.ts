import { NextRequest, NextResponse } from "next/server";
import { redis, LEADERBOARD_KEY } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-reset-token");
  if (token !== process.env.RESET_SECRET) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  await redis.del(LEADERBOARD_KEY);
  return NextResponse.json({ success: true, message: "Liderlik tablosu sıfırlandı." });
}
