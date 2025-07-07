using UnityEngine;
using UnityEngine.AI;

/// <summary>
/// Gestor principal que coordina todos los componentes de IA
/// Este es el componente principal que debes agregar a tu NPC
/// </summary>
[RequireComponent(typeof(NavMeshAgent))]
public class AIBehaviorManager : MonoBehaviour
{
    [Header("Configuración General")]
    [SerializeField] private bool iniciarAutomaticamente = true;
    [SerializeField] private bool mostrarDebugInfo = true;
    
    [Header("Configuración de Comportamiento")]
    [SerializeField] private float velocidadNormal = 3.5f;
    [SerializeField] private float velocidadAlerta = 4f;
    [SerializeField] private float velocidadPersecucion = 6f;
    
    // Referencias a componentes
    private NavMeshAgent agent;
    private PatrullageController patrullaje;
    private PlayerDetection deteccion;
    private AIAnimationController animaciones;
    private AIStateMachine maquinaEstados;
    
    // Estado actual del comportamiento
    public AIStateMachine.EstadoIA EstadoActual => maquinaEstados?.EstadoActual ?? AIStateMachine.EstadoIA.Idle;
    public bool JugadorDetectado => deteccion?.JugadorDetectado ?? false;
    public float DistanciaAlJugador => deteccion?.DistanciaAlJugador ?? float.MaxValue;
    
    void Awake()
    {
        InicializarComponentes();
    }
    
    void Start()
    {
        if (iniciarAutomaticamente)
        {
            IniciarComportamientoIA();
        }
    }
    
    private void InicializarComponentes()
    {
        // Obtener o agregar componentes necesarios
        agent = GetComponent<NavMeshAgent>();
        
        patrullaje = GetComponent<PatrullageController>();
        if (patrullaje == null)
            patrullaje = gameObject.AddComponent<PatrullageController>();
        
        deteccion = GetComponent<PlayerDetection>();
        if (deteccion == null)
            deteccion = gameObject.AddComponent<PlayerDetection>();
        
        animaciones = GetComponent<AIAnimationController>();
        if (animaciones == null)
            animaciones = gameObject.AddComponent<AIAnimationController>();
        
        maquinaEstados = GetComponent<AIStateMachine>();
        if (maquinaEstados == null)
            maquinaEstados = gameObject.AddComponent<AIStateMachine>();
        
        // Configurar NavMeshAgent
        if (agent != null)
        {
            agent.speed = velocidadNormal;
            agent.angularSpeed = 120f;
            agent.acceleration = 8f;
            agent.stoppingDistance = 0.5f;
        }
    }
    
    public void IniciarComportamientoIA()
    {
        if (maquinaEstados != null)
        {
            // Suscribirse a eventos de cambio de estado
            maquinaEstados.OnCambioEstado += OnCambioEstado;
        }
        
        Debug.Log("Comportamiento IA iniciado para: " + gameObject.name);
    }
    
    private void OnCambioEstado(AIStateMachine.EstadoIA estadoAnterior, AIStateMachine.EstadoIA nuevoEstado)
    {
        // Ajustar velocidad según el estado
        switch (nuevoEstado)
        {
            case AIStateMachine.EstadoIA.Patrullando:
                agent.speed = velocidadNormal;
                break;
            case AIStateMachine.EstadoIA.Alerta:
            case AIStateMachine.EstadoIA.Buscando:
                agent.speed = velocidadAlerta;
                break;
            case AIStateMachine.EstadoIA.Persiguiendo:
                agent.speed = velocidadPersecucion;
                break;
        }
        
        if (mostrarDebugInfo)
        {
            Debug.Log($"{gameObject.name}: {estadoAnterior} → {nuevoEstado}");
        }
    }
    
    // Métodos públicos para control externo
    public void DetenerIA()
    {
        if (maquinaEstados != null)
            maquinaEstados.CambiarEstado(AIStateMachine.EstadoIA.Idle);
    }
    
    public void ReanudarIA()
    {
        if (maquinaEstados != null)
            maquinaEstados.CambiarEstado(AIStateMachine.EstadoIA.Patrullando);
    }
    
    public void ForzarEstado(AIStateMachine.EstadoIA estado)
    {
        if (maquinaEstados != null)
            maquinaEstados.CambiarEstado(estado);
    }
    
    // Información de debug
    void OnGUI()
    {
        if (!mostrarDebugInfo) return;
        
        GUILayout.BeginArea(new Rect(10, 10, 300, 200));
        GUILayout.Label($"NPC: {gameObject.name}");
        GUILayout.Label($"Estado: {EstadoActual}");
        GUILayout.Label($"Jugador Detectado: {JugadorDetectado}");
        GUILayout.Label($"Distancia: {DistanciaAlJugador:F1}m");
        GUILayout.Label($"Velocidad: {agent.velocity.magnitude:F1}");
        
        if (GUILayout.Button("Detener IA"))
            DetenerIA();
        if (GUILayout.Button("Reanudar IA"))
            ReanudarIA();
        
        GUILayout.EndArea();
    }
    
    void OnDestroy()
    {
        if (maquinaEstados != null)
        {
            maquinaEstados.OnCambioEstado -= OnCambioEstado;
        }
    }
}
