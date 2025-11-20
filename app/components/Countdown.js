"use client"

import { useEffect, useState } from "react"

export default function Countdown({ targetDateISO }) {
  const target = new Date(targetDateISO).getTime()
  const [now, setNow] = useState(Date.now())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
      <TimeBox value={days} label="Dias" />
      <TimeBox value={hours} label="Horas" />
      <TimeBox value={minutes} label="Minutos" />
      <TimeBox value={seconds} label="Segundos" />
    </div>
  )
}

function TimeBox({ value, label }) {
  return (
    <div className="glass-card p-4 flex flex-col items-center justify-center min-w-[100px] animate-fade-up hover:scale-105 transition-transform duration-300">
      <span className="text-4xl md:text-5xl font-bold text-weddingBlue-600 dark:text-weddingBlue-300 font-script">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm uppercase tracking-widest text-weddingBlue-800 dark:text-weddingBlue-200 mt-2">
        {label}
      </span>
    </div>
  )
}
