using UnityEngine;

/// <summary>
/// Máquina de estados para IA de personajes
/// Maneja las transiciones entre diferentes comportamientos
/// </summary>
public class AIStateMachine : MonoBehaviour
{
    public enum EstadoIA
    {
        Idle,
        Patrullando,
        Persiguiendo,
        Buscando,
        Regresando,
        Alerta
    }
    
    [Header("Configuración de Estados")]
    [SerializeField] private EstadoIA estadoInicial = EstadoIA.Patrullando;
    [SerializeField] private float tiempoBusqueda = 5f;
    [SerializeField] private float tiempoAlerta = 3f;
    
    private EstadoIA estadoActual;
    private EstadoIA estadoAnterior;
    private float tiempoEnEstado = 0f;
    
    // Referencias a componentes
    private PatrullageController patrullaje;
    private PlayerDetection deteccion;
    private AIAnimationController animaciones;
    
    // Variables de estado
    private Vector3 ultimaPosicionJugador;
    private bool jugadorVisto = false;
    
    public EstadoIA EstadoActual => estadoActual;
    
    // Eventos
    public System.Action<EstadoIA, EstadoIA> OnCambioEstado;
    
    void Start()
    {
        // Obtener componentes
        patrullaje = GetComponent<PatrullageController>();
        deteccion = GetComponent<PlayerDetection>();
        animaciones = GetComponent<AIAnimationController>();
        
        // Suscribirse a eventos de detección
        if (deteccion != null)
        {
            deteccion.OnJugadorDetectado += OnJugadorDetectado;
            deteccion.OnJugadorPerdido += OnJugadorPerdido;
        }
        
        // Establecer estado inicial
        CambiarEstado(estadoInicial);
    }
    
    void Update()
    {
        tiempoEnEstado += Time.deltaTime;
        ActualizarEstadoActual();
    }
    
    private void ActualizarEstadoActual()
    {
        switch (estadoActual)
        {
            case EstadoIA.Idle:
                ActualizarIdle();
                break;
            case EstadoIA.Patrullando:
                ActualizarPatrullando();
                break;
            case EstadoIA.Persiguiendo:
                ActualizarPersiguiendo();
                break;
            case EstadoIA.Buscando:
                ActualizarBuscando();
                break;
            case EstadoIA.Regresando:
                ActualizarRegresando();
                break;
            case EstadoIA.Alerta:
                ActualizarAlerta();
                break;
        }
    }
    
    private void ActualizarIdle()
    {
        // Transición automática a patrullaje después de un tiempo
        if (tiempoEnEstado > 2f)
        {
            CambiarEstado(EstadoIA.Patrullando);
        }
    }
    
    private void ActualizarPatrullando()
    {
        // El patrullaje se maneja automáticamente por PatrullageController
        // Las transiciones se manejan por eventos de detección
    }
    
    private void ActualizarPersiguiendo()
    {
        if (deteccion.JugadorDetectado)
        {
            // Seguir al jugador
            ultimaPosicionJugador = deteccion.Jugador.position;
            patrullaje.IrAPunto(ultimaPosicionJugador);
        }
    }
    
    private void ActualizarBuscando()
    {
        // Buscar en la última posición conocida
        if (tiempoEnEstado > tiempoBusqueda)
        {
            CambiarEstado(EstadoIA.Regresando);
        }
    }
    
    private void ActualizarRegresando()
    {
        // Regresar al patrullaje normal
        CambiarEstado(EstadoIA.Patrullando);
    }
    
    private void ActualizarAlerta()
    {
        if (tiempoEnEstado > tiempoAlerta)
        {
            if (jugadorVisto)
                CambiarEstado(EstadoIA.Buscando);
            else
                CambiarEstado(EstadoIA.Patrullando);
        }
    }
    
    public void CambiarEstado(EstadoIA nuevoEstado)
    {
        if (estadoActual == nuevoEstado) return;
        
        // Salir del estado actual
        SalirEstado(estadoActual);
        
        // Cambiar estado
        estadoAnterior = estadoActual;
        estadoActual = nuevoEstado;
        tiempoEnEstado = 0f;
        
        // Entrar al nuevo estado
        EntrarEstado(estadoActual);
        
        // Notificar cambio
        OnCambioEstado?.Invoke(estadoAnterior, estadoActual);
        
        Debug.Log($"IA cambió de {estadoAnterior} a {estadoActual}");
    }
    
    private void EntrarEstado(EstadoIA estado)
    {
        switch (estado)
        {
            case EstadoIA.Idle:
                patrullaje?.DetenerPatrullaje();
                animaciones?.EstablecerAlerta(false);
                break;
                
            case EstadoIA.Patrullando:
                patrullaje?.ReanudarPatrullaje();
                animaciones?.EstablecerAlerta(false);
                animaciones?.EstablecerVelocidadAgente(3.5f);
                break;
                
            case EstadoIA.Persiguiendo:
                patrullaje?.DetenerPatrullaje();
                animaciones?.EstablecerAlerta(true);
                animaciones?.EstablecerVelocidadAgente(6f);
                break;
                
            case EstadoIA.Buscando:
                patrullaje?.DetenerPatrullaje();
                patrullaje?.IrAPunto(ultimaPosicionJugador);
                animaciones?.EstablecerAlerta(true);
                animaciones?.EstablecerVelocidadAgente(4f);
                break;
                
            case EstadoIA.Alerta:
                patrullaje?.DetenerPatrullaje();
                animaciones?.EstablecerAlerta(true);
                animaciones?.MostrarReaccionSorpresa();
                break;
        }
    }
    
    private void SalirEstado(EstadoIA estado)
    {
        // Lógica de limpieza al salir de estados específicos
        switch (estado)
        {
            case EstadoIA.Persiguiendo:
                jugadorVisto = true;
                break;
        }
    }
    
    private void OnJugadorDetectado(Transform jugador)
    {
        switch (estadoActual)
        {
            case EstadoIA.Patrullando:
            case EstadoIA.Idle:
                CambiarEstado(EstadoIA.Alerta);
                break;
                
            case EstadoIA.Alerta:
                CambiarEstado(EstadoIA.Persiguiendo);
                break;
        }
    }
    
    private void OnJugadorPerdido()
    {
        if (estadoActual == EstadoIA.Persiguiendo)
        {
            CambiarEstado(EstadoIA.Buscando);
        }
    }
    
    void OnDestroy()
    {
        if (deteccion != null)
        {
            deteccion.OnJugadorDetectado -= OnJugadorDetectado;
            deteccion.OnJugadorPerdido -= OnJugadorPerdido;
        }
    }
}
