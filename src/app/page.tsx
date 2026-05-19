"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl w-full">
        {/* Badge */}
        <div className="mb-6 px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase"
          style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", color: "#a78bfa" }}>
          DMM Gençlik Zirvesi 2025
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
          style={{ textShadow: "0 0 40px rgba(124,58,237,0.6)" }}
        >
          Medya
          <br />
          <span style={{ color: "#a78bfa" }}>Okuryazarlığı</span>
          <br />
          Bilgi Yarışması
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-lg leading-relaxed">
          Dezenformasyon, sahte haber ve dijital dünya kavramlarını ne kadar iyi biliyorsun?{" "}
          <span className="text-white/90 font-semibold">10 soruda</span> kendini test et!
        </p>

        {/* Stats row */}
        <div className="flex gap-8 mb-12">
          {[
            { value: "10", label: "Soru" },
            { value: "30s", label: "Süre/Soru" },
            { value: "100", label: "Max Puan" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black" style={{ color: "#a78bfa" }}>
                {stat.value}
              </div>
              <div className="text-sm text-white/50 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={() => router.push("/register")}
          className="w-full max-w-md py-6 text-2xl font-black rounded-2xl tracking-wide transition-all duration-150 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
            boxShadow: "0 0 40px rgba(124,58,237,0.5)",
          }}
        >
          BAŞLA
        </button>

        {/* Leaderboard link */}
        <button
          onClick={() => router.push("/leaderboard")}
          className="mt-6 text-white/40 hover:text-white/70 text-sm font-medium transition-colors"
        >
          Liderlik Tablosunu Görüntüle →
        </button>
      </div>
    </main>
  );
}
