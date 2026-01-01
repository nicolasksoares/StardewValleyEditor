"use client";

import { useState } from "react";
import { Smile, Backpack, Search, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { ProfileTab } from "@/src/components/ProfileTab";
import { InventoryTab } from "@/src/components/InventoryTab";
import { ItemSearchTab } from "@/src/components/ItemSearchTab";
import { RelationshipsTab } from "@/src/components/RelationshipsTab";
import { cn } from "@/src/lib/utils";

type TabType = "profile" | "inventory" | "search" | "social";

export default function RPGMenu() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile" as const, icon: Smile, label: "Profile" },
    { id: "inventory" as const, icon: Backpack, label: "Inventory" },
    { id: "social" as const, icon: Heart, label: "Social" }, // Nova aba
    { id: "search" as const, icon: Search, label: "Item Spawner" }, // Lupa corrigida
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-retro-beige p-4 font-vt323">
      <div className="relative w-full max-w-[500px]">
        
        {/* --- ABAS --- */}
        <div className="flex gap-1 mb-[-4px] relative pl-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 py-3 border-4 border-retro-brown cursor-pointer transition-colors duration-200",
                  isActive 
                    ? "bg-retro-beige z-20 border-b-retro-beige pt-2" 
                    : "bg-retro-dark-beige z-10 hover:bg-retro-gold mt-1"
                )}
                title={tab.label}
              >
                <Icon size={24} strokeWidth={3} className="text-retro-brown" />
              </button>
            );
          })}
        </div>

        {/* --- CONTEÚDO --- */}
        <motion.div
          className="bg-retro-beige border-4 border-retro-brown p-8 min-h-[600px] relative z-10 shadow-[8px_8px_0px_0px_rgba(74,51,42,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "search" && <ItemSearchTab />}
          {activeTab === "social" && <RelationshipsTab />}
        </motion.div>
      </div>
    </div>
  );
}