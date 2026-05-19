"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getResultMessage(score: number): { title: string; subtitle: string } {
  if (score === 100) return { title: "Mükemmel!", subtitle: "Tam puan! Sen gerçek bir medya okuryazarısın." };
  if (score >= 80) return { title: "Harika!", subtitle: "Dezenformasyona karşı güçlü bir duruşun var." };
  if (score >= 60) return { title: "İyi İş!", subtitle: "Medya okuryazarlığında iyi bir seviyedesin." };
  if (score >= 40) return { title: "Fena Değil", subtitle: "Biraz daha pratikle uzman olabilirsin!" };
  return { title: "Devam Et!", subtitle: "Her denemede daha fazlasını öğrenirsin." };
}

export default function ResultPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    const playerName = sessionStorage.getItem("playerName");
    const finalScore = sessionStorage.getItem("finalScore");

    if (!playerName || finalScore === null) {
      router.replace("/");
      return;
    }

    const parsedScore = parseInt(finalScore, 10);
    setName(playerName);
    setScore(parsedScore);

    async function saveAndGetRank() {
      try {
        await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: playerName, score: parsedScore }),
        });

        const res = await fetch("/api/scores");
        const entries = await res.json() as { name: string; score: number }[];
        const myRank = entries.findIndex((e) => e.name === playerName && e.score === parsedScore);
        if (myRank !== -1) setRank(myRank + 1);
      } catch {
        // score saved locally even if API fails
      } finally {
        setSaving(false);
      }
    }

    saveAndGetRank();
  }, [router]);

  function playAgain() {
    sessionStorage.removeItem("finalScore");
    router.push("/register");
  }

  const { title, subtitle } = getResultMessage(score);
  const percentage = (score / 100) * 100;

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)" }}
    >
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* Score circle */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="absolute" width="192" height="192" viewBox="0 0 192 192">
            <circle cx="96" cy="96" r="84" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle
              cx="96"
              cy="96"
              r="84"
              fill="none"
              stroke={score >= 60 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={2 * Math.PI * 84 * (1 - percentage / 100)}
              transform="rotate(-90 96 96)"
              style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white">{score}</span>
            <span className="text-white/40 text-sm font-semibold">/ 100</span>
          </div>
        </div>

        {/* Name */}
        <p className="text-white/50 text-sm mb-1 uppercase tracking-widest">Tebrikler</p>
        <h2 className="text-3xl font-black mb-1">{name}</h2>
        <h3 className="text-2xl font-bold mb-2" style={{ color: "#a78bfa" }}>{title}</h3>
        <p className="text-white/60 mb-6">{subtitle}</p>

        {/* Rank */}
        {!saving && rank !== null && (
          <div
            className="px-6 py-3 rounded-2xl mb-6"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)" }}
          >
            <span className="text-white/60 text-sm">Liderlik Tablosu Sıralaması: </span>
            <span className="font-black text-lg" style={{ color: "#a78bfa" }}>#{rank}</span>
          </div>
        )}
        {saving && (
          <div className="text-white/30 text-sm mb-6 animate-pulse">Sonuç kaydediliyor...</div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={playAgain}
            className="w-full py-5 text-xl font-black rounded-2xl tracking-wide transition-all duration-150 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
            }}
          >
            Tekrar Oyna
          </button>
          <button
            onClick={() => router.push("/leaderboard")}
            className="w-full py-4 text-base font-semibold rounded-2xl transition-all duration-150 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Liderlik Tablosunu Gör
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </main>
  );
}
