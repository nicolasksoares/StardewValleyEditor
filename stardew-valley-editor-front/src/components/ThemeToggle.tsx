"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useGame } from "@/contexts/GameContext"
import { useEffect } from "react"

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useGame()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 bg-retro-gold border-2 border-retro-brown shadow-[2px_2px_6px_rgba(74,51,42,0.3)] hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDarkMode ? <Sun size={24} className="text-retro-brown" /> : <Moon size={24} className="text-retro-brown" />}
      </motion.div>
    </motion.button>
  )
}
