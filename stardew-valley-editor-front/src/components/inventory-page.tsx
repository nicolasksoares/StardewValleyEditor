"use client"

import { useState } from "react"
import Image from "next/image"
import { ComplexGameFrame } from "@/components/ui/ComplexGameFrame"
import { NavigationTabs } from "@/components/navigation-tabs"

export function InventoryPage({
  onNavigate,
}: { onNavigate?: (tab: "player" | "inventory" | "relationships" | "search") => void }) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  const inventorySlots = Array.from({ length: 36 }, (_, i) => i)
  const leftEquipmentSlots = Array.from({ length: 3 }, (_, i) => i)
  const rightEquipmentSlots = Array.from({ length: 3 }, (_, i) => i + 3)

  const handleSlotClick = (slot: number) => {
    setSelectedSlot(selectedSlot === slot ? null : slot)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#4A332A]">
      <ComplexGameFrame className="w-full max-w-7xl">
        <div className="bg-[#EACB91] p-6 md:p-10 w-full min-h-[600px]">
          <div className="flex justify-between items-start mb-8 md:mb-10">
            <NavigationTabs activeTab="inventory" onTabChange={(tab) => onNavigate?.(tab)} />

            {/* Save and Delete buttons on the right */}
            <div className="flex gap-4">
              <button className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#7B8BA3] border-4 md:border-[5px] border-[#5A6B83] flex items-center justify-center group-hover:bg-[#8B9BB3] group-active:scale-95 transition-all duration-200 shadow-lg">
                  <Image src="/icons/save.svg" alt="Save" width={40} height={40} className="pixelated" />
                </div>
                <span className="text-sm md:text-base font-bold text-[#4A332A]">Save Changes</span>
              </button>

              <button className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#7B8BA3] border-4 md:border-[5px] border-[#5A6B83] flex items-center justify-center group-hover:bg-[#9B6B83] group-active:scale-95 transition-all duration-200 shadow-lg">
                  <Image src="/icons/bin.svg" alt="Delete" width={40} height={40} className="pixelated" />
                </div>
                <span className="text-sm md:text-base font-bold text-[#4A332A]">Delete Item</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-[#4A332A] mb-10 md:mb-14">
            Inventory
          </h1>

          {/* Equipment Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10 md:mb-14">
            {/* Left Equipment Slots */}
            <div className="flex md:flex-col gap-2 md:gap-3">
              {leftEquipmentSlots.map((slot) => (
                <button
                  key={`left-${slot}`}
                  onClick={() => handleSlotClick(slot)}
                  className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#D9A66A] border-4 md:border-[5px] border-[#8B5A3C] transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
                    selectedSlot === slot ? "ring-4 md:ring-[6px] ring-[#4A332A] ring-offset-2 scale-105" : ""
                  }`}
                />
              ))}
            </div>

            {/* Center Player Display */}
            <div className="w-40 h-52 md:w-48 md:h-64 lg:w-56 lg:h-72 bg-linear-to-br from-[#F0F0F0] to-[#E0E0E0] border-4 md:border-[5px] border-[#8B5A3C] shadow-inner" />

            {/* Right Equipment Slots */}
            <div className="flex md:flex-col gap-2 md:gap-3">
              {rightEquipmentSlots.map((slot) => (
                <button
                  key={`right-${slot}`}
                  onClick={() => handleSlotClick(slot + 100)}
                  className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#D9A66A] border-4 md:border-[5px] border-[#8B5A3C] transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ${
                    selectedSlot === slot + 100 ? "ring-4 md:ring-[6px] ring-[#4A332A] ring-offset-2 scale-105" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Inventory Grid - 36 slots in 3 rows of 12 */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 md:gap-3">
            {inventorySlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotClick(slot + 200)}
                className={`aspect-square bg-[#D9A66A] border-[3px] md:border-4 border-[#8B5A3C] transition-all duration-150 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:bg-[#E8B67A] ${
                  selectedSlot === slot + 200
                    ? "ring-3 md:ring-[5px] ring-[#4A332A] ring-offset-2 bg-[#E8B67A] scale-105"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
      </ComplexGameFrame>
    </div>
  )
}
