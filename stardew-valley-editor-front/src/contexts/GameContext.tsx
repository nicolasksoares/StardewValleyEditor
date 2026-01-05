"use client"

import { createContext, useContext, useState, useRef, type ReactNode } from "react"
import type { Item, PlayerStats, Character } from "@/types"
import { INITIAL_INVENTORY } from "@/data/items"
import { CHARACTERS } from "@/data/characters"

// AUMENTAMOS O ESCOPO: O inventário agora aceita 'null' (espaços vazios)
interface GameContextType {
  inventory: (Item | null)[] 
  playerStats: PlayerStats
  characters: Character[]
  selectedItem: number | null
  isDarkMode: boolean
  setInventory: (inventory: (Item | null)[]) => void
  setPlayerStats: (stats: PlayerStats) => void
  setSelectedItem: (id: number | null) => void
  addItem: (item: Item) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  toggleDarkMode: () => void
  moveItem: (fromIndex: number, toIndex: number) => void
  registerChangeCallback: (callback: () => void) => void
  unregisterChangeCallback: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Função auxiliar para inicializar o grid de 36 slots
const initializeGrid = (items: Item[]): (Item | null)[] => {
  const grid = Array(36).fill(null);
  // Preenche os primeiros slots com os itens iniciais
  items.forEach((item, index) => {
    if (index < 36) grid[index] = item;
  });
  return grid;
}

export function GameProvider({ children }: { children: ReactNode }) {
  // Inicializa com 36 espaços (alguns com itens, outros null)
  const [inventory, setInventory] = useState<(Item | null)[]>(() => initializeGrid(INITIAL_INVENTORY))
  
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    name: "Farmer",
    level: 7,
    hp: 85,
    maxHp: 100,
    energy: 120,
    maxEnergy: 180,
    xp: 450,
    xpToNext: 800,
    gold: 1250,
  })
  const [characters] = useState<Character[]>(CHARACTERS)

  const changeCallbackRef = useRef<(() => void) | null>(null)

  const notifyChange = () => {
    if (changeCallbackRef.current) {
      changeCallbackRef.current()
    }
  }

  const registerChangeCallback = (callback: () => void) => {
    changeCallbackRef.current = callback
  }

  const unregisterChangeCallback = () => {
    changeCallbackRef.current = null
  }

  const setInventoryWithNotify = (newInventory: (Item | null)[]) => {
    setInventory(newInventory)
    notifyChange()
  }

  const setPlayerStatsWithNotify = (stats: PlayerStats) => {
    setPlayerStats(stats)
    notifyChange()
  }

  const addItem = (newItem: Item) => {
    // 1. Tenta empilhar se o item já existe
    const existingIndex = inventory.findIndex((i) => i !== null && i.id === newItem.id);
    
    if (existingIndex !== -1) {
      const currentItem = inventory[existingIndex]!;
      updateItemQuantity(newItem.id, currentItem.quantity + newItem.quantity);
      return;
    } 

    // 2. Se não existe, procura o primeiro buraco vazio (null)
    const emptySlotIndex = inventory.findIndex((i) => i === null);
    
    if (emptySlotIndex !== -1) {
      const newInv = [...inventory];
      newInv[emptySlotIndex] = newItem;
      setInventoryWithNotify(newInv);
    } else {
      // Mochila cheia! (Opcional: tratar erro)
      console.warn("Inventory Full!");
    }
  }

  const removeItem = (id: number) => {
    // Ao remover, transformamos o slot em NULL (não encolhe o array)
    setInventoryWithNotify(inventory.map((item) => (item?.id === id ? null : item)))
    
    if (selectedItem === id) setSelectedItem(null)
  }

  const updateItemQuantity = (id: number, quantity: number) => {
    setInventoryWithNotify(
      inventory.map((item) => (item?.id === id ? { ...item, quantity } : item))
    )
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // A LÓGICA DE OURO: SWAP (TROCA) EM VEZ DE SPLICE (DESLOCAMENTO)
  const moveItem = (fromIndex: number, toIndex: number) => {
    // Copia o array
    const newInventory = [...inventory]
    
    // Pega os itens nas duas posições
    const itemFrom = newInventory[fromIndex]
    const itemTo = newInventory[toIndex]

    // Troca eles de lugar
    newInventory[toIndex] = itemFrom
    newInventory[fromIndex] = itemTo // Se 'toIndex' era null, agora 'fromIndex' vira null

    setInventoryWithNotify(newInventory)
  }

  return (
    <GameContext.Provider
      value={{
        inventory,
        playerStats,
        characters,
        selectedItem,
        isDarkMode,
        setInventory: setInventoryWithNotify,
        setPlayerStats: setPlayerStatsWithNotify,
        setSelectedItem,
        addItem,
        removeItem,
        updateItemQuantity,
        toggleDarkMode,
        moveItem,
        registerChangeCallback,
        unregisterChangeCallback,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within GameProvider")
  }
  return context
}