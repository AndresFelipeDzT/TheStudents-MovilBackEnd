import app from "./app.js";
import { sequelize } from "./database/database.js";
import { loadInitialUsuarios } from "./database/initUsuarios.js";
import { loadInitialInscripciones } from "./database/initInscripciones.js";
import { loadInitialResenas } from "./database/initResenas.js";
import { setupRelations } from "./models/relations.js";
import "./models/Usuario.js";
import "./models/Resena.js";
import "./models/Inscripcion.js";

async function init() {

    try {
        await sequelize.authenticate()
            .then(() => {
                console.log("Database connection established successfully.");
            })
            .catch(error => {
                console.error("Unable to connect to the database:", error);
            });

        await sequelize.sync({ force: true });

        setupRelations();

        await loadInitialUsuarios();

        await loadInitialInscripciones();

        await loadInitialResenas();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.log(error);
    }
}

init();