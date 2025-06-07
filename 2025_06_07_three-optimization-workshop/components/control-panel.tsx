"use client"

import { useOptimization } from "@/contexts/optimization-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function ControlPanel() {
  const { settings, updateSetting, stats } = useOptimization()

  return (
    <div className="absolute top-4 right-4 w-80 space-y-4">
      {/* Stats Card */}
      <Card className="bg-black/80 text-white border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">📊 Estadísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Objetos renderizados:</span>
            <span className="font-mono">{stats.objectsRendered}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Triángulos:</span>
            <span className="font-mono">{stats.triangles.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>FPS estimado:</span>
            <span className="font-mono">{stats.fps}</span>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Controls */}
      <Card className="bg-black/80 text-white border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">🔧 Optimizaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="lod" className="text-sm">
              LOD (Level of Detail)
            </Label>
            <Switch
              id="lod"
              checked={settings.useLOD}
              onCheckedChange={(checked) => updateSetting("useLOD", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="instancing" className="text-sm">
              Instancing
            </Label>
            <Switch
              id="instancing"
              checked={settings.useInstancing}
              onCheckedChange={(checked) => updateSetting("useInstancing", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="culling" className="text-sm">
              Frustum Culling
            </Label>
            <Switch
              id="culling"
              checked={settings.useCulling}
              onCheckedChange={(checked) => updateSetting("useCulling", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="materials" className="text-sm">
              Materiales Optimizados
            </Label>
            <Switch
              id="materials"
              checked={settings.useOptimizedMaterials}
              onCheckedChange={(checked) => updateSetting("useOptimizedMaterials", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="lighting" className="text-sm">
              Iluminación Eficiente
            </Label>
            <Switch
              id="lighting"
              checked={settings.useOptimizedLighting}
              onCheckedChange={(checked) => updateSetting("useOptimizedLighting", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Máximo de Objetos: {settings.maxObjects}</Label>
            <Slider
              value={[settings.maxObjects]}
              onValueChange={([value]) => updateSetting("maxObjects", value)}
              max={200}
              min={10}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Distancia de Render: {settings.renderDistance}</Label>
            <Slider
              value={[settings.renderDistance]}
              onValueChange={([value]) => updateSetting("renderDistance", value)}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
