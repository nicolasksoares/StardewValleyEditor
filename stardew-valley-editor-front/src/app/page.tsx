"use client";

import { useState } from "react";
import RPGMenu from "@/features/RPGMenu";
import { UploadSection } from "@/features/UploadSection";
import { parseSaveFile, SaveData } from "@/utils/SaveFileParser";
import { RetroToast, ToastType } from "@/components/ui/RetroToast";

export default function Home() {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ visible: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleFile = async (file: File) => {
    setIsLoading(true);
    closeToast();

    try {
      await new Promise(r => setTimeout(r, 800));

      const data = await parseSaveFile(file);
      
      showToast(`Welcome back, ${data.playerName}!`, "success");
      setSaveData(data);
    } catch (error) {
      console.error(error);
      const errorMsg = error instanceof Error ? error.message : "Failed to load save file.";
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#2d2d2d] flex items-center justify-center p-4">
      <RetroToast 
        message={toast.message} 
        type={toast.type} 
        visible={toast.visible} 
        onClose={closeToast} 
      />

      {!saveData ? (
        <UploadSection onFileUpload={handleFile} isLoading={isLoading} />
      ) : (
        <div className="animate-in fade-in zoom-in duration-300 w-full flex justify-center">
           <RPGMenu /> 
        </div>
      )}
    </main>
  );
}