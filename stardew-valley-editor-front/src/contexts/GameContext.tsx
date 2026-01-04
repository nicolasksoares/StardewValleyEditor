"use client"

import { createContext, useContext, useState, useRef, type ReactNode } from "react"
import type { Item, PlayerStats, Character } from "@/types"
import { INITIAL_INVENTORY } from "@/data/items"
import { CHARACTERS } from "@/data/characters"

interface GameContextType {
  inventory: Item[]
  playerStats: PlayerStats
  characters: Character[]
  selectedItem: number | null
  isDarkMode: boolean
  setInventory: (inventory: Item[]) => void
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

export function GameProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<Item[]>(INITIAL_INVENTORY)
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

  const setInventoryWithNotify = (newInventory: Item[]) => {
    setInventory(newInventory)
    notifyChange()
  }

  const setPlayerStatsWithNotify = (stats: PlayerStats) => {
    setPlayerStats(stats)
    notifyChange()
  }

  const addItem = (item: Item) => {
    const existingItem = inventory.find((i) => i.id === item.id)
    if (existingItem) {
      updateItemQuantity(item.id, existingItem.quantity + item.quantity)
    } else {
      setInventoryWithNotify([...inventory, item])
    }
  }

  const removeItem = (id: number) => {
    setInventoryWithNotify(inventory.filter((item) => item.id !== id))
    if (selectedItem === id) setSelectedItem(null)
  }

  const updateItemQuantity = (id: number, quantity: number) => {
    setInventoryWithNotify(inventory.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newInventory = [...inventory]
    const [movedItem] = newInventory.splice(fromIndex, 1)
    newInventory.splice(toIndex, 0, movedItem)
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
