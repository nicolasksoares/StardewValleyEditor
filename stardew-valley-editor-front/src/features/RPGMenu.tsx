"use client"

import { useState, useEffect } from "react"
import { Heart, Menu, User, Backpack, Search, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ProfileTab } from "@/components/ProfileTab"
import { InventoryTab } from "@/components/InventoryTab"
import { ItemSearchTab } from "@/components/ItemSearchTab"
import { RelationshipsTab } from "@/components/RelationshipsTab"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

type TabType = "profile" | "inventory" | "search" | "social"

interface TabItem {
  id: TabType
  icon: LucideIcon
  label: string
}

interface RPGMenuProps {
  onDataChange?: () => void
}

const TABS: TabItem[] = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "inventory", icon: Backpack, label: "Inventory" },
  { id: "social", icon: Heart, label: "Social" },
  { id: "search", icon: Search, label: "Item Spawner" },
]

export default function RPGMenu({ onDataChange }: RPGMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = TABS.findIndex((tab) => tab.id === activeTab)

      if (e.key === "ArrowRight") {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % TABS.length
        setActiveTab(TABS[nextIndex].id)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length
        setActiveTab(TABS[prevIndex].id)
      } else if (e.key >= "1" && e.key <= "4") {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (TABS[index]) {
          setActiveTab(TABS[index].id)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeTab])

  return (
    <div className="flex items-center justify-center font-vt323 w-full">
      <ThemeToggle />

      <div className="relative w-full max-w-full md:max-w-[600px]">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden absolute -top-12 left-0 z-30 p-2 bg-retro-gold border-2 border-retro-brown"
        >
          <Menu size={24} className="text-retro-brown" />
        </button>

        <div className="hidden md:flex gap-1 mb-[-2px] relative pl-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 py-3 border-2 border-retro-brown cursor-pointer transition-all duration-200",
                  isActive
                    ? "bg-retro-beige z-20 border-b-transparent pt-2 shadow-[0_-2px_4px_rgba(74,51,42,0.1)]"
                    : "bg-retro-dark-beige z-10 hover:bg-retro-gold mt-1 shadow-[0_2px_4px_rgba(74,51,42,0.15)]",
                )}
                whileHover={!isActive ? { y: -2 } : {}}
                whileTap={{ scale: 0.95 }}
                title={tab.label}
                aria-label={tab.label}
              >
                <Icon size={24} strokeWidth={2.5} className="text-retro-brown" />
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-0 left-0 right-0 z-20 bg-retro-beige border-2 border-retro-brown p-2 space-y-2"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setShowMobileMenu(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 border-2 border-retro-brown transition-colors",
                      isActive ? "bg-retro-gold" : "bg-retro-dark-beige hover:bg-retro-gold",
                    )}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                        <Icon size={20} className="text-retro-brown" />
                    </div>
                    <span className="font-press-start text-xs text-retro-brown">{tab.label}</span>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-retro-beige border-2 border-retro-brown p-3 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] relative z-10 shadow-[4px_4px_12px_rgba(74,51,42,0.12)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileTab onDataChange={onDataChange} />}
              {activeTab === "inventory" && <InventoryTab onDataChange={onDataChange} />}
              {activeTab === "search" && <ItemSearchTab onDataChange={onDataChange} />}
              {activeTab === "social" && <RelationshipsTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:block mt-4 text-center font-vt323 text-sm text-retro-brown/60">
          Use Arrow Keys or 1-4 to switch tabs
        </div>
      </div>
    </div>
  )
}