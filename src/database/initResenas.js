import { Resena } from "../models/Resena.js";

const initialResenas = [
    { autor_id: 1, resenado_id: 2, contenido: "Excelente compañero de equipo, muy responsable y comprometido con el proyecto de software." },
    { autor_id: 2, resenado_id: 3, contenido: "Muy buen manejo de la lógica de programación. Siempre dispuesto a explicar los algoritmos complejos." },
    { autor_id: 3, resenado_id: 4, contenido: "Sus aportes en el diseño de interfaces fueron clave para que la aplicación se vea muy profesional." },
    { autor_id: 4, resenado_id: 5, contenido: "Gran conocimiento en ciberseguridad, ayudó a auditar el código y detectar vulnerabilidades a tiempo." },
    { autor_id: 5, resenado_id: 6, contenido: "Muy analítico con los datos. Sus reportes y gráficas estadísticas superaron nuestras expectativas." },
    { autor_id: 6, resenado_id: 7, contenido: "Excelente dominio de las matemáticas aplicadas. Resolvió la parte más difícil del backend." },
    { autor_id: 7, resenado_id: 8, contenido: "Muy organizada con los tiempos de entrega y la gestión de las tareas del grupo." },
    { autor_id: 8, resenado_id: 9, contenido: "Aporta ideas muy innovadoras para la arquitectura del sistema y el flujo de datos." },
    { autor_id: 9, resenado_id: 1, contenido: "Escribe un código muy limpio y fácil de mantener. Un placer trabajar con él en backend." },
    { autor_id: 10, resenado_id: 3, contenido: "Muy atenta a los detalles de la base de datos y las relaciones de Sequelize." },

    { autor_id: 1, resenado_id: 4, contenido: "Me ayudó muchísimo a entender cómo estructurar las rutas de Express correctamente." },
    { autor_id: 2, resenado_id: 5, contenido: "Excelente comunicación y liderazgo cuando tuvimos que presentar el avance del semestre." },
    { autor_id: 3, resenado_id: 6, contenido: "Siempre llega puntualmente a las reuniones de código y cumple con sus asignaciones." },
    { autor_id: 4, resenado_id: 7, contenido: "Su creatividad en el diseño UX mejoró notablemente la experiencia de usuario de la plataforma." },
    { autor_id: 5, resenado_id: 8, contenido: "Tiene un talento natural para resolver errores complejos de manera rápida." },
    { autor_id: 6, resenado_id: 9, contenido: "Muy solidario con el equipo, siempre se queda hasta tarde ayudando a terminar los pendientes." },
    { autor_id: 7, resenado_id: 10, contenido: "Excelente enfoque metodológico para la documentación técnica del proyecto." },
    { autor_id: 8, resenado_id: 1, contenido: "Sus pruebas unitarias cubrieron todos los casos de borde posibles. Muy profesional." },
    { autor_id: 9, resenado_id: 2, contenido: "Muy buen dominio de git y control de versiones, evitó que perdiéramos avances." },
    { autor_id: 10, resenado_id: 4, contenido: "Capacidad de análisis sobresaliente ante problemas imprevistos de última hora." },

    { autor_id: 1, resenado_id: 5, contenido: "Trabajar con ella es garantía de calidad y orden en la entrega de los módulos." },
    { autor_id: 2, resenado_id: 6, contenido: "Demostró un gran dominio técnico al conectar la base de datos con la API." },
    { autor_id: 3, resenado_id: 7, contenido: "Muy receptivo a las críticas constructivas durante las revisiones de código (code reviews)." },
    { autor_id: 4, resenado_id: 8, contenido: "Su enfoque en la optimización hizo que la aplicación cargara mucho más rápido." },
    { autor_id: 5, resenado_id: 9, contenido: "Un compañero ejemplar, siempre motivando al grupo a dar lo mejor." },
    { autor_id: 6, resenado_id: 10, contenido: "Muy detallista con el formato de las respuestas JSON en los controladores." },
    { autor_id: 7, resenado_id: 1, contenido: "Excelente manejo de los estados y hooks en el desarrollo de la arquitectura." },
    { autor_id: 8, resenado_id: 2, contenido: "Aportó soluciones muy creativas cuando nos quedamos estancados con un bug." },
    { autor_id: 9, resenado_id: 3, contenido: "Muy disciplinado y enfocado en cumplir los objetivos del sprint a tiempo." },
    { autor_id: 10, resenado_id: 5, contenido: "Cierra las tareas pendientes con mucha eficiencia. Gran incorporación al equipo." }
];

export async function loadInitialResenas() {
    try {
        const count = await Resena.count();
        if (count === 0) {
            await Resena.bulkCreate(initialResenas);
            console.log("Initial resenas loaded successfully with 30 records.");
        } else {
            console.log("Resenas already exist in the database. Skipping initial load.");
        }
    } catch (error) {
        console.error("Error loading initial resenas:", error);
    }

}