"use client";

import { motion } from "framer-motion";
import { Heart, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const INITIAL_NPCS = [
  { id: 1, name: "Abigail", hearts: 4, marriage: false },
  { id: 2, name: "Sebastian", hearts: 8, marriage: true }, // Namorando
  { id: 3, name: "Robin", hearts: 10, marriage: false },
  { id: 4, name: "Demetrius", hearts: 2, marriage: false },
  { id: 5, name: "Linus", hearts: 5, marriage: false },
];

export function RelationshipsTab() {
  const [npcs, setNpcs] = useState(INITIAL_NPCS);

  // Função para mudar corações ao clicar
  const updateHearts = (npcId: number, newLevel: number) => {
    setNpcs((prev) =>
      prev.map((npc) => (npc.id === npcId ? { ...npc, hearts: newLevel } : npc))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-6">Social</h2>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {npcs.map((npc) => (
          <div
            key={npc.id}
            className="border-4 border-retro-brown bg-[#FFF8E7] p-4 flex items-center gap-4"
          >
            {/* Retrato do NPC */}
            <div className="w-16 h-16 border-2 border-retro-brown bg-retro-dark-beige flex items-center justify-center shrink-0">
               <User size={32} />
            </div>

            {/* Info e Corações */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-press-start text-xs text-retro-brown">{npc.name}</span>
                <span className="font-vt323 text-lg text-retro-brown">
                  {npc.marriage ? "(Single)" : ""}
                </span>
              </div>
              
              {/* Renderiza 10 corações */}
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 10 }).map((_, i) => {
                  const heartValue = i + 1;
                  const isFilled = heartValue <= npc.hearts;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => updateHearts(npc.id, heartValue)}
                      className="hover:scale-125 transition-transform"
                    >
                      <Heart
                        size={16}
                        className={cn(
                          "transition-colors",
                          isFilled 
                            ? "fill-[#E63946] text-[#E63946]" // Vermelho Cheio
                            : "fill-transparent text-retro-brown/30" // Vazio
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}