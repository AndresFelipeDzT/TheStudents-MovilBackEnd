import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import resenaRoutes from "./routes/resena.routes.js";
import inscripcionRoutes from "./routes/inscripcion.routes.js";

const app = express();
app.use(express.json());
app.use("/usuario", usuarioRoutes);
app.use("/resena", resenaRoutes);
app.use("/inscripcion", inscripcionRoutes);

export default app;