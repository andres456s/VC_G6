using UnityEngine;

/// <summary>
/// Sistema de detección de jugador usando diferentes métodos
/// Incluye detección por distancia, campo de visión y triggers
/// </summary>
public class PlayerDetection : MonoBehaviour
{
    [Header("Configuración de Detección")]
    [SerializeField] private float rangoDeteccion = 10f;
    [SerializeField] private float anguloVision = 60f;
    [SerializeField] private LayerMask capasJugador = 1;
    [SerializeField] private LayerMask capasObstaculos = 1;
    
    [Header("Referencias")]
    [SerializeField] private Transform puntoVision;
    
    private Transform jugador;
    private bool jugadorDetectado = false;
    private float distanciaAlJugador;
    
    // Eventos
    public System.Action<Transform> OnJugadorDetectado;
    public System.Action OnJugadorPerdido;
    
    public bool JugadorDetectado => jugadorDetectado;
    public float DistanciaAlJugador => distanciaAlJugador;
    public Transform Jugador => jugador;
    
    void Start()
    {
        if (puntoVision == null)
            puntoVision = transform;
            
        // Buscar al jugador en la escena
        GameObject jugadorObj = GameObject.FindGameObjectWithTag("Player");
        if (jugadorObj != null)
            jugador = jugadorObj.transform;
    }
    
    void Update()
    {
        if (jugador == null) return;
        
        bool deteccionAnterior = jugadorDetectado;
        jugadorDetectado = DetectarJugador();
        
        // Eventos de cambio de estado
        if (jugadorDetectado && !deteccionAnterior)
        {
            OnJugadorDetectado?.Invoke(jugador);
        }
        else if (!jugadorDetectado && deteccionAnterior)
        {
            OnJugadorPerdido?.Invoke();
        }
    }
    
    private bool DetectarJugador()
    {
        distanciaAlJugador = Vector3.Distance(transform.position, jugador.position);
        
        // Verificar si está dentro del rango
        if (distanciaAlJugador > rangoDeteccion)
            return false;
        
        // Verificar ángulo de visión
        Vector3 direccionAlJugador = (jugador.position - puntoVision.position).normalized;
        float angulo = Vector3.Angle(puntoVision.forward, direccionAlJugador);
        
        if (angulo > anguloVision / 2f)
            return false;
        
        // Verificar línea de visión (sin obstáculos)
        if (Physics.Raycast(puntoVision.position, direccionAlJugador, distanciaAlJugador, capasObstaculos))
            return false;
        
        return true;
    }
    
    // Detección por trigger (alternativa)
    void OnTriggerEnter(Collider other)
    {
        if (((1 << other.gameObject.layer) & capasJugador) != 0)
        {
            jugador = other.transform;
            OnJugadorDetectado?.Invoke(jugador);
        }
    }
    
    void OnTriggerExit(Collider other)
    {
        if (((1 << other.gameObject.layer) & capasJugador) != 0)
        {
            OnJugadorPerdido?.Invoke();
        }
    }
    
    // Visualización en el editor
    void OnDrawGizmosSelected()
    {
        if (puntoVision == null) return;
        
        // Rango de detección
        Gizmos.color = jugadorDetectado ? Color.red : Color.yellow;
        Gizmos.DrawWireSphere(transform.position, rangoDeteccion);
        
        // Campo de visión
        Vector3 anguloIzquierdo = Quaternion.AngleAxis(-anguloVision / 2f, Vector3.up) * puntoVision.forward;
        Vector3 anguloDerecho = Quaternion.AngleAxis(anguloVision / 2f, Vector3.up) * puntoVision.forward;
        
        Gizmos.color = Color.blue;
        Gizmos.DrawRay(puntoVision.position, anguloIzquierdo * rangoDeteccion);
        Gizmos.DrawRay(puntoVision.position, anguloDerecho * rangoDeteccion);
        
        // Línea al jugador si está detectado
        if (jugadorDetectado && jugador != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawLine(puntoVision.position, jugador.position);
        }
    }
}
