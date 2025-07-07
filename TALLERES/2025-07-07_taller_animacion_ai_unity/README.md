# 🤖 Taller 60 - Animación con AI en Unity para Personajes Autónomos

## 📋 Descripción del Proyecto

Este taller implementa un sistema completo de inteligencia artificial para personajes no jugables (NPCs) en Unity, incluyendo navegación autónoma, detección de jugadores, control de animaciones y máquinas de estados.

## 🎯 Objetivos Cumplidos

- ✅ Implementación de comportamientos autónomos usando NavMesh
- ✅ Sistema de detección de obstáculos y jugadores
- ✅ Control de animaciones reactivas en tiempo real
- ✅ Máquina de estados para gestionar comportamientos
- ✅ Algoritmos de decisión para NPCs inteligentes

## 🧠 Conceptos Implementados

### 1. Sistema de Navegación (NavMesh)
- **PatrullageController.cs**: Maneja el movimiento autónomo entre puntos
- Evita obstáculos automáticamente
- Patrullaje cíclico con tiempos de espera configurables

### 2. Detección Inteligente
- **PlayerDetection.cs**: Sistema multi-modal de detección
- Detección por distancia, ángulo de visión y línea de vista
- Eventos para notificar cambios de estado

### 3. Control de Animaciones
- **AIAnimationController.cs**: Sincroniza animaciones con comportamiento
- Transiciones suaves entre estados (Idle, Walk, Run, Alert)
- Parámetros configurables para diferentes umbrales

### 4. Máquina de Estados
- **AIStateMachine.cs**: Gestiona transiciones entre comportamientos
- Estados: Idle, Patrullando, Persiguiendo, Buscando, Alerta
- Lógica de transición basada en eventos

### 5. Gestor Principal
- **AIBehaviorManager.cs**: Coordina todos los componentes
- Configuración centralizada y fácil de usar
- Debug visual para desarrollo

## 🛠️ Configuración en Unity

### Paso 1: Preparar la Escena
```csharp
// 1. Crear terreno y obstáculos
// 2. Marcar suelo como "Walkable" 
// 3. Marcar obstáculos como "Not Walkable"
// 4. Window → AI → Navigation → Bake
