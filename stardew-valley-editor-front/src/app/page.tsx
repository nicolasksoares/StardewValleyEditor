"use client";

import { useState } from "react";
// Verifique se os caminhos dos imports estão corretos conforme suas pastas
// Se UploadSection estiver em components, mude de @/features para @/components
import { UploadSection } from "@/features/UploadSection"; 
import { PlayerPage } from "@/components/player-page";
import { InventoryPage } from "@/components/inventory-page";
import { RelationshipsPage } from "@/components/relationships-page";
import { SearchItemsPage } from "@/components/search-items-page";
import { RetroToast, ToastType } from "@/components/ui/RetroToast";
import { parseSaveFile, SaveData } from "@/utils/SaveFileParser";

type TabType = "player" | "inventory" | "relationships" | "search";

export default function Home() {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [currentTab, setCurrentTab] = useState<TabType>("player");
  
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
      const data = await parseSaveFile(file);
      
      setSaveData(data);
      setCurrentTab("player");
      showToast(`Welcome back, ${data.playerName}!`, "success");

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to load save file.";
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case "player":
        // Passamos initialData aqui para preencher os inputs
        return <PlayerPage onNavigate={setCurrentTab} initialData={saveData} />;
      case "inventory":
        return <InventoryPage onNavigate={setCurrentTab} />;
      case "relationships":
        return <RelationshipsPage onNavigate={setCurrentTab} />;
      case "search":
        return <SearchItemsPage onNavigate={setCurrentTab} />;
      default:
        return <PlayerPage onNavigate={setCurrentTab} initialData={saveData} />;
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
           {renderContent()}
        </div>
      )}
    </main>
  );
}