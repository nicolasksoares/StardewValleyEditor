import { Sword, Shield, Flag, Drumstick, Gem, Key, LucideIcon } from "lucide-react";

export interface Item {
  id: number;
  icon: LucideIcon;
  filled: boolean;
  name?: string;
}

export const INITIAL_INVENTORY: Item[] = [
  { id: 1, icon: Sword, filled: true, name: "Iron Sword" },
  { id: 2, icon: Shield, filled: true, name: "Wooden Shield" },
  { id: 3, icon: Flag, filled: true, name: "Potion" },
  { id: 4, icon: Drumstick, filled: true, name: "Food" },
  { id: 5, icon: Gem, filled: true, name: "Ruby" },
  { id: 6, icon: Key, filled: true, name: "Dungeon Key" },
];