import type { Item, PlayerStats } from "@/types"

export class SaveFileExporter {
  private originalXML = ""

  setOriginalXML(xml: string) {
    this.originalXML = xml
  }

  generateEditedSave(playerStats: PlayerStats, inventory: Item[]): string {
    if (!this.originalXML) {
      throw new Error("No original save file loaded")
    }

    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(this.originalXML, "text/xml")

    // Update player stats
    const moneyElement = xmlDoc.querySelector("player > money")
    if (moneyElement) moneyElement.textContent = playerStats.gold.toString()

    const maxHealthElement = xmlDoc.querySelector("player > maxHealth")
    if (maxHealthElement) maxHealthElement.textContent = playerStats.maxHp.toString()

    const maxStaminaElement = xmlDoc.querySelector("player > maxStamina")
    if (maxStaminaElement) maxStaminaElement.textContent = playerStats.maxEnergy.toString()

    const nameElement = xmlDoc.querySelector("player > name")
    if (nameElement) nameElement.textContent = playerStats.name

    // Update inventory items quantities (keeping original structure)
    const items = xmlDoc.querySelectorAll("player > items > Item")
    Array.from(items).forEach((item, index) => {
      const inventoryItem = inventory[index]
      if (inventoryItem) {
        const stackElement = item.querySelector("Stack")
        if (stackElement) {
          stackElement.textContent = inventoryItem.quantity.toString()
        }
      }
    })

    const serializer = new XMLSerializer()
    return serializer.serializeToString(xmlDoc)
  }

  downloadSave(content: string, filename: string) {
    const blob = new Blob([content], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  createBackup(content: string, filename: string) {
    const backupFilename = `${filename.replace(/\.[^/.]+$/, "")}_backup_${Date.now()}.xml`
    this.downloadSave(content, backupFilename)
  }
}
