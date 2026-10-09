import { Op } from "sequelize";
import { Inscripcion } from "../models/Inscripcion.js";
import { Usuario } from "../models/Usuario.js";

export const getCompanerosByUsuarioId = async (req, res) => {
    const usuarioId = Number(req.params.usuario_id);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        return res.status(400).json({ message: "usuario_id must be a positive integer" });
    }

    try {
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario not found" });
        }

        const inscripciones = await Inscripcion.findAll({
            where: { usuario_id: usuarioId },
            attributes: ["materia", "periodo"]
        });

        const inscripcionesUnicas = [
            ...new Map(
                inscripciones.map(({ materia, periodo }) => [
                    JSON.stringify([materia, periodo]),
                    { materia, periodo }
                ])
            ).values()
        ];

        if (inscripcionesUnicas.length === 0) {
            return res.json([]);
        }

        const inscripcionesCompartidas = await Inscripcion.findAll({
            where: {
                usuario_id: { [Op.ne]: usuarioId },
                [Op.or]: inscripcionesUnicas
            },
            attributes: ["usuario_id", "materia", "periodo"],
            include: [{
                association: "usuario",
                attributes: [
                    "id",
                    "correo",
                    "nombre_usuario",
                    "nombre",
                    "biografia",
                    "foto_url",
                    "color_perfil",
                    "carrera",
                    "semestre",
                    "estado",
                    "fecha_creacion"
                ]
            }],
            order: [
                ["usuario_id", "ASC"],
                ["materia", "ASC"],
                ["periodo", "ASC"]
            ]
        });

        const companerosPorId = new Map();
        for (const inscripcion of inscripcionesCompartidas) {
            const { usuario: companero, materia, periodo } = inscripcion.get({ plain: true });
            if (!companero) {
                throw new Error("Shared inscription has no associated user");
            }

            if (!companerosPorId.has(companero.id)) {
                companerosPorId.set(companero.id, {
                    ...companero,
                    inscripciones_compartidas: []
                });
            }

            const inscripcionesDelCompanero =
                companerosPorId.get(companero.id).inscripciones_compartidas;
            const yaIncluida = inscripcionesDelCompanero.some(
                inscripcionCompartida =>
                    inscripcionCompartida.materia === materia &&
                    inscripcionCompartida.periodo === periodo
            );
            if (!yaIncluida) {
                inscripcionesDelCompanero.push({ materia, periodo });
            }
        }

        res.json([...companerosPorId.values()]);
    } catch (error) {
        console.error("Error fetching inscription classmates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
