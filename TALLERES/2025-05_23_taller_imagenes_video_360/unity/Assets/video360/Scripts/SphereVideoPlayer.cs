using UnityEngine;
using UnityEngine.Video;

[RequireComponent(typeof(VideoPlayer))]
public class SphereVideoPlayer : MonoBehaviour
{
    public GameObject sphere;        // esfera con material
    public string videoFileName;     // ruta dentro de Assets/StreamingAssets

    void Start()
    {
        var vp = GetComponent<VideoPlayer>();

        vp.playOnAwake = false;                     // no iniciar en Awake
        vp.isLooping = true;                        // reproducir en bucle
        vp.renderMode = VideoRenderMode.MaterialOverride;  

        // Asignaci�n de esfera y propiedad del material
        vp.targetMaterialRenderer = sphere.GetComponent<Renderer>();
        vp.targetMaterialProperty = "_MainTex";

        // Carga el video desde StreamingAssets (opcional: tambi�n funciona sin StreamingAssets)
        vp.url = System.IO.Path.Combine(Application.streamingAssetsPath, videoFileName);

        vp.Play();
    }
}
