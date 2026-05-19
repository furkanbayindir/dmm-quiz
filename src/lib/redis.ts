import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const LEADERBOARD_KEY = "dmm:leaderboard";

export interface LeaderboardEntry {
  name: string;
  score: number;
  timestamp: number;
}

export async function addScore(name: string, score: number): Promise<void> {
  const entry: LeaderboardEntry = { name, score, timestamp: Date.now() };
  // member is unique JSON (includes timestamp), zadd score is the quiz score for sorting
  await redis.zadd(LEADERBOARD_KEY, { score, member: JSON.stringify(entry) });
}

export async function getTopScores(count = 10): Promise<LeaderboardEntry[]> {
  const raw = await redis.zrange(LEADERBOARD_KEY, 0, -1);

  return (raw as unknown[])
    .map((member) => {
      // Upstash REST client auto-deserializes JSON strings to objects
      if (typeof member === "object" && member !== null) {
        return member as LeaderboardEntry;
      }
      if (typeof member === "string") {
        try { return JSON.parse(member) as LeaderboardEntry; } catch { return null; }
      }
      return null;
    })
    .filter((e): e is LeaderboardEntry => e !== null)
    .sort((a, b) => b.score - a.score || b.timestamp - a.timestamp)
    .slice(0, count);
}
