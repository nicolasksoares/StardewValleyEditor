"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { cn } from "@/src/lib/utils";

// Dados mockados de itens que existem no jogo (catálogo)
const ALL_GAME_ITEMS = [
  { id: 101, name: "Prismatic Shard", type: "Gem" },
  { id: 102, name: "Iridium Bar", type: "Resource" },
  { id: 103, name: "Ancient Fruit", type: "Crop" },
  { id: 104, name: "Galaxy Sword", type: "Weapon" },
  { id: 105, name: "Mega Bomb", type: "Craftable" },
  { id: 106, name: "Truffle Oil", type: "Artisan" },
  { id: 107, name: "Rabbit's Foot", type: "Animal" },
  { id: 108, name: "Void Egg", type: "Animal" },
  { id: 109, name: "Starfruit", type: "Crop" },
  { id: 110, name: "Wood", type: "Resource" },
];

export function ItemSearchTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = ALL_GAME_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-6">Item Catalog</h2>

      {/* Barra de Busca Estilizada */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 bg-white border-4 border-retro-brown pl-12 pr-4 font-vt323 text-2xl text-retro-brown placeholder:text-retro-brown/50 focus:bg-[#FFF8E7]"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-retro-brown" size={20} />
      </div>

      {/* Grid de Resultados */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 max-h-[400px]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 border-2 border-retro-brown bg-retro-dark-beige hover:bg-retro-gold cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 border-2 border-retro-brown bg-white flex items-center justify-center">
                <Package size={20} className="text-retro-brown" />
              </div>
              <div className="flex-1">
                <p className="font-press-start text-xs text-retro-brown mb-1">{item.name}</p>
                <p className="font-vt323 text-lg text-retro-brown/70">{item.type}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 font-vt323 text-lg bg-retro-brown text-retro-beige px-2">
                ADD +
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-vt323 text-xl text-retro-brown mt-10">No items found.</p>
        )}
      </div>
    </motion.div>
  );
}