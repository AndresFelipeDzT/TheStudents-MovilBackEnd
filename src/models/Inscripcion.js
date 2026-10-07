import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Inscripcion = sequelize.define(
    "Inscripcion",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Usuarios",
                key: "id"
            }
        },
        materia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false
    }
);
