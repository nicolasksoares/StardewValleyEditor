"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Item } from "@/types"

interface TooltipProps {
  item: Item
  children: ReactNode
  position?: "top" | "bottom" | "left" | "right"
}

export function Tooltip({ item, children, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600"
      case "rare":
        return "text-blue-600"
      case "epic":
        return "text-purple-600"
      case "legendary":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 border-gray-400"
      case "rare":
        return "bg-blue-50 border-blue-400"
      case "epic":
        return "bg-purple-50 border-purple-400"
      case "legendary":
        return "bg-yellow-50 border-yellow-400"
      default:
        return "bg-gray-100 border-gray-400"
    }
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positionClasses[position]} z-50 pointer-events-none`}
          >
            <div className={`min-w-[200px] max-w-[280px] p-3 border-2 ${getRarityBg(item.rarity)} shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-sdv-title text-xs ${getRarityColor(item.rarity)}`}>{item.name}</h3>
                <span className="font-sdv text-sm text-retro-brown">x{item.quantity}</span>
              </div>
              <p className="font-sdv text-lg text-retro-brown mb-2">{item.description}</p>
              <div className="flex justify-between items-center pt-2 border-t-2 border-retro-brown/20">
                <span className="font-sdv text-sm text-gray-600">{item.type}</span>
                <span className="font-sdv text-sm text-retro-gold">{item.value}g</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
