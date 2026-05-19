"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Entry {
  name: string;
  score: number;
  timestamp: number;
}

const REFRESH_INTERVAL = 5000;

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const RANK_LABELS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch("/api/scores", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json() as Entry[];
        setEntries(data);
        setLastUpdated(new Date());
      }
    } catch {
      // keep previous data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchScores]);

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)" }}
    >
      <div
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col flex-1 px-8 py-8 max-w-3xl mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center px-4 py-2">
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse 85% 100% at center, rgba(255,255,255,0.12) 0%, transparent 100%)" }} />
            <Image
              src="/dmm-logo.png"
              alt="DMM — Dezenformasyonla Mücadele Merkezi | İletişim Başkanlığı"
              width={220}
              height={36}
              className="relative object-contain h-9 w-auto"
              priority
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">DMM Gençlik Zirvesi 2025</p>
            <h1 className="text-4xl font-black" style={{ textShadow: "0 0 30px rgba(124,58,237,0.5)" }}>
              Liderlik Tablosu
            </h1>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white/50 hover:text-white/80 transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ← Ana Sayfa
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/40 animate-pulse text-lg">Yükleniyor...</div>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-6xl opacity-30">🏆</div>
            <p className="text-white/40 text-lg">Henüz kayıt yok. İlk sen ol!</p>
            <button
              onClick={() => router.push("/register")}
              className="mt-4 px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
            >
              Yarışmaya Katıl
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {entries.map((entry, index) => (
              <div
                key={`${entry.name}-${entry.timestamp}`}
                className="flex items-center gap-5 px-6 py-5 rounded-2xl transition-all"
                style={{
                  background: index < 3
                    ? `rgba(${index === 0 ? "255,215,0" : index === 1 ? "192,192,192" : "205,127,50"},0.08)`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${index < 3
                    ? `rgba(${index === 0 ? "255,215,0" : index === 1 ? "192,192,192" : "205,127,50"},0.3)`
                    : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {/* Rank */}
                <div className="w-10 flex-shrink-0 text-center">
                  {index < 3 ? (
                    <span className="text-2xl">{RANK_LABELS[index]}</span>
                  ) : (
                    <span className="text-lg font-black text-white/30">#{index + 1}</span>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-lg truncate"
                    style={{ color: index < 3 ? RANK_COLORS[index] : "white" }}
                  >
                    {entry.name}
                  </p>
                </div>

                {/* Score */}
                <div
                  className="text-2xl font-black flex-shrink-0"
                  style={{ color: index < 3 ? RANK_COLORS[index] : "#a78bfa" }}
                >
                  {entry.score}
                  <span className="text-sm font-normal text-white/30 ml-1">pt</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-white/20 text-xs">
            {lastUpdated
              ? `Son güncelleme: ${lastUpdated.toLocaleTimeString("tr-TR")}`
              : ""}
          </p>
          <p className="text-white/20 text-xs">Her 5 saniyede güncellenir</p>
        </div>

        {/* Play button */}
        <button
          onClick={() => router.push("/register")}
          className="mt-4 w-full py-5 text-xl font-black rounded-2xl tracking-wide transition-all duration-150 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
            boxShadow: "0 0 30px rgba(124,58,237,0.3)",
          }}
        >
          Yarışmaya Katıl
        </button>
      </div>
    </main>
  );
}
