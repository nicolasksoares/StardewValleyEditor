import React from "react";

interface GamePanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function GamePanel({ children, className, title }: GamePanelProps) {
  return (
    <div
      className={`
        
        relative bg-retro-beige p-20 //background//
        border-10 border-retro-brown
        shadow-[inset_4px_4px_0_rgba(255,255,255,0.3),inset_-4px_-4px_0_rgba(0,0,0,0.1)]
        ${className || ""}
      `}
    >
      <div className="absolute inset-0 border-10 border-retro-brown/20 pointer-events-none" />

      {title && (
        <h1 className="text-3xl font-bold text-retro-brown text-center mb-8 font-serif tracking-wide">
          {title}
        </h1>
      )}

      {children}
    </div>
  );
}