using UnityEngine;
using UnityEngine.AI;

/// <summary>
/// Controlador de patrullaje autónomo para NPCs
/// Maneja el movimiento entre puntos de patrullaje usando NavMeshAgent
/// </summary>
public class PatrullageController : MonoBehaviour
{
    [Header("Configuración de Patrullaje")]
    [SerializeField] private Transform[] puntosPatrullaje;
    [SerializeField] private float tiempoEspera = 2f;
    [SerializeField] private float distanciaMinima = 0.5f;
    
    private NavMeshAgent agent;
    private int indiceActual = 0;
    private float tiempoEsperaActual = 0f;
    private bool esperando = false;
    
    public bool EstaPatrullando { get; private set; } = true;
    
    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
        
        if (puntosPatrullaje.Length == 0)
        {
            Debug.LogWarning("No hay puntos de patrullaje asignados!");
            return;
        }
        
        // Ir al primer punto
        IrAlSiguientePunto();
    }
    
    void Update()
    {
        if (!EstaPatrullando || puntosPatrullaje.Length == 0) return;
        
        // Si estamos esperando
        if (esperando)
        {
            tiempoEsperaActual -= Time.deltaTime;
            if (tiempoEsperaActual <= 0f)
            {
                esperando = false;
                IrAlSiguientePunto();
            }
            return;
        }
        
        // Verificar si hemos llegado al destino
        if (!agent.pathPending && agent.remainingDistance < distanciaMinima)
        {
            // Comenzar tiempo de espera
            tiempoEsperaActual = tiempoEspera;
            esperando = true;
        }
    }
    
    private void IrAlSiguientePunto()
    {
        if (puntosPatrullaje.Length == 0) return;
        
        agent.SetDestination(puntosPatrullaje[indiceActual].position);
        indiceActual = (indiceActual + 1) % puntosPatrullaje.Length;
    }
    
    public void DetenerPatrullaje()
    {
        EstaPatrullando = false;
        agent.ResetPath();
    }
    
    public void ReanudarPatrullaje()
    {
        EstaPatrullando = true;
        esperando = false;
        IrAlSiguientePunto();
    }
    
    public void IrAPunto(Vector3 destino)
    {
        agent.SetDestination(destino);
    }
}
