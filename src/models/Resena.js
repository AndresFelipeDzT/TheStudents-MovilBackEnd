import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Resena = sequelize.define(
    "Resenas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inscripcion_autor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Inscripcions",
                key: "id"
            }
        },
        inscripcion_resenado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Inscripcions",
                key: "id"
            }
        },
        contenido: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        disLikes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fecha_edicion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(12),
            allowNull: false,
            defaultValue: "activo"
        }
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["inscripcion_autor_id", "inscripcion_resenado_id"]
            }
        ]
    }
);
