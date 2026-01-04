"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, Download, Github, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import RPGMenu from "@/features/RPGMenu"
import { useGame } from "@/contexts/GameContext"
import { SaveFileParser } from "@/utils/SaveFileParser"
import { SaveFileExporter } from "@/utils/SaveFileExporter"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export default function SaveEditor() {
  const [hasFile, setHasFile] = useState(false)
  const [fileName, setFileName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useLocalStorage("hasUnsavedChanges", false)
  const { setPlayerStats, setInventory, playerStats, inventory } = useGame()
  const exporterRef = useRef(new SaveFileExporter())

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setErrors([])
    setWarnings([])

    try {
      const sizeValidation = SaveFileParser.validateFileSize(file)
      if (!sizeValidation.isValid) {
        setErrors(sizeValidation.errors)
        setIsLoading(false)
        return
      }

      setFileName(file.name)
      const reader = new FileReader()

      reader.onerror = () => {
        setErrors(["Failed to read file. Please try again."])
        setIsLoading(false)
      }

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const sanitizedContent = SaveFileParser.sanitizeXML(content)

          exporterRef.current.setOriginalXML(sanitizedContent)

          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(sanitizedContent, "text/xml")

          const validation = SaveFileParser.validateXMLStructure(xmlDoc)
          if (!validation.isValid) {
            setErrors(validation.errors)
            setIsLoading(false)
            return
          }

          if (validation.warnings.length > 0) {
            setWarnings(validation.warnings)
          }

          const playerStats = SaveFileParser.parsePlayerStats(xmlDoc)
          const parsedInventory = SaveFileParser.parseInventory(xmlDoc)

          setPlayerStats(playerStats)
          setInventory(parsedInventory)
          setHasFile(true)
          setHasUnsavedChanges(false)

          exporterRef.current.createBackup(content, file.name)
        } catch (error) {
          console.error("Error parsing save file:", error)
          setErrors([
            error instanceof Error
              ? error.message
              : "Failed to parse save file. Please ensure it's a valid Stardew Valley save file.",
          ])
        } finally {
          setIsLoading(false)
        }
      }

      reader.readAsText(file)
    } catch (error) {
      console.error("Error handling file upload:", error)
      setErrors(["An unexpected error occurred while processing the file."])
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    try {
      const editedSave = exporterRef.current.generateEditedSave(playerStats, inventory)
      const downloadFileName = fileName.replace(/\.[^/.]+$/, "") + "_edited.xml"

      exporterRef.current.downloadSave(editedSave, downloadFileName)
      setHasUnsavedChanges(false)
      alert("Save file downloaded successfully!")
    } catch (error) {
      console.error("Error generating download:", error)
      alert("Failed to generate save file. Please try again.")
    }
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to close?")
      if (!confirm) return
    }
    setHasFile(false)
    setFileName("")
    setErrors([])
    setWarnings([])
    setHasUnsavedChanges(false)
  }

  const handleDataChange = () => {
    setHasUnsavedChanges(true)
  }

  if (!hasFile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-retro-beige p-2 sm:p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg md:max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-press-start text-lg sm:text-xl md:text-2xl text-retro-brown mb-4 leading-relaxed">
              Stardew Valley Save Editor
            </h1>
            <a
              href="https://github.com/colecrouter/stardew-save-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-retro-brown hover:text-retro-gold transition-colors"
            >
              <Github size={24} />
              <span className="font-vt323 text-lg">Inspired by Cole Crouter&apos;s Editor</span>
            </a>
          </div>

          <div className="bg-retro-beige border-2 border-retro-brown p-4 sm:p-8 shadow-[4px_4px_12px_rgba(74,51,42,0.15)]">
            <div className="text-center mb-6">
              <h2 className="font-press-start text-sm text-retro-brown mb-4">Upload Your Save File</h2>
              <p className="font-vt323 text-lg text-retro-brown/80 mb-2">Default save locations:</p>
              <ul className="font-vt323 text-base text-retro-brown/70 space-y-1 text-left max-w-md mx-auto">
                <li>
                  <strong>Windows:</strong> %appdata%\StardewValley\Saves
                </li>
                <li>
                  <strong>Mac:</strong> ~/Library/Application Support/StardewValley/Saves
                </li>
                <li>
                  <strong>Linux:</strong> ~/.config/StardewValley/Saves
                </li>
              </ul>
            </div>

            <div className="border-2 border-dashed border-retro-brown p-8 text-center bg-retro-dark-beige/30 hover:bg-retro-dark-beige/50 transition-colors cursor-pointer">
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload size={48} className="mx-auto mb-4 text-retro-brown" />
                <p className="font-vt323 text-xl text-retro-brown mb-2">
                  {isLoading ? "Loading..." : "Click to upload or drag and drop"}
                </p>
                <p className="font-vt323 text-sm text-retro-brown/60">Your save file (XML format)</p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xml,.sav"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>

            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-red-100 border-2 border-red-800"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-red-800 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-vt323 text-base text-red-800 font-bold mb-2">Errors:</p>
                      <ul className="font-vt323 text-sm text-red-800 list-disc list-inside">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {warnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-800"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-yellow-800 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-vt323 text-base text-yellow-800 font-bold mb-2">Warnings:</p>
                      <ul className="font-vt323 text-sm text-yellow-800 list-disc list-inside">
                        {warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 p-4 bg-red-100 border-2 border-red-800">
              <p className="font-vt323 text-base text-red-800 text-center">
                <strong>Warning:</strong> Always backup your save file before editing. A backup will be created
                automatically when you load a file.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pb-10">
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-retro-beige border-b-2 border-retro-brown p-2 sm:p-3 shadow-md">
        <div className="flex items-center gap-2 flex-1 min-w-0 w-full justify-center sm:justify-start">
          <p className="font-vt323 text-lg text-retro-brown truncate">
            File: <strong>{fileName}</strong>
            {hasUnsavedChanges && <span className="text-red-600 ml-2 text-sm sm:text-base">*</span>}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-center">
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-retro-gold border-2 border-retro-brown hover:bg-retro-gold/80 transition-colors"
            title="Download edited save file"
          >
            <Download size={18} className="text-retro-brown" />
            <span className="font-vt323 text-base text-retro-brown">Save</span>
          </button>
          <button
            onClick={handleClose}
            className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 bg-retro-dark-beige border-2 border-retro-brown hover:bg-retro-brown hover:text-retro-beige transition-colors font-vt323 text-base"
          >
            Close
          </button>
        </div>
      </div>

      <div className="pt-28 sm:pt-20 px-2 sm:px-4">
        <RPGMenu onDataChange={handleDataChange} />
      </div>
    </div>
  )
}