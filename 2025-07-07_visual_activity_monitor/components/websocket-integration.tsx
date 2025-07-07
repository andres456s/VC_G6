"use client"

import { useState, useEffect, useRef } from "react"

interface DetectionData {
  timestamp: number
  frame_id: number
  people_count: number
  objects: Array<{
    id: string
    type: string
    confidence: number
    bbox: [number, number, number, number]
    center: [number, number]
  }>
  movement_intensity: number
  dominant_color: [number, number, number]
  fps: number
}

export function useWebSocketDetection(url = "ws://localhost:8765") {
  const [data, setData] = useState<DetectionData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connect = () => {
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("🔗 Conectado al servidor de detección")
        setIsConnected(true)
        setError(null)
      }

      ws.onmessage = (event) => {
        try {
          const detectionData: DetectionData = JSON.parse(event.data)
          setData(detectionData)
        } catch (err) {
          console.error("Error parsing detection data:", err)
        }
      }

      ws.onclose = () => {
        console.log("🔌 Desconectado del servidor de detección")
        setIsConnected(false)

        // Intentar reconectar después de 3 segundos
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("🔄 Intentando reconectar...")
          connect()
        }, 3000)
      }

      ws.onerror = (error) => {
        console.error("❌ Error de WebSocket:", error)
        setError("Error de conexión con el servidor de detección")
        setIsConnected(false)
      }
    } catch (err) {
      setError("No se pudo conectar al servidor de detección")
      console.error("Connection error:", err)
    }
  }

  useEffect(() => {
    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [url])

  return { data, isConnected, error }
}

export function WebSocketStatus({
  isConnected,
  error,
}: {
  isConnected: boolean
  error: string | null
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
      <span className="text-sm">{isConnected ? "Conectado" : error || "Desconectado"}</span>
    </div>
  )
}
