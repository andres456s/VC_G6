"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface OptimizationSettings {
  useLOD: boolean
  useInstancing: boolean
  useCulling: boolean
  useOptimizedMaterials: boolean
  useOptimizedLighting: boolean
  maxObjects: number
  renderDistance: number
}

interface OptimizationContextType {
  settings: OptimizationSettings
  updateSetting: (key: keyof OptimizationSettings, value: boolean | number) => void
  stats: {
    objectsRendered: number
    triangles: number
    fps: number
  }
  updateStats: (stats: Partial<OptimizationContextType["stats"]>) => void
}

const OptimizationContext = createContext<OptimizationContextType | undefined>(undefined)

export function OptimizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<OptimizationSettings>({
    useLOD: true,
    useInstancing: true,
    useCulling: true,
    useOptimizedMaterials: true,
    useOptimizedLighting: true,
    maxObjects: 100,
    renderDistance: 50,
  })

  const [stats, setStats] = useState({
    objectsRendered: 0,
    triangles: 0,
    fps: 60,
  })

  const updateSetting = (key: keyof OptimizationSettings, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updateStats = (newStats: Partial<typeof stats>) => {
    setStats((prev) => ({ ...prev, ...newStats }))
  }

  return (
    <OptimizationContext.Provider value={{ settings, updateSetting, stats, updateStats }}>
      {children}
    </OptimizationContext.Provider>
  )
}

export function useOptimization() {
  const context = useContext(OptimizationContext)
  if (!context) {
    throw new Error("useOptimization must be used within OptimizationProvider")
  }
  return context
}
