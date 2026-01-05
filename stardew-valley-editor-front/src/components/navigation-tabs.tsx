"use client"

import Image from "next/image"

interface NavigationTabsProps {
  activeTab: "player" | "inventory" | "relationships" | "search"
  onTabChange: (tab: "player" | "inventory" | "relationships" | "search") => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="flex gap-0">
      <button
        onClick={() => onTabChange("player")}
        className={`w-20 h-20 flex items-center justify-center transition-all ${
          activeTab === "player"
            ? "bg-[#EFC565] border-4 border-[#8A3C00] scale-105"
            : "bg-[#D9A66A] border-2 border-[#4A332A] hover:scale-105"
        }`}
      >
        <Image src="/icons/player.png" alt="Player" width={48} height={48} className="pixelated" />
      </button>

      <button
        onClick={() => onTabChange("inventory")}
        className={`w-20 h-20 flex items-center justify-center transition-all ${
          activeTab === "inventory"
            ? "bg-[#EFC565] border-4 border-[#8A3C00] scale-105"
            : "bg-[#D9A66A] border-2 border-[#4A332A] hover:scale-105"
        }`}
      >
        <Image src="/icons/backpack.png" alt="Inventory" width={48} height={48} className="pixelated" />
      </button>

      <button
        onClick={() => onTabChange("relationships")}
        className={`w-20 h-20 flex items-center justify-center transition-all ${
          activeTab === "relationships"
            ? "bg-[#EFC565] border-4 border-[#8A3C00] scale-105"
            : "bg-[#D9A66A] border-2 border-[#4A332A] hover:scale-105"
        }`}
      >
        <Image src="/icons/heart.png" alt="Relationships" width={48} height={48} className="pixelated" />
      </button>

      <button
        onClick={() => onTabChange("search")}
        className={`w-20 h-20 flex items-center justify-center transition-all ${
          activeTab === "search"
            ? "bg-[#EFC565] border-4 border-[#8A3C00] scale-105"
            : "bg-[#D9A66A] border-2 border-[#4A332A] hover:scale-105"
        }`}
      >
        <Image src="/icons/search.png" alt="Search" width={48} height={48} className="pixelated" />
      </button>
    </div>
  )
}
