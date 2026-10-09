import { Router } from "express";
import {
    getResenasByResenadoId,
    getResenasByAutorId,
    getPerfilUsuario,
    getResenasExcludingUsuarioId,
    createResena,
    updateResena,
    deleteResena
} from "../controller/resena.controller.js";

const router = Router();

//localhost:3000/resena/perfil/:usuario_id
router.get("/perfil/:usuario_id", getPerfilUsuario);
//localhost:3000/resena/resenado/:resenado_id
router.get("/resenado/:resenado_id", getResenasByResenadoId);
//localhost:3000/resena/excluir/:usuario_id
router.get("/excluir/:usuario_id", getResenasExcludingUsuarioId);
//localhost:3000/resena
router.post("/", createResena);
//localhost:3000/resena/:id
router.put("/:id", updateResena);
//localhost:3000/resena/:id
router.delete("/:id", deleteResena);

export default router;