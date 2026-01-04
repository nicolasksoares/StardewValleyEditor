"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGame } from "@/contexts/GameContext"
import { Tooltip } from "./Tooltip"
import { cn } from "@/lib/utils"
import { ArrowUpDown, Filter } from "lucide-react"
import type { ItemType } from "@/types"

type SortOption = "name" | "quantity" | "type" | "rarity" | "value"

interface InventoryTabProps {
  onDataChange?: () => void
}

export function InventoryTab({ onDataChange }: InventoryTabProps) {
  const {
    inventory,
    selectedItem,
    setSelectedItem,
    moveItem,
    playerStats,
    registerChangeCallback,
    unregisterChangeCallback,
  } = useGame()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [filterType, setFilterType] = useState<ItemType | "all">("all")
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cols = 6
      const rows = Math.ceil(inventory.length / cols)

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "].includes(e.key)) {
        e.preventDefault()

        if (e.key === "ArrowRight") {
          setFocusedIndex((prev) => Math.min(prev + 1, inventory.length - 1))
        } else if (e.key === "ArrowLeft") {
          setFocusedIndex((prev) => Math.max(prev - 1, 0))
        } else if (e.key === "ArrowDown") {
          setFocusedIndex((prev) => Math.min(prev + cols, inventory.length - 1))
        } else if (e.key === "ArrowUp") {
          setFocusedIndex((prev) => Math.max(prev - cols, 0))
        } else if (e.key === "Enter" || e.key === " ") {
          const item = inventory[focusedIndex]
          if (item) {
            setSelectedItem(selectedItem === item.id ? null : item.id)
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedIndex, selectedItem, setSelectedItem, inventory])

  useEffect(() => {
    if (onDataChange) {
      registerChangeCallback(onDataChange)
      return () => unregisterChangeCallback()
    }
  }, [onDataChange, registerChangeCallback, unregisterChangeCallback])

  const sortedInventory = [...inventory].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "quantity":
        return b.quantity - a.quantity
      case "type":
        return a.type.localeCompare(b.type)
      case "rarity":
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      case "value":
        return b.value - a.value
      default:
        return 0
    }
  })

  const filteredInventory =
    filterType === "all" ? sortedInventory : sortedInventory.filter((item) => item.type === filterType)

  const emptySlots = Array(36 - filteredInventory.length).fill(null)
  const allSlots = [...filteredInventory, ...emptySlots]

  const handleDragStart = (index: number) => {
    if (filteredInventory[index]) {
      setDraggedIndex(index)
    }
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index)
    }
    setDraggedIndex(null)
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "after:absolute after:inset-0 after:bg-blue-400/10 after:animate-pulse"
      case "epic":
        return "after:absolute after:inset-0 after:bg-purple-400/10 after:animate-pulse"
      case "legendary":
        return "after:absolute after:inset-0 after:bg-yellow-400/20 after:animate-pulse"
      default:
        return ""
    }
  }

  const itemTypes: (ItemType | "all")[] = [
    "all",
    "Weapon",
    "Armor",
    "Tool",
    "Consumable",
    "Food",
    "Seed",
    "Gem",
    "Material",
    "Key Item",
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h2 className="text-2xl sm:text-3xl font-sdv-title text-[var(--sdv-text)] text-center mb-4 sm:mb-6 border-b-2 border-retro-brown border-dotted pb-4">
        BACKPACK
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-retro-brown shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ItemType | "all")}
            className="flex-1 sm:flex-none bg-retro-dark-beige border-2 border-retro-brown px-2 sm:px-3 py-1 font-sdv text-lg sm:text-xl text-retro-brown cursor-pointer hover:bg-retro-gold transition-colors"
          >
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" ? "All" : type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={20} className="text-retro-brown shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="flex-1 sm:flex-none bg-retro-dark-beige border-2 border-retro-brown px-2 sm:px-3 py-1 font-sdv text-lg sm:text-xl text-retro-brown cursor-pointer hover:bg-retro-gold transition-colors"
          >
            <option value="name">Name</option>
            <option value="quantity">Qty</option>
            <option value="type">Type</option>
            <option value="rarity">Rarity</option>
            <option value="value">Value</option>
          </select>
        </div>
      </div>

      <div className="
        grid 
        grid-cols-5        
        sm:grid-cols-6     
        md:grid-cols-8     
        lg:grid-cols-12    
        gap-2 sm:gap-3 
        justify-center 
        max-w-fit mx-auto 
        bg-[#EAC986] 
        p-2 sm:p-4         
        border-2 border-retro-brown 
        shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)]
      ">
        {allSlots.map((item, index) => {
          const Icon = item?.icon
          const isSelected = item && selectedItem === item.id
          const isDragging = draggedIndex === index
          const isFocused = focusedIndex === index

          return (
            <div
              key={index}
              draggable={!!item}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onClick={() => {
                setFocusedIndex(index)
                item && setSelectedItem(isSelected ? null : item.id)
              }}
              tabIndex={0}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer relative",
                "bg-[var(--sdv-slot-bg)] border border-[#bfa27d] shadow-[inset_2px_2px_0_rgba(0,0,0,0.15),inset_-1px_-1px_0_rgba(255,255,255,0.25)]",
                "hover:after:absolute hover:after:inset-0 hover:after:border-2 hover:after:border-white/40",
                isSelected && "ring-2 ring-[#FFD28C] ring-offset-1 ring-offset-[#8b5a3c] z-10",
                isFocused && "ring-2 ring-blue-400 ring-offset-1",
                isDragging && "opacity-50",
                item && getRarityGlow(item.rarity),
              )}
            >
              {Icon && item ? (
                <Tooltip item={item} position="top">
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className={cn(
                      "text-[var(--sdv-text)] drop-shadow-sm transition-transform sm:w-8 sm:h-8 md:w-9 md:h-9",
                      isSelected ? "scale-110" : "",
                    )}
                  />
                </Tooltip>
              ) : null}

              {item && (
                <span className="absolute bottom-0 right-0.5 sm:right-1 font-sdv-title text-[8px] sm:text-[10px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                  {item.quantity}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 sm:mt-6 font-sdv text-xl sm:text-2xl text-[var(--sdv-text)] text-center">
        Gold: <span className="text-[#E6B325] drop-shadow-[1px_1px_0_#000]">{playerStats.gold.toLocaleString('en-US')}g</span>
      </div>
    </motion.div>
  )
}