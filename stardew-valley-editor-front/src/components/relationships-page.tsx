"use client"

import { useState } from "react"
import Image from "next/image"
import { ComplexGameFrame } from "@/components/ui/ComplexGameFrame"
import { NavigationTabs } from "@/components/navigation-tabs"

interface NPC {
  id: number
  name: string
  hearts: number
}

export function RelationshipsPage({
  onNavigate,
}: { onNavigate: (tab: "player" | "inventory" | "relationships" | "search") => void }) {
  const [npcs, setNpcs] = useState<NPC[]>([
    { id: 1, name: "NPC Name 1", hearts: 5 },
    { id: 2, name: "NPC Name 2", hearts: 7 },
    { id: 3, name: "NPC Name 3", hearts: 4 },
    { id: 4, name: "NPC Name 4", hearts: 9 },
  ])

  const updateHearts = (id: number, hearts: number) => {
    setNpcs(npcs.map((npc) => (npc.id === id ? { ...npc, hearts } : npc)))
  }

  return (
    <div className="min-h-screen bg-[#4A332A] p-4 md:p-8 flex items-center justify-center">
      <ComplexGameFrame className="w-full max-w-2xl">
        <div className="bg-[#EACB91] p-6 md:p-8 min-h-[600px]">
          {/* Navigation */}
          <div className="flex justify-between items-start mb-6">
            <NavigationTabs activeTab="relationships" onTabChange={onNavigate} />

            {/* Save Button */}
            <button className="flex flex-col items-center gap-2 px-6 py-3 bg-[#D9A66A] border-4 border-[#8A3C00] hover:bg-[#EFC565] transition-all hover:scale-105">
              <Image src="/icons/save.svg" alt="Save" width={32} height={32} className="pixelated" />
              <span className="text-[#4A332A] font-bold text-sm">Save Changes</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#4A332A] mb-8">Relationships</h1>

          {/* NPC List */}
          <div className="space-y-4 bg-[#D9A66A] border-4 border-[#8A3C00] p-4 max-h-[500px] overflow-y-auto">
            {npcs.map((npc) => (
              <div key={npc.id} className="flex items-center gap-4 bg-[#EACB91] border-4 border-[#8A3C00] p-3">
                {/* NPC Portrait */}
                <div className="w-20 h-20 bg-[#E5E5E5] border-4 border-[#8A3C00] shrink-0" />

                {/* NPC Info */}
                <div className="flex-1">
                  <h3 className="text-[#4A332A] font-bold text-xl mb-2">{npc.name}</h3>

                  {/* Hearts */}
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => updateHearts(npc.id, i + 1)}
                        className="transition-transform hover:scale-110"
                      >
                        <Image
                          src="/icons/heart.png"
                          alt="Heart"
                          width={24}
                          height={24}
                          className="pixelated"
                          style={{
                            filter: i < npc.hearts ? "none" : "brightness(0)",
                          }}
                        />
                      </button>
                    ))}
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
