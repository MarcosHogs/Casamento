import { useEffect, useState } from 'react'

export default function Countdown({ targetDateISO }) {
  const target = new Date(targetDateISO).getTime()
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      <TimeCard label="Dias" value={days} />
      <TimeCard label="Horas" value={hours} />
      <TimeCard label="Min" value={minutes} />
      <TimeCard label="Seg" value={seconds} />
    </div>
  )
}

function TimeCard({ label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow">
      <div className="text-2xl font-semibold text-blue-900">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-blue-700">{label}</div>
    </div>
  )
}
