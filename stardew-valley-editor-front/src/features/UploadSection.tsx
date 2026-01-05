"use client";

import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { ComplexGameFrame } from "@/components/ui/ComplexGameFrame";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

export function UploadSection({ onFileUpload, isLoading = false }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    if (isLoading) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (isLoading) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isLoading) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    // AJUSTE 1: Padding externo menor no mobile (p-2) e normal no PC (md:p-4)
    <div className="flex items-center justify-center p-2 md:p-4 w-full">
      <ComplexGameFrame className="max-w-[906px] w-full">
        
        {/* AJUSTE 2: Container Interno (Fundo Bege)
           - h-auto: Deixa a altura se ajustar ao conteúdo no mobile (fim do "esticado")
           - md:min-h-[600px]: Mantém a altura imponente só no Desktop
           - p-4: Padding menor no mobile para ganhar espaço lateral
        */}
        <div className="bg-[#EACB91] w-full h-auto md:min-h-[600px] flex flex-col items-center p-4 md:p-8 text-[#4A332A]">
            
            {/* AJUSTE 3: Tamanho da fonte e margens reduzidas no mobile */}
            <h1 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 mt-2 md:mt-4 tracking-wide text-center">
              Stardew Valley Editor by nik
            </h1>

            <div
              className={`
                w-full max-w-2xl
                border-[3px] border-dashed border-[#4A332A]/60 
                rounded-lg 
                /* AJUSTE 4: Padding interno da área de upload drasticamente reduzido no mobile */
                p-6 md:p-16 
                mb-6 md:mb-12 
                transition-all duration-200 
                flex flex-col items-center justify-center gap-4 md:gap-6 relative overflow-hidden
                ${isLoading ? "bg-[#4A332A]/10 cursor-wait" : "cursor-pointer bg-transparent hover:bg-[#4A332A]/5"}
                ${isDragging ? "scale-[1.02] bg-[#4A332A]/10" : ""}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isLoading && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
                accept="*" 
              />
              
              {isLoading ? (
                <div className="animate-spin text-[#4A332A]">
                  <Loader2 size={48} className="md:w-16 md:h-16" />
                </div>
              ) : (
                <img 
                  src="/AddIcon.png" 
                  alt="Upload Icon" 
                  // AJUSTE 5: Ícone menor no mobile
                  className="w-12 h-12 md:w-16 md:h-16 object-contain select-none"
                  style={{ imageRendering: "pixelated" }}
                />
              )}

              <div className="text-center">
                <span className="text-lg md:text-xl font-bold block mb-1">
                  {isLoading ? "Reading Save File..." : "Upload your player"}
                </span>
                {!isLoading && (
                  <span className="text-xs md:text-sm opacity-70">
                    (Click or drag file here)
                  </span>
                )}
              </div>
            </div>

            <div className="w-full max-w-2xl text-left space-y-2 md:space-y-3 text-sm font-medium pb-4">
              <p className="font-bold text-base md:text-lg mb-2 md:mb-4">Default save locations:</p>
              
              {/* AJUSTE 6: Texto menor e quebra de linha forçada (break-all) para caminhos longos */}
              <div className="space-y-2 opacity-90 text-[10px] sm:text-xs md:text-sm break-all sm:break-normal">
                <p>
                  <span className="font-bold">Windows:</span> %appdata%\StardewValley\Saves
                </p>
                <p>
                  <span className="font-bold">Mac:</span> ~/.config/StardewValley/Saves
                </p>
                <p>
                  <span className="font-bold">Linux:</span> ~/.config/StardewValley/Saves
                </p>
                <p>
                  <span className="font-bold">Android:</span> /Android/data/com.chucklefish.stardewvalley/files/Saves
                </p>
                <p>
                  <span className="font-bold">iOS:</span> Locations -&gt; On My iPhone/iPad -&gt; Stardew Valley
                </p>
              </div>
            </div>

        </div>
      </ComplexGameFrame>
    </div>
  );
}