import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Smartphone, Lightbulb, Target } from "lucide-react"

export function ARInstructions() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Preparación
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-100 space-y-2">
          <div className="flex items-start gap-2">
            <Smartphone className="w-4 h-4 mt-1 text-blue-300" />
            <span className="text-sm">Usa un dispositivo con cámara</span>
          </div>
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 mt-1 text-blue-300" />
            <span className="text-sm">Permite acceso a la cámara</span>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 mt-1 text-blue-300" />
            <span className="text-sm">Imprime el marcador Hiro</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-100 space-y-2">
          <div className="text-sm">• Apunta la cámara hacia el marcador</div>
          <div className="text-sm">• Mantén buena iluminación</div>
          <div className="text-sm">• Distancia óptima: 20-50 cm</div>
          <div className="text-sm">• Mueve lentamente para mejor detección</div>
        </CardContent>
      </Card>
    </div>
  )
}
