import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface RetroToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  visible: boolean;
}

export function RetroToast({ message, type, onClose, visible }: RetroToastProps) {
  // Fecha automaticamente após 3 segundos
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const bgColors = {
    success: "bg-[#56f000] text-black", // Verde vibrante estilo stardew
    error: "bg-[#ff4d4d] text-white",   // Vermelho alerta
    info: "bg-[#EACB91] text-[#4A332A]", // Bege padrão
  };

  const icons = {
    success: <CheckCircle size={24} />,
    error: <AlertCircle size={24} />,
    info: <AlertCircle size={24} />,
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-full duration-300">
      {/* Borda Externa Grossa */}
      <div className="bg-[#4A332A] p-1 rounded-lg shadow-xl">
        {/* Miolo Colorido */}
        <div className={`
          ${bgColors[type]} 
          min-w-[300px] p-4 rounded-md border-2 border-opacity-50 border-black/20
          flex items-center gap-3 relative
        `}>
          {/* Ícone */}
          <div className="shrink-0">
            {icons[type]}
          </div>

          {/* Texto */}
          <div className="flex-1 font-bold text-lg leading-tight pr-6">
             {message}
          </div>

          {/* Botão Fechar (X) */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}