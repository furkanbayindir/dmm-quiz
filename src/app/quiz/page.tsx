"use client";

import { useEffect, useReducer, useCallback } from "react";
import { useRouter } from "next/navigation";
import Timer from "@/components/Timer";
import { getRandomQuestions, Question } from "@/lib/questions";

const TOTAL_TIME = 30;
const TOTAL_QUESTIONS = 10;
const POINTS_PER_CORRECT = 10;
const FEEDBACK_DELAY = 1500;

interface State {
  questions: Question[];
  currentIndex: number;
  score: number;
  selectedId: string | null;
  timeLeft: number;
  phase: "loading" | "answering" | "feedback" | "done";
}

type Action =
  | { type: "INIT"; questions: Question[] }
  | { type: "SELECT"; id: string }
  | { type: "TIMEOUT" }
  | { type: "NEXT" }
  | { type: "TICK" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT":
      return { ...state, questions: action.questions, phase: "answering", timeLeft: TOTAL_TIME };

    case "SELECT":
      if (state.phase !== "answering") return state;
      const isCorrect = action.id === state.questions[state.currentIndex].correctId;
      return {
        ...state,
        selectedId: action.id,
        score: isCorrect ? state.score + POINTS_PER_CORRECT : state.score,
        phase: "feedback",
      };

    case "TIMEOUT":
      if (state.phase !== "answering") return state;
      return { ...state, selectedId: null, phase: "feedback" };

    case "NEXT": {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= TOTAL_QUESTIONS) {
        return { ...state, phase: "done" };
      }
      return {
        ...state,
        currentIndex: nextIndex,
        selectedId: null,
        timeLeft: TOTAL_TIME,
        phase: "answering",
      };
    }

    case "TICK":
      if (state.phase !== "answering") return state;
      if (state.timeLeft <= 1) return { ...state, timeLeft: 0, selectedId: null, phase: "feedback" };
      return { ...state, timeLeft: state.timeLeft - 1 };

    default:
      return state;
  }
}

const initialState: State = {
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedId: null,
  timeLeft: TOTAL_TIME,
  phase: "loading",
};

export default function QuizPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Init questions and check player name
  useEffect(() => {
    const name = sessionStorage.getItem("playerName");
    if (!name) {
      router.replace("/register");
      return;
    }
    dispatch({ type: "INIT", questions: getRandomQuestions(TOTAL_QUESTIONS) });
  }, [router]);

  // Timer tick
  useEffect(() => {
    if (state.phase !== "answering") return;
    const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(timer);
  }, [state.phase, state.currentIndex]);

  // Auto-advance after feedback
  useEffect(() => {
    if (state.phase !== "feedback") return;
    const timer = setTimeout(() => dispatch({ type: "NEXT" }), FEEDBACK_DELAY);
    return () => clearTimeout(timer);
  }, [state.phase, state.currentIndex]);

  // Navigate to result when done
  useEffect(() => {
    if (state.phase !== "done") return;
    sessionStorage.setItem("finalScore", String(state.score));
    router.push("/result");
  }, [state.phase, state.score, router]);

  const handleSelect = useCallback(
    (id: string) => dispatch({ type: "SELECT", id }),
    []
  );

  if (state.phase === "loading" || state.questions.length === 0) {
    return (
      <main
        className="flex items-center justify-center min-h-screen"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)" }}
      >
        <div className="text-white/50 text-lg animate-pulse">Yükleniyor...</div>
      </main>
    );
  }

  const question = state.questions[state.currentIndex];
  const progress = ((state.currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  function getOptionStyle(optId: string) {
    if (state.phase !== "feedback") {
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "white",
      };
    }
    if (optId === question.correctId) {
      return {
        background: "rgba(16,185,129,0.25)",
        border: "1px solid #10b981",
        color: "white",
      };
    }
    if (optId === state.selectedId) {
      return {
        background: "rgba(239,68,68,0.25)",
        border: "1px solid #ef4444",
        color: "white",
      };
    }
    return {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.05)",
      color: "rgba(255,255,255,0.4)",
    };
  }

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1e0a4a 0%, #07071a 70%)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-4">
        <div className="flex flex-col">
          <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
            Soru
          </span>
          <span className="text-white font-black text-2xl">
            {state.currentIndex + 1}
            <span className="text-white/30 font-normal text-lg"> / {TOTAL_QUESTIONS}</span>
          </span>
        </div>

        <Timer timeLeft={state.timeLeft} totalTime={TOTAL_TIME} />

        <div className="flex flex-col items-end">
          <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
            Puan
          </span>
          <span className="text-white font-black text-2xl" style={{ color: "#a78bfa" }}>
            {state.score}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-8 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-start gap-5 px-8 pt-6 pb-6 overflow-y-auto">
        <div
          className="rounded-3xl p-5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-lg md:text-xl font-bold leading-relaxed text-white">
            {question.text}
          </p>
        </div>

        {/* Options — 2 columns for portrait screens */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={state.phase === "feedback"}
              className="w-full px-3 py-5 rounded-2xl text-left font-semibold text-sm transition-all duration-150 active:scale-95 flex items-center gap-3"
              style={{
                ...getOptionStyle(opt.id),
                cursor: state.phase === "feedback" ? "default" : "pointer",
              }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                style={{
                  background:
                    state.phase === "feedback" && opt.id === question.correctId
                      ? "#10b981"
                      : state.phase === "feedback" && opt.id === state.selectedId
                      ? "#ef4444"
                      : "rgba(255,255,255,0.1)",
                }}
              >
                {opt.id.toUpperCase()}
              </span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
