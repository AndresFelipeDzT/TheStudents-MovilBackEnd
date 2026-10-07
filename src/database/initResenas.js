import { Resena } from "../models/Resena.js";
import { Inscripcion } from "../models/Inscripcion.js";

const initialResenas = [
    { inscripcion_autor_id: 1, inscripcion_resenado_id: 2, contenido: "Excelente compañero de equipo, muy responsable y comprometido con el proyecto de software." },
    { inscripcion_autor_id: 2, inscripcion_resenado_id: 1, contenido: "Muy buen trabajo colaborando en las actividades y proyectos de la materia." },
    { inscripcion_autor_id: 1, inscripcion_resenado_id: 3, contenido: "Aporta ideas claras y ayuda al equipo a resolver problemas de bases de datos." },
    { inscripcion_autor_id: 3, inscripcion_resenado_id: 1, contenido: "Siempre dispuesto a compartir sus conocimientos y apoyar a sus compañeros." },
    { inscripcion_autor_id: 2, inscripcion_resenado_id: 3, contenido: "Se destaca por su compromiso y sus aportes durante las clases." },
    { inscripcion_autor_id: 3, inscripcion_resenado_id: 2, contenido: "Trabaja muy bien en equipo y cumple con sus responsabilidades." },
    { inscripcion_autor_id: 4, inscripcion_resenado_id: 5, contenido: "Explica conceptos complejos con claridad y participa activamente en clase." },
    { inscripcion_autor_id: 5, inscripcion_resenado_id: 4, contenido: "Es responsable y aporta soluciones creativas a los trabajos de la materia." },
    { inscripcion_autor_id: 7, inscripcion_resenado_id: 8, contenido: "Sus aportes en el diseño de interfaces mejoran el trabajo del grupo." },
    { inscripcion_autor_id: 8, inscripcion_resenado_id: 7, contenido: "Es organizada y siempre está dispuesta a colaborar con sus compañeros." },
    { inscripcion_autor_id: 11, inscripcion_resenado_id: 12, contenido: "Escribe código claro y comparte buenas ideas para los proyectos web." },
    { inscripcion_autor_id: 12, inscripcion_resenado_id: 11, contenido: "Muy buen dominio de las herramientas y conceptos de programación web." },
    { inscripcion_autor_id: 13, inscripcion_resenado_id: 14, contenido: "Se destaca resolviendo problemas de redes y apoyando a sus compañeros." },
    { inscripcion_autor_id: 14, inscripcion_resenado_id: 13, contenido: "Tiene gran disposición para trabajar en equipo y compartir sus conocimientos." },
    { inscripcion_autor_id: 16, inscripcion_resenado_id: 17, contenido: "Es muy colaborador y explica con claridad los ejercicios de cálculo." },
    { inscripcion_autor_id: 18, inscripcion_resenado_id: 19, contenido: "Aporta buenas ideas y trabaja responsablemente en los ejercicios de sistemas." },
    { inscripcion_autor_id: 19, inscripcion_resenado_id: 18, contenido: "Es un gran compañero, siempre dispuesto a colaborar en clase." }
];

export async function loadInitialResenas() {
    try {
        const count = await Resena.count();
        if (count === 0) {
            const inscripcionIds = [
                ...new Set(initialResenas.flatMap(({ inscripcion_autor_id, inscripcion_resenado_id }) => [
                    inscripcion_autor_id,
                    inscripcion_resenado_id
                ]))
            ];
            const inscripciones = await Inscripcion.findAll({
                attributes: ["id", "materia", "periodo"],
                where: { id: inscripcionIds }
            });
            const inscripcionesById = new Map(inscripciones.map(inscripcion => [inscripcion.id, inscripcion]));
            if (inscripcionesById.size !== inscripcionIds.length) {
                console.log("Inscripciones required for initial resenas are missing. Skipping initial load.");
                return;
            }

            const resenasMismaMateriaYPeriodo = initialResenas.every(({ inscripcion_autor_id, inscripcion_resenado_id }) => {
                const autor = inscripcionesById.get(inscripcion_autor_id);
                const resenado = inscripcionesById.get(inscripcion_resenado_id);
                return autor.materia === resenado.materia && autor.periodo === resenado.periodo;
            });
            if (!resenasMismaMateriaYPeriodo) {
                console.error("Initial resenas must match the same subject and period. Skipping initial load.");
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