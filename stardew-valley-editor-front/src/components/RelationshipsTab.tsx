"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, User, Gift } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useGame } from "@/contexts/GameContext"

export function RelationshipsTab() {
  const { characters } = useGame()
  const [selectedNPC, setSelectedNPC] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-6">Social</h2>

      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => setSelectedNPC(selectedNPC === character.id ? null : character.id)}
            className="border-2 border-retro-brown bg-[#FFF8E7] p-4 cursor-pointer hover:bg-retro-gold/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="w-16 h-16 border-2 border-retro-brown bg-retro-dark-beige flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User size={32} className="text-retro-brown" />
              </motion.div>

              {/* Info e Corações */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-press-start text-xs text-retro-brown">{character.name}</span>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: character.maxRelationship }).map((_, i) => {
                    const heartValue = i + 1
                    const isFilled = heartValue <= character.relationship

                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05, type: "spring", stiffness: 200 }}
                      >
                        <Heart
                          size={16}
                          className={cn(
                            "transition-all hover:scale-125",
                            isFilled ? "fill-[#E63946] text-[#E63946]" : "fill-transparent text-retro-brown/30",
                          )}
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {selectedNPC === character.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t-2 border-retro-brown/20"
                >
                  <p className="font-vt323 text-lg text-retro-brown mb-2">{character.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Gift size={16} className="text-retro-brown" />
                    <span className="font-vt323 text-base text-retro-brown/70">
                      Loves: {character.favoriteGifts.join(", ")}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
