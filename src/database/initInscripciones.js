import { Inscripcion } from "../models/Inscripcion.js";

const initialInscripciones = [
    { usuario_id: 1, materia: "Bases de Datos", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 2, materia: "Bases de Datos", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 3, materia: "Bases de Datos", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 4, materia: "Inteligencia Artificial", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 5, materia: "Inteligencia Artificial", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 6, materia: "Robótica", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 7, materia: "Diseño de Interfaces", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 8, materia: "Diseño de Interfaces", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 9, materia: "Ciberseguridad", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 10, materia: "Ciberseguridad", periodo: "2026-1", fecha_creacion: "2026-01-01" },
    { usuario_id: 1, materia: "Programación Web", periodo: "2025-2", fecha_creacion: "2025-07-01" },
    { usuario_id: 2, materia: "Programación Web", periodo: "2025-2", fecha_creacion: "2025-07-01" },
    { usuario_id: 3, materia: "Redes de Computadores", periodo: "2025-2", fecha_creacion: "2025-07-01" },
    { usuario_id: 4, materia: "Redes de Computadores", periodo: "2025-2", fecha_creacion: "2025-07-01" },
    { usuario_id: 5, materia: "Estructuras de Datos", periodo: "2025-2", fecha_creacion: "2025-07-01" },
    { usuario_id: 6, materia: "Cálculo Diferencial", periodo: "2025-1", fecha_creacion: "2025-01-01" },
    { usuario_id: 7, materia: "Cálculo Diferencial", periodo: "2025-1", fecha_creacion: "2025-01-01" },
    { usuario_id: 8, materia: "Sistemas Operativos", periodo: "2025-1", fecha_creacion: "2025-01-01" },
    { usuario_id: 9, materia: "Sistemas Operativos", periodo: "2025-1", fecha_creacion: "2025-01-01" },
    { usuario_id: 10, materia: "Fundamentos de Ingeniería", periodo: "2025-1", fecha_creacion: "2025-01-01" }
];

export async function loadInitialInscripciones() {
    try {
        const count = await Inscripcion.count();
        if (count === 0) {
            await Inscripcion.bulkCreate(initialInscripciones);
            console.log("Initial inscripciones loaded successfully with 20 records.");
        } else {
            console.log("Inscripciones already exist in the database. Skipping initial load.");
        }
    } catch (error) {
        console.error("Error loading initial inscripciones:", error);
    }
}
