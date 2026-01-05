export interface SaveData {
  playerName: string;
  farmName: string;
  money: number;
  totalEarnings: number;
  originalXML: string;
}

export const parseSaveFile = (file: File): Promise<SaveData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const saveGame = xmlDoc.querySelector("SaveGame");
        if (!saveGame) {
          throw new Error("Arquivo inválido");
        }

        const data: SaveData = {
          playerName: xmlDoc.querySelector("player > name")?.textContent || "Farmer",
          farmName: xmlDoc.querySelector("player > farmName")?.textContent || "Farm",
          money: Number(xmlDoc.querySelector("player > money")?.textContent || 0),
          totalEarnings: Number(xmlDoc.querySelector("player > totalMoneyEarned")?.textContent || 0),
          originalXML: text,
        };

        resolve(data);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error("Erro ao ler o arquivo"));
    reader.readAsText(file);
  });
};