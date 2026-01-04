import type { Item, PlayerStats, SaveValidationResult } from "@/types"
import { Package } from "lucide-react"

export class SaveFileParser {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB limit
  private static readonly SUPPORTED_VERSIONS = ["1.5", "1.6"]

  static validateFileSize(file: File): SaveValidationResult {
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        errors: [`File too large. Maximum size is ${this.MAX_FILE_SIZE / 1024 / 1024}MB`],
        warnings: [],
      }
    }
    return { isValid: true, errors: [], warnings: [] }
  }

  static sanitizeXML(content: string): string {
    // Remove potentially dangerous XML entities and external references
    const sanitized = content
      .replace(/<!DOCTYPE[^>]*>/gi, "") // Remove DOCTYPE declarations
      .replace(/<!ENTITY[^>]*>/gi, "") // Remove entity declarations
      .replace(/SYSTEM\s+["'][^"']*["']/gi, "") // Remove SYSTEM references
      .replace(/PUBLIC\s+["'][^"']*["']/gi, "") // Remove PUBLIC references

    return sanitized
  }

  static validateXMLStructure(xmlDoc: Document): SaveValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Check for parse errors
    const parseError = xmlDoc.querySelector("parsererror")
    if (parseError) {
      errors.push("Invalid XML structure: " + parseError.textContent)
      return { isValid: false, errors, warnings }
    }

    // Validate required elements
    const requiredElements = [
      "SaveGame",
      "player",
      "player > name",
      "player > money",
      "player > maxHealth",
      "player > maxStamina",
    ]

    for (const selector of requiredElements) {
      if (!xmlDoc.querySelector(selector)) {
        errors.push(`Missing required element: ${selector}`)
      }
    }

    // Check game version
    const gameVersion = xmlDoc.querySelector("gameVersion")?.textContent
    if (gameVersion && !this.SUPPORTED_VERSIONS.some((v) => gameVersion.startsWith(v))) {
      warnings.push(`Game version ${gameVersion} may not be fully supported`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  static parsePlayerStats(xmlDoc: Document): PlayerStats {
    const playerName = xmlDoc.querySelector("player > name")?.textContent || "Farmer"
    const gold = Number.parseInt(xmlDoc.querySelector("player > money")?.textContent || "0", 10)
    const maxHp = Number.parseInt(xmlDoc.querySelector("player > maxHealth")?.textContent || "100", 10)
    const maxEnergy = Number.parseInt(xmlDoc.querySelector("player > maxStamina")?.textContent || "270", 10)
    const currentHp = Number.parseInt(xmlDoc.querySelector("player > health")?.textContent || maxHp.toString(), 10)
    const currentEnergy = Number.parseInt(
      xmlDoc.querySelector("player > stamina")?.textContent || maxEnergy.toString(),
      10,
    )

    // Validate numeric values
    if (Number.isNaN(gold) || Number.isNaN(maxHp) || Number.isNaN(maxEnergy)) {
      throw new Error("Invalid numeric values in save file")
    }

    // Ensure values are within reasonable bounds
    const sanitizedGold = Math.max(0, Math.min(gold, 999999999))
    const sanitizedMaxHp = Math.max(1, Math.min(maxHp, 9999))
    const sanitizedMaxEnergy = Math.max(1, Math.min(maxEnergy, 9999))

    return {
      name: playerName.slice(0, 32), // Limit name length
      level: 1,
      hp: Math.min(currentHp, sanitizedMaxHp),
      maxHp: sanitizedMaxHp,
      energy: Math.min(currentEnergy, sanitizedMaxEnergy),
      maxEnergy: sanitizedMaxEnergy,
      xp: 0,
      xpToNext: 100,
      gold: sanitizedGold,
    }
  }

  static parseInventory(xmlDoc: Document): Item[] {
    const items = xmlDoc.querySelectorAll("player > items > Item")
    const parsedInventory: Item[] = []

    Array.from(items).forEach((item, index) => {
      try {
        const name = item.querySelector("name")?.textContent || "Unknown Item"
        const stackText = item.querySelector("Stack")?.textContent || "1"
        const quantity = Math.max(1, Math.min(Number.parseInt(stackText, 10) || 1, 999))
        const parentSheetIndex = Number.parseInt(item.querySelector("parentSheetIndex")?.textContent || "0", 10)

        // Only add valid items
        if (name && name !== "null" && !Number.isNaN(quantity)) {
          parsedInventory.push({
            id: index + 1,
            name: name.slice(0, 50), // Limit name length
            quantity: quantity,
            type: "Material",
            rarity: "common",
            value: 0,
            icon: Package,
            description: `Item ID: ${parentSheetIndex}`,
          })
        }
      } catch (error) {
        console.error(`Error parsing item at index ${index}:`, error)
      }
    })

    return parsedInventory
  }
}
