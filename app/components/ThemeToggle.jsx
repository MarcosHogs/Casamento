"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:bg-white/30 transition-all duration-300 text-weddingBlue-800 dark:text-weddingBlue-100"
            aria-label="Alternar tema"
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}
