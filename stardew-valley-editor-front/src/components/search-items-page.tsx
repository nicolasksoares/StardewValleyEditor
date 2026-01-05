"use client"

import { useState } from "react"
import Image from "next/image"
import { ComplexGameFrame } from "@/components/ui/ComplexGameFrame"
import { NavigationTabs } from "@/components/navigation-tabs"

interface Item {
  id: string
  name: string
  quantity: number
}

export function SearchItemsPage({
  onNavigate,
}: { onNavigate: (tab: "player" | "inventory" | "relationships" | "search") => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [items] = useState<Item[]>([
    { id: "0000", name: "Item name 1", quantity: 5 },
    { id: "0000", name: "Item name 2", quantity: 12 },
    { id: "0000", name: "Item name 3", quantity: 3 },
  ])

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#4A332A] p-4 md:p-8 flex items-center justify-center">
      <ComplexGameFrame className="w-full max-w-3xl">
        <div className="bg-[#EACB91] p-6 md:p-8 min-h-[600px]">
          {/* Navigation */}
          <div className="flex justify-between items-start mb-6">
            <NavigationTabs activeTab="search" onTabChange={onNavigate} />

            {/* Save Button */}
            <button className="flex flex-col items-center gap-2 px-6 py-3 bg-[#D9A66A] border-4 border-[#8A3C00] hover:bg-[#EFC565] transition-all hover:scale-105">
              <Image src="/icons/save.svg" alt="Save" width={32} height={32} className="pixelated" />
              <span className="text-[#4A332A] font-bold text-sm">Save Changes</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#4A332A] mb-8">SearchItems</h1>

          {/* Search Bar */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 flex items-center gap-2 bg-[#D9A66A] border-4 border-[#8A3C00] px-4">
              <Image src="/icons/search.png" alt="Search" width={24} height={24} className="pixelated" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="flex-1 bg-transparent py-3 text-[#4A332A] font-bold focus:outline-none placeholder:text-[#8A3C00]"
              />
            </div>

            {/* Filter Button */}
            <button className="px-6 bg-[#D9A66A] border-4 border-[#8A3C00] hover:bg-[#EFC565] transition-all hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4A332A]">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3 bg-[#D9A66A] border-4 border-[#8A3C00] p-4 max-h-[400px] overflow-y-auto">
            {filteredItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-[#EACB91] border-4 border-[#8A3C00] p-3">
                {/* Item Icon */}
                <div className="w-16 h-16 bg-[#E5E5E5] border-4 border-[#8A3C00] shrink-0" />

                {/* Item Info */}
                <div className="flex-1">
                  <h3 className="text-[#4A332A] font-bold text-xl">{item.name}</h3>
                  <p className="text-[#8A3C00] font-bold">ID#{item.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#4A332A] font-bold">Quantity:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-20 px-2 py-1 bg-[#D9A66A] border-2 border-[#8A3C00] text-[#4A332A] font-bold focus:outline-none focus:ring-2 focus:ring-[#EFC565]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComplexGameFrame>
    </div>
  )
}
