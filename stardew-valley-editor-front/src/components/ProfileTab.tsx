"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export function ProfileTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-press-start text-retro-brown text-center mb-8">\\Player Name//</h2>

      <div className="flex gap-6">
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 border-4 border-retro-brown bg-retro-dark-beige flex items-center justify-center shrink-0">
          <User size={64} strokeWidth={2} className="text-retro-brown" />
        </div>

        {/* Stats Block */}
        <div className="flex-1 space-y-4 font-vt323 text-xl">
          <StatBar label="HP" value={85} max={100} color="#E63946" />
          <StatBar label="MP" value={60} max={100} color="#457B9D" />
          <StatBar label="STR" value={75} max={100} color="#F4A261" />
          <StatBar label="DEX" value={90} max={100} color="#2A9D8F" />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 font-vt323 text-xl text-retro-brown space-y-2">
        <div className="flex justify-between border-b-2 border-retro-dark-beige border-dotted">
          <span>Level:</span>
          <span>12</span>
        </div>
        <div className="flex justify-between border-b-2 border-retro-dark-beige border-dotted">
          <span>Gold:</span>
          <span>1,250</span>
        </div>
        <div className="flex justify-between border-b-2 border-retro-dark-beige border-dotted">
          <span>EXP:</span>
          <span>3,450 / 5,000</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-retro-brown">{label}</span>
        <span className="text-retro-brown">{value}/{max}</span>
      </div>
      <div className="w-full h-6 border-[3px] border-retro-brown bg-white relative">
        <div
          className="h-full transition-all duration-300 absolute top-0 left-0"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}