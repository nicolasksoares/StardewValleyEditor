"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { INITIAL_INVENTORY } from "@/src/data/items";
import { cn } from "@/src/lib/utils";

export function InventoryTab() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Cria slots vazios até completar 24 espaços
  const emptySlots = Array(24 - INITIAL_INVENTORY.length).fill(null);
  const allSlots = [...INITIAL_INVENTORY, ...emptySlots];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-8">Inventory</h2>

      <div className="grid grid-cols-4 gap-4">
        {allSlots.map((item, index) => {
          // Se for null, é um slot vazio
          const Icon = item?.icon;
          const isSelected = item && selectedItem === item.id;

          return (
            <div
              key={index}
              onClick={() => item && setSelectedItem(isSelected ? null : item.id)}
              className={cn(
                "aspect-square flex items-center justify-center cursor-pointer transition-all duration-200",
                item
                  ? "border-4 border-retro-brown bg-retro-gold hover:bg-[#F5D685]"
                  : "border-[3px] border-dashed border-retro-brown bg-transparent hover:bg-retro-dark-beige",
                isSelected && "outline outline-dashed outline-retro-brown outline-offset-4"
              )}
            >
              {Icon && <Icon size={32} strokeWidth={2.5} className="text-retro-brown" />}
            </div>
          );
        })}
      </div>

      <div className="mt-6 font-vt323 text-lg text-retro-brown text-center">
        {INITIAL_INVENTORY.length} / 24 slots used
      </div>
    </motion.div>
  );
}