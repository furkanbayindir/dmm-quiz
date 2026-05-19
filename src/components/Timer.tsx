"use client";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function Timer({ timeLeft, totalTime }: TimerProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const offset = circumference * (1 - progress);

  const color =
    timeLeft > totalTime * 0.5
      ? "#10b981"
      : timeLeft > totalTime * 0.25
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute" width="96" height="96" viewBox="0 0 96 96">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 48 48)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span
        className="text-2xl font-black z-10"
        style={{ color, transition: "color 0.3s ease" }}
      >
        {timeLeft}
      </span>
    </div>
  );
}
