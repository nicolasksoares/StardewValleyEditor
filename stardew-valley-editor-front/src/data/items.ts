import {
  Sword,
  Shield,
  Flag as Flask,
  Drumstick,
  Gem,
  Key,
  Wand,
  Hammer,
  Axe,
  Pickaxe,
  Shovel,
  Apple,
  Carrot,
  Fish,
  Wheat,
  Diamond,
  Coins,
  Star,
  Zap,
  Heart,
  Footprints,
} from "lucide-react"
import type { Item } from "@/types"

export const ITEMS_DATABASE: Item[] = [
  // Weapons
  {
    id: 1,
    icon: Sword,
    name: "Iron Sword",
    type: "Weapon",
    description: "A sturdy blade forged from iron",
    quantity: 1,
    rarity: "common",
    value: 150,
  },
  {
    id: 2,
    icon: Wand,
    name: "Magic Wand",
    type: "Weapon",
    description: "Channel mystical energies",
    quantity: 1,
    rarity: "rare",
    value: 450,
  },
  {
    id: 3,
    icon: Zap,
    name: "Lightning Staff",
    type: "Weapon",
    description: "Strikes with the power of storms",
    quantity: 1,
    rarity: "epic",
    value: 1200,
  },

  // Armor
  {
    id: 4,
    icon: Shield,
    name: "Wooden Shield",
    type: "Armor",
    description: "Basic protection from harm",
    quantity: 1,
    rarity: "common",
    value: 80,
  },
  {
    id: 5,
    icon: Star,
    name: "Star Armor",
    type: "Armor",
    description: "Infused with celestial power",
    quantity: 1,
    rarity: "legendary",
    value: 3000,
  },

  // Tools
  {
    id: 6,
    icon: Hammer,
    name: "Hammer",
    type: "Tool",
    description: "For construction and repairs",
    quantity: 1,
    rarity: "common",
    value: 50,
  },
  {
    id: 7,
    icon: Axe,
    name: "Steel Axe",
    type: "Tool",
    description: "Chops wood efficiently",
    quantity: 1,
    rarity: "common",
    value: 120,
  },
  {
    id: 8,
    icon: Pickaxe,
    name: "Gold Pickaxe",
    type: "Tool",
    description: "Breaks rocks with ease",
    quantity: 1,
    rarity: "rare",
    value: 600,
  },
  {
    id: 9,
    icon: Shovel,
    name: "Shovel",
    type: "Tool",
    description: "Dig and till the soil",
    quantity: 1,
    rarity: "common",
    value: 100,
  },

  // Consumables
  {
    id: 10,
    icon: Flask,
    name: "Health Potion",
    type: "Consumable",
    description: "Restores 50 HP",
    quantity: 5,
    rarity: "common",
    value: 30,
  },
  {
    id: 11,
    icon: Heart,
    name: "Greater Health Potion",
    type: "Consumable",
    description: "Restores 150 HP",
    quantity: 2,
    rarity: "rare",
    value: 120,
  },
  {
    id: 12,
    icon: Footprints,
    name: "Speed Potion",
    type: "Consumable",
    description: "Increases movement for 5 min",
    quantity: 3,
    rarity: "rare",
    value: 200,
  },

  // Food
  {
    id: 13,
    icon: Drumstick,
    name: "Cooked Meat",
    type: "Food",
    description: "Restores 30 energy",
    quantity: 8,
    rarity: "common",
    value: 25,
  },
  {
    id: 14,
    icon: Apple,
    name: "Apple",
    type: "Food",
    description: "Fresh and crispy",
    quantity: 12,
    rarity: "common",
    value: 15,
  },
  {
    id: 15,
    icon: Fish,
    name: "Grilled Fish",
    type: "Food",
    description: "Restores 45 energy",
    quantity: 4,
    rarity: "common",
    value: 40,
  },

  // Seeds
  {
    id: 16,
    icon: Wheat,
    name: "Wheat Seeds",
    type: "Seed",
    description: "Grows in 4 days",
    quantity: 20,
    rarity: "common",
    value: 10,
  },
  {
    id: 17,
    icon: Carrot,
    name: "Carrot Seeds",
    type: "Seed",
    description: "Nutritious vegetable",
    quantity: 15,
    rarity: "common",
    value: 12,
  },

  // Gems & Materials
  {
    id: 18,
    icon: Gem,
    name: "Ruby",
    type: "Gem",
    description: "A precious red gemstone",
    quantity: 3,
    rarity: "rare",
    value: 500,
  },
  {
    id: 19,
    icon: Diamond,
    name: "Diamond",
    type: "Gem",
    description: "The hardest known material",
    quantity: 1,
    rarity: "legendary",
    value: 5000,
  },
  {
    id: 20,
    icon: Coins,
    name: "Gold Ore",
    type: "Material",
    description: "Can be smelted into bars",
    quantity: 10,
    rarity: "rare",
    value: 80,
  },

  // Key Items
  {
    id: 21,
    icon: Key,
    name: "Old Key",
    type: "Key Item",
    description: "Opens ancient locks",
    quantity: 1,
    rarity: "rare",
    value: 0,
  },
]

export const INITIAL_INVENTORY: Item[] = [
  ITEMS_DATABASE[0], // Iron Sword
  ITEMS_DATABASE[3], // Wooden Shield
  ITEMS_DATABASE[9], // Health Potion
  ITEMS_DATABASE[12], // Cooked Meat
  ITEMS_DATABASE[17], // Ruby
  ITEMS_DATABASE[20], // Old Key
  ITEMS_DATABASE[1], // Magic Wand
  ITEMS_DATABASE[5], // Hammer
  ITEMS_DATABASE[6], // Axe
]
