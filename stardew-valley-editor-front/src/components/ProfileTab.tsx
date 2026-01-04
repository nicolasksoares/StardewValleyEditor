"use client"

import { motion } from "framer-motion"
import { User, Edit2 } from "lucide-react"
import { useGame } from "@/contexts/GameContext"
import { useEffect, useState } from "react"

interface ProfileTabProps {
  onDataChange?: () => void
}

export function ProfileTab({ onDataChange }: ProfileTabProps) {
  const { playerStats, setPlayerStats } = useGame()
  const [isEditingGold, setIsEditingGold] = useState(false)
  const [goldValue, setGoldValue] = useState(playerStats.gold.toString())

  const { registerChangeCallback, unregisterChangeCallback } = useGame()

  useEffect(() => {
    if (onDataChange) {
      registerChangeCallback(onDataChange)
      return () => unregisterChangeCallback()
    }
  }, [onDataChange, registerChangeCallback, unregisterChangeCallback])

  const handleGoldChange = () => {
    const newGold = Math.max(0, Math.min(Number.parseInt(goldValue, 10) || 0, 999999999))
    setPlayerStats({ ...playerStats, gold: newGold })
    setIsEditingGold(false)
    onDataChange?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl sm:text-2xl font-press-start text-retro-brown text-center mb-6 sm:mb-8 break-all">
        {"\\\\"}{playerStats.name}{"//"}
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-retro-brown bg-retro-dark-beige flex items-center justify-center shrink-0 shadow-[inset_2px_2px_6px_rgba(74,51,42,0.1)]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <User size={48} strokeWidth={2} className="text-retro-brown sm:w-[64px] sm:h-[64px]" />
        </motion.div>

        <div className="flex-1 w-full space-y-4 font-vt323 text-xl">
          <AnimatedStatBar label="HP" value={playerStats.hp} max={playerStats.maxHp} color="#E63946" delay={0} />
          <AnimatedStatBar
            label="Energy"
            value={playerStats.energy}
            max={playerStats.maxEnergy}
            color="#2A9D8F"
            delay={0.1}
          />
          <AnimatedStatBar label="XP" value={playerStats.xp} max={playerStats.xpToNext} color="#F4A261" delay={0.2} />
        </div>
      </div>

      <motion.div
        className="mt-8 font-vt323 text-xl text-retro-brown space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="flex justify-between border-b-2 border-retro-dark-beige border-dotted py-1 hover:bg-retro-dark-beige/30 transition-colors">
          <span>Level:</span>
          <span className="font-bold">{playerStats.level}</span>
        </div>
        <div className="flex justify-between items-center border-b-2 border-retro-dark-beige border-dotted py-1 hover:bg-retro-dark-beige/30 transition-colors group">
          <span>Gold:</span>
          {isEditingGold ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={goldValue}
                onChange={(e) => setGoldValue(e.target.value)}
                onBlur={handleGoldChange}
                onKeyDown={(e) => e.key === "Enter" && handleGoldChange()}
                className="w-28 sm:w-32 px-2 py-1 border-2 border-retro-brown bg-white text-retro-brown font-vt323 text-lg"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[#E6B325]">{playerStats.gold.toLocaleString('en-US')}g</span>
              <button
                onClick={() => {
                  setIsEditingGold(true)
                  setGoldValue(playerStats.gold.toString())
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 size={16} className="text-retro-brown" />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between border-b-2 border-retro-dark-beige border-dotted py-1 hover:bg-retro-dark-beige/30 transition-colors">
          <span>XP to Next:</span>
          <span>{playerStats.xpToNext - playerStats.xp}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AnimatedStatBar({
  label,
  value,
  max,
  color,
  delay,
}: { label: string; value: number; max: number; color: string; delay: number }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = (value / max) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-retro-brown">{label}</span>
        <span className="text-retro-brown">
          {animatedValue}/{max}
        </span>
      </div>
      <div className="w-full h-6 border-2 border-retro-brown bg-white relative shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
        <motion.div
          className="h-full absolute top-0 left-0"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}