"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [consented, setConsented] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const canStart = firstName.trim().length >= 2 && lastName.trim().length >= 2 && consented;

  function handleStart() {
    if (!canStart) return;
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    sessionStorage.setItem("playerName", fullName);
    router.push("/quiz");
  }

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)",
      }}
    >
      <div
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 text-white/40 hover:text-white/70 text-sm font-medium transition-colors flex items-center gap-2"
        >
          ← Geri
        </button>

        {/* Logo */}
        <div className="mb-6 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
          <Image
            src="/cib-logo.png"
            alt="İletişim Başkanlığı"
            width={52}
            height={52}
            className="object-contain rounded-full"
            priority
          />
        </div>

        <h2 className="text-3xl font-black mb-2">Yarışmacı Bilgileri</h2>
        <p className="text-white/50 mb-8 text-sm">
          Liderlik tablosunda görünecek adın
        </p>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Adınız"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-5 py-5 text-lg font-semibold rounded-2xl outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${firstName.length >= 2 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)"}`,
              color: "white",
            }}
            maxLength={30}
          />
          <input
            type="text"
            placeholder="Soyadınız"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-5 py-5 text-lg font-semibold rounded-2xl outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${lastName.length >= 2 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)"}`,
              color: "white",
            }}
            maxLength={30}
          />
        </div>

        {/* Consent */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setShowConsent(!showConsent)}
            className="w-full text-left text-sm text-white/50 flex justify-between items-center"
          >
            <span className="font-semibold text-white/70">Kişisel Verilerin İşlenmesi</span>
            <span>{showConsent ? "▲" : "▼"}</span>
          </button>

          {showConsent && (
            <div className="mt-3 text-xs text-white/40 leading-relaxed">
              DMM Gençlik Zirvesi etkinliği kapsamında ad-soyad bilginiz yalnızca bilgi
              yarışması liderlik tablosunda gösterilmek amacıyla kullanılacak olup etkinlik
              süresinin sona ermesiyle birlikte silinecektir. Kişisel verileriniz üçüncü
              taraflarla paylaşılmayacak ve ticari amaçlarla kullanılmayacaktır. KVKK
              kapsamında haklarınızı kullanmak için etkinlik organizatörlerine başvurabilirsiniz.
            </div>
          )}

          <label className="flex items-center gap-3 mt-4 cursor-pointer">
            <div
              onClick={() => setConsented(!consented)}
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: consented ? "#7c3aed" : "rgba(255,255,255,0.1)",
                border: `2px solid ${consented ? "#7c3aed" : "rgba(255,255,255,0.2)"}`,
              }}
            >
              {consented && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm text-white/60 leading-snug">
              Kişisel verilerimin belirtilen amaçlarla işlenmesine onay veriyorum.
            </span>
          </label>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full py-5 text-xl font-black rounded-2xl tracking-wide transition-all duration-150"
          style={{
            background: canStart
              ? "linear-gradient(135deg, #7c3aed, #5b21b6)"
              : "rgba(255,255,255,0.08)",
            color: canStart ? "white" : "rgba(255,255,255,0.3)",
            boxShadow: canStart ? "0 0 30px rgba(124,58,237,0.4)" : "none",
            cursor: canStart ? "pointer" : "not-allowed",
          }}
        >
          Yarışmaya Başla →
        </button>
      </div>
    </main>
  );
}
