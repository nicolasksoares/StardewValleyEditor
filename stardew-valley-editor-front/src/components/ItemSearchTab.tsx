"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useGame } from "@/contexts/GameContext"
import { ITEMS_DATABASE } from "@/data/items"
import { VirtualItemSearch } from "./VirtualItemSearch" // Importe o novo componente

interface ItemSearchTabProps {
  onDataChange?: () => void
}

export function ItemSearchTab({ onDataChange }: ItemSearchTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [addedItems, setAddedItems] = useState<number[]>([])
  const { addItem, registerChangeCallback, unregisterChangeCallback } = useGame()

  useEffect(() => {
    if (onDataChange) {
      registerChangeCallback(onDataChange)
      return () => unregisterChangeCallback()
    }
  }, [onDataChange, registerChangeCallback, unregisterChangeCallback])

  // Filtro otimizado: só roda quando o termo de busca muda
  const filteredItems = ITEMS_DATABASE.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddItem = (itemId: number) => {
    const item = ITEMS_DATABASE.find((i) => i.id === itemId)
    if (item) {
      addItem({ ...item, quantity: 1 })
      setAddedItems((prev) => [...prev, itemId])
      onDataChange?.() // Notifica mudança
      
      // Remove o feedback visual após 1s
      setTimeout(() => {
        setAddedItems((prev) => prev.filter((id) => id !== itemId))
      }, 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-full overflow-hidden" // Importante: overflow-hidden para o AutoSizer funcionar
    >
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-6">Item Spawner</h2>

      <div className="relative mb-6 shrink-0">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 bg-white border-2 border-retro-brown pl-12 pr-4 font-vt323 text-2xl text-retro-brown placeholder:text-retro-brown/50 focus:bg-[#FFF8E7] focus:border-retro-gold transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-retro-brown" size={20} />
      </div>

      {/* Área da Lista Virtualizada */}
      <div className="flex-1 border-2 border-retro-brown bg-retro-beige/50 p-1">
        {filteredItems.length > 0 ? (
          <VirtualItemSearch 
            items={filteredItems} 
            onAdd={handleAddItem} 
            addedItems={addedItems} 
          />
        ) : (
          <p className="text-center font-vt323 text-xl text-retro-brown mt-10">
            No items found.
          </p>
        )}
      </div>
    </motion.div>
  )
}