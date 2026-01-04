import type { LucideIcon } from "lucide-react"

export type ItemRarity = "common" | "rare" | "epic" | "legendary"
export type ItemType = "Weapon" | "Armor" | "Tool" | "Consumable" | "Food" | "Gem" | "Key Item" | "Seed" | "Material"

export interface Item {
  id: number
  icon: LucideIcon
  name: string
  type: ItemType
  description: string
  quantity: number
  rarity: ItemRarity
  value: number
}

export interface Character {
  id: number
  name: string
  relationship: number
  maxRelationship: number
  favoriteGifts: string[]
  description: string
}

export interface PlayerStats {
  name: string
  level: number
  hp: number
  maxHp: number
  energy: number
  maxEnergy: number
  xp: number
  xpToNext: number
  gold: number
}

export interface StardewSaveFile {
  player: {
    name: string
    money: number
    maxHealth: number
    maxStamina: number
    farmName?: string
    items: SaveItem[]
  }
  gameVersion?: string
  uniqueIDForThisGame?: string
}

export interface SaveItem {
  name: string
  Stack?: number
  parentSheetIndex?: number
  category?: number
  quality?: number
}

export interface SaveValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface XMLParseError {
  message: string
  line?: number
  column?: number
}
