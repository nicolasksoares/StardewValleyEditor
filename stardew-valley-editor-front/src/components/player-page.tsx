"use client"

import { useState } from "react"
import Image from "next/image"
import { ComplexGameFrame } from "@/components/ui/ComplexGameFrame"
import { NavigationTabs } from "@/components/navigation-tabs"
import { SaveData } from "@/utils/SaveFileParser" 

interface PlayerPageProps {
  onNavigate: (tab: "player" | "inventory" | "relationships" | "search") => void;
  initialData: SaveData | null;
}

export function PlayerPage({ onNavigate, initialData }: PlayerPageProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  
  // Inicialização direta no useState (sem useEffect para evitar o erro do ESLint)
  const [farmName, setFarmName] = useState(initialData?.farmName || "")
  const [currentFunds, setCurrentFunds] = useState(initialData?.money?.toString() || "")
  const [totalEarnings, setTotalEarnings] = useState(initialData?.totalEarnings?.toString() || "")

  return (
    <div className="min-h-screen bg-[#4A332A] p-4 md:p-8 flex items-center justify-center">
      <ComplexGameFrame className="w-full max-w-4xl">
        <div className="bg-[#EACB91] p-6 md:p-8 min-h-[600px]">
          {/* Navigation */}
          <div className="flex justify-between items-start mb-6">
            <NavigationTabs activeTab="player" onTabChange={onNavigate} />

            {/* Save Button */}
            <button className="flex flex-col items-center gap-2 px-6 py-3 bg-[#D9A66A] border-4 border-[#8A3C00] hover:bg-[#EFC565] transition-all hover:scale-105">
              <Image src="/icons/save.svg" alt="Save" width={32} height={32} className="pixelated" />
              <span className="text-[#4A332A] font-bold text-sm">Save Changes</span>
            </button>
          </div>

          {/* Title Dinâmico */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#4A332A] mb-8">
             {initialData?.playerName || "Player Name"}
          </h1>

          {/* Equipment Grid */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={`left-${i}`}
                  onClick={() => setSelectedSlot(i)}
                  className={`w-20 h-20 bg-[#D9A66A] border-4 transition-all ${
                    selectedSlot === i
                      ? "border-[#4A332A] ring-4 ring-[#EFC565] scale-105"
                      : "border-[#8A3C00] hover:scale-105"
                  }`}
                />
              ))}
            </div>

            <div className="w-40 h-60 bg-[#E5E5E5] border-4 border-[#8A3C00] flex items-center justify-center">
              <span className="text-[#8A3C00] text-sm">Player Preview</span>
            </div>

            <div className="flex flex-col gap-2">
              {[3, 4, 5].map((i) => (
                <button
                  key={`right-${i}`}
                  onClick={() => setSelectedSlot(i)}
                  className={`w-20 h-20 bg-[#D9A66A] border-4 transition-all ${
                    selectedSlot === i
                      ? "border-[#4A332A] ring-4 ring-[#EFC565] scale-105"
                      : "border-[#8A3C00] hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end mb-8 pr-8">
            <button className="flex flex-col items-center gap-2 px-6 py-3 bg-[#D9A66A] border-4 border-[#8A3C00] hover:bg-[#EFC565] transition-all hover:scale-105">
              <Image src="/icons/bin.svg" alt="Delete" width={32} height={32} className="pixelated" />
              <span className="text-[#4A332A] font-bold text-sm">Delete Item</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-[#4A332A] font-bold text-xl min-w-[180px]">Farm:</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#D9A66A] border-4 border-[#8A3C00] text-[#4A332A] font-bold focus:outline-none focus:ring-4 focus:ring-[#EFC565]"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[#4A332A] font-bold text-xl min-w-[180px]">Current Funds:</label>
              <input
                type="text"
                value={currentFunds}
                onChange={(e) => setCurrentFunds(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#D9A66A] border-4 border-[#8A3C00] text-[#4A332A] font-bold focus:outline-none focus:ring-4 focus:ring-[#EFC565]"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[#4A332A] font-bold text-xl min-w-[180px]">Total Earnings:</label>
              <input
                type="text"
                value={totalEarnings}
                onChange={(e) => setTotalEarnings(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#D9A66A] border-4 border-[#8A3C00] text-[#4A332A] font-bold focus:outline-none focus:ring-4 focus:ring-[#EFC565]"
              />
            </div>
          </div>
        </div>
      </ComplexGameFrame>
    </div>
  )
}