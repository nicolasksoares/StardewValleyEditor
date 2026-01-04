"use client"

import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { Item } from "@/types"
import { CSSProperties } from "react"

// --- CORREÇÃO DE IMPORTS PARA TURBOPACK ---
import * as ReactWindow from "react-window"
import * as AutoSizerPkg from "react-virtualized-auto-sizer"

// Fallback seguro para ambientes que não suportam ESM/CommonJS misturados corretamente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const List = ReactWindow.FixedSizeList || (ReactWindow as any).default?.FixedSizeList || ReactWindow
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoSizer = (AutoSizerPkg as any).default || AutoSizerPkg

interface VirtualItemSearchProps {
  items: Item[]
  onAdd: (id: number) => void
  addedItems: number[]
}

export function VirtualItemSearch({ items, onAdd, addedItems }: VirtualItemSearchProps) {
  // Renderizador de cada linha (Row)
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const item = items[index]
    
    if (!item) return null

    const Icon = item.icon
    const isAdded = addedItems.includes(item.id)

    // Conversão segura para número para cálculos de margem
    const topVal = parseFloat(style.top?.toString() || "0")
    const heightVal = parseFloat(style.height?.toString() || "0")

    const rowStyle: CSSProperties = {
      ...style,
      top: `${topVal + 10}px`,
      height: `${heightVal - 10}px`,
      left: "4px",
      right: "4px",
      width: "calc(100% - 16px)"
    }

    return (
      <div style={rowStyle}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 p-2 border-2 border-retro-brown bg-retro-dark-beige hover:bg-retro-gold cursor-pointer transition-colors group h-full"
        >
          <div className="w-10 h-10 border-2 border-retro-brown bg-white flex items-center justify-center shrink-0">
            <Icon size={20} className="text-retro-brown" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-press-start text-[10px] text-retro-brown mb-1 truncate">{item.name}</p>
            <p className="font-vt323 text-lg text-retro-brown/70">{item.type}</p>
          </div>
          <button
            onClick={() => onAdd(item.id)}
            className={`
              font-vt323 text-lg px-3 py-1 flex items-center gap-1 transition-all border-2 border-transparent
              ${isAdded 
                ? "bg-[#2A9D8F] text-white" 
                : "bg-retro-brown text-retro-beige hover:bg-retro-beige hover:text-retro-brown hover:border-retro-brown"
              }
            `}
          >
            <Plus size={16} />
            {isAdded ? "Added" : "Add"}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex-1 h-full min-h-[300px]">
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            height={height}
            itemCount={items.length}
            itemSize={80}
            width={width}
            className="custom-scrollbar"
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}