import { Op } from "sequelize";
import { Inscripcion } from "../models/Inscripcion.js";
import { Usuario } from "../models/Usuario.js";



export const getInscripcionById = async (req, res) => {
    const { id } = req.params;
    try {
        const inscripcion = await Inscripcion.findByPk(id, {
            include: [
                {
                    association: "usuario"
                }
            ]
        });

        if (!inscripcion) {
            return res.status(404).json({ message: "Inscripcion not found" });
        }

        res.json(inscripcion);
    } catch (error) {
        console.error("Error fetching inscripcion by id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCompanerosByUsuarioId = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        // 1. Obtener las materias y periodos en los que está inscrito el usuario dado
        const misInscripciones = await Inscripcion.findAll({
            where: { usuario_id },
            attributes: ["materia", "periodo"]
        });

        if (!misInscripciones || misInscripciones.length === 0) {
            return res.status(404).json({ message: "No se encontraron inscripciones para el usuario indicado" });
        }

        // 2. Construir condiciones para coincidir en materia Y periodo
        const condicionesClasePeriodo = misInscripciones.map((ins) => ({
            materia: ins.materia,
            periodo: ins.periodo
        }));

        // 3. Buscar inscripciones de otros usuarios que compartan materia y periodo
        const inscripcionesCompartidas = await Inscripcion.findAll({
            where: {
                usuario_id: { [Op.ne]: usuario_id },
                [Op.or]: condicionesClasePeriodo
            },
            include: [
                {
                    association: "usuario"
                }
            ]
        });

        res.json(inscripcionesCompartidas);
    } catch (error) {
        console.error("Error fetching compañeros de inscripcion:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

