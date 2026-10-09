import { Resena } from "../models/Resena.js";
import { Inscripcion } from "../models/Inscripcion.js";

const initialResenas = [
    { autor_id: 2, resenado_id: 1, materia: "Bases de Datos", periodo: "2026-1", contenido: "Muy buen trabajo colaborando en las actividades y proyectos de la materia.", likes: 8, disLikes: 0, rating: "4.5" },
    { autor_id: 3, resenado_id: 1, materia: "Bases de Datos", periodo: "2026-1", contenido: "Siempre dispuesto a compartir sus conocimientos y apoyar a sus compañeros." },
    { autor_id: 2, resenado_id: 3, materia: "Bases de Datos", periodo: "2026-1", contenido: "Se destaca por su compromiso y sus aportes durante las clases." },
    { autor_id: 3, resenado_id: 2, materia: "Bases de Datos", periodo: "2026-1", contenido: "Trabaja muy bien en equipo y cumple con sus responsabilidades." },
    { autor_id: 4, resenado_id: 5, materia: "Inteligencia Artificial", periodo: "2026-1", contenido: "Explica conceptos complejos con claridad y participa activamente en clase.", likes: 15, disLikes: 2, rating: "5" },
    { autor_id: 5, resenado_id: 4, materia: "Inteligencia Artificial", periodo: "2026-1", contenido: "Es responsable y aporta soluciones creativas a los trabajos de la materia." },
    { autor_id: 7, resenado_id: 8, materia: "Diseño de Interfaces", periodo: "2026-1", contenido: "Sus aportes en el diseño de interfaces mejoran el trabajo del grupo.", likes: 3, disLikes: 1, rating: "4" },
    { autor_id: 8, resenado_id: 7, materia: "Diseño de Interfaces", periodo: "2026-1", contenido: "Es organizada y siempre está dispuesta a colaborar con sus compañeros." },
    { autor_id: 1, resenado_id: 2, materia: "Programación Web", periodo: "2025-2", contenido: "Escribe código claro y comparte buenas ideas para los proyectos web.", likes: 9 },
    { autor_id: 2, resenado_id: 1, materia: "Programación Web", periodo: "2025-2", contenido: "Muy buen dominio de las herramientas y conceptos de programación web." },
    { autor_id: 3, resenado_id: 4, materia: "Redes de Computadores", periodo: "2025-2", contenido: "Se destaca resolviendo problemas de redes y apoyando a sus compañeros." },
    { autor_id: 4, resenado_id: 3, materia: "Redes de Computadores", periodo: "2025-2", contenido: "Tiene gran disposición para trabajar en equipo y compartir sus conocimientos." },
    { autor_id: 6, resenado_id: 7, materia: "Cálculo Diferencial", periodo: "2025-1", contenido: "Es muy colaborador y explica con claridad los ejercicios de cálculo.", rating: "4.5" },
    { autor_id: 8, resenado_id: 9, materia: "Sistemas Operativos", periodo: "2025-1", contenido: "Aporta buenas ideas y trabaja responsablemente en los ejercicios de sistemas." },
    { autor_id: 9, resenado_id: 8, materia: "Sistemas Operativos", periodo: "2025-1", contenido: "Es un gran compañero, siempre dispuesto a colaborar en clase." }
];

export async function loadInitialResenas() {
    try {
        const count = await Resena.count();
        if (count === 0) {
            const inscripciones = await Inscripcion.findAll({
                attributes: ["usuario_id", "materia", "periodo"]
            });

            const inscripcionesSet = new Set(
                inscripciones.map(inscripcion => `${inscripcion.usuario_id}|${inscripcion.materia}|${inscripcion.periodo}`)
            );

            const resenasMismaMateriaYPeriodo = initialResenas.every(({ autor_id, resenado_id, materia, periodo }) => {
                const autorInscrito = inscripcionesSet.has(`${autor_id}|${materia}|${periodo}`);
                const resenadoInscrito = inscripcionesSet.has(`${resenado_id}|${materia}|${periodo}`);
                return autorInscrito && resenadoInscrito;
            });

            if (!resenasMismaMateriaYPeriodo) {
                console.error("Initial resenas must match the same subject and period for both enrolled users. Skipping initial load.");
                return;
            }

            await Resena.bulkCreate(initialResenas);
            console.log(`Initial resenas loaded successfully with ${initialResenas.length} records.`);
        } else {
            console.log("Resenas already exist in the database. Skipping initial load.");
        }
    } catch (error) {
        console.error("Error loading initial resenas:", error);
    }

}