"use client";

import { useEffect, useState, useCallback } from "react";

interface Entry {
  name: string;
  score: number;
  timestamp: number;
}

export default function SonuclarPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/api/scores?all=1", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as Entry[];
        setEntries(data);
      }
    } catch {
      // keep previous data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function downloadCsv() {
    const header = "Sira,Ad Soyad,Puan,Tarih\n";
    const rows = entries
      .map((e, i) => {
        const name = `"${e.name.replace(/"/g, '""')}"`;
        const date = new Date(e.timestamp).toLocaleString("tr-TR");
        return `${i + 1},${name},${e.score},"${date}"`;
      })
      .join("\n");
    const blob = new Blob(["﻿" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dmm-liderlik-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = query.trim()
    ? entries.filter((e) => e.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")))
    : entries;

  return (
    <main
      className="min-h-screen overflow-y-auto"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              DMM Gençlik Zirvesi 2025 — Tüm Sonuçlar
            </p>
            <h1 className="text-3xl font-black text-white">
              Liderlik Tablosu{" "}
              <span className="text-white/40 text-xl font-normal">({entries.length} kayıt)</span>
            </h1>
          </div>
          <button
            onClick={downloadCsv}
            disabled={entries.length === 0}
            className="px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            CSV İndir
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Ad soyad ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 mb-5 rounded-xl outline-none text-white text-sm"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
        />

        {loading ? (
          <div className="text-white/40 animate-pulse text-center py-12">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/40 text-center py-12">Kayıt bulunamadı.</div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Table header */}
            <div
              className="grid grid-cols-[60px_1fr_80px_140px] gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/50"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div>Sıra</div>
              <div>Ad Soyad</div>
              <div className="text-right">Puan</div>
              <div className="text-right">Tarih</div>
            </div>
            {/* Rows */}
            {filtered.map((entry) => {
              const rank = entries.indexOf(entry) + 1;
              return (
                <div
                  key={`${entry.name}-${entry.timestamp}`}
                  className="grid grid-cols-[60px_1fr_80px_140px] gap-2 px-4 py-3 text-sm items-center"
                  style={{
                    background: rank % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="font-black" style={{ color: rank <= 3 ? "#a78bfa" : "rgba(255,255,255,0.4)" }}>
                    {rank}
                  </div>
                  <div className="text-white font-medium truncate">{entry.name}</div>
                  <div className="text-right font-bold" style={{ color: "#a78bfa" }}>
                    {entry.score}
                  </div>
                  <div className="text-right text-white/40 text-xs">
                    {new Date(entry.timestamp).toLocaleString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
