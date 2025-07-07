using UnityEngine;
using UnityEngine.AI;

/// <summary>
/// Controlador de animaciones para IA
/// Sincroniza las animaciones con el comportamiento del NavMeshAgent
/// </summary>
public class AIAnimationController : MonoBehaviour
{
    [Header("Referencias")]
    [SerializeField] private Animator animator;
    [SerializeField] private NavMeshAgent agent;
    
    [Header("Parámetros de Animación")]
    [SerializeField] private string parametroVelocidad = "velocidad";
    [SerializeField] private string parametroEstaMoviendo = "estaMoviendo";
    [SerializeField] private string parametroEstaCorriendo = "estaCorriendo";
    [SerializeField] private string parametroEstaAlerta = "estaAlerta";
    
    [Header("Configuración")]
    [SerializeField] private float umbralCaminar = 0.1f;
    [SerializeField] private float umbralCorrer = 3.5f;
    [SerializeField] private float suavizadoVelocidad = 5f;
    
    private float velocidadSuavizada = 0f;
    private bool estaMoviendo = false;
    private bool estaCorriendo = false;
    private bool estaAlerta = false;
    
    // Propiedades públicas
    public bool EstaMoviendo => estaMoviendo;
    public bool EstaCorriendo => estaCorriendo;
    public bool EstaAlerta => estaAlerta;
    
    void Start()
    {
        if (animator == null)
            animator = GetComponent<Animator>();
            
        if (agent == null)
            agent = GetComponent<NavMeshAgent>();
    }
    
    void Update()
    {
        ActualizarAnimaciones();
    }
    
    private void ActualizarAnimaciones()
    {
        if (agent == null || animator == null) return;
        
        // Calcular velocidad actual
        float velocidadActual = agent.velocity.magnitude;
        velocidadSuavizada = Mathf.Lerp(velocidadSuavizada, velocidadActual, Time.deltaTime * suavizadoVelocidad);
        
        // Determinar estados de movimiento
        bool nuevoEstaMoviendo = velocidadSuavizada > umbralCaminar;
        bool nuevoEstaCorriendo = velocidadSuavizada > umbralCorrer;
        
        // Actualizar solo si hay cambios
        if (nuevoEstaMoviendo != estaMoviendo)
        {
            estaMoviendo = nuevoEstaMoviendo;
            animator.SetBool(parametroEstaMoviendo, estaMoviendo);
        }
        
        if (nuevoEstaCorriendo != estaCorriendo)
        {
            estaCorriendo = nuevoEstaCorriendo;
            animator.SetBool(parametroEstaCorriendo, estaCorriendo);
        }
        
        // Actualizar parámetro de velocidad
        animator.SetFloat(parametroVelocidad, velocidadSuavizada);
    }
    
    public void EstablecerAlerta(bool alerta)
    {
        if (estaAlerta != alerta)
        {
            estaAlerta = alerta;
            animator.SetBool(parametroEstaAlerta, estaAlerta);
        }
    }
    
    public void ReproducirAnimacion(string nombreAnimacion)
    {
        animator.SetTrigger(nombreAnimacion);
    }
    
    public void EstablecerVelocidadAgente(float velocidad)
    {
        if (agent != null)
        {
            agent.speed = velocidad;
        }
    }
    
    // Métodos para diferentes estados emocionales/comportamentales
    public void MostrarReaccionSorpresa()
    {
        ReproducirAnimacion("sorpresa");
    }
    
    public void MostrarReaccionMiedo()
    {
        ReproducirAnimacion("miedo");
    }
    
    public void MostrarReaccionAgresion()
    {
        ReproducirAnimacion("agresion");
    }
}
