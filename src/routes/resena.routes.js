import { Router } from "express";
import {
    getResenasByResenadoId,
    getResenasByAutorId,
    createResena,
    updateResena,
    deleteResena
} from "../controller/resena.controller.js";

const router = Router();

//localhost:3000/resena/resenado/:resenado_id
router.get("/resenado/:resenado_id", getResenasByResenadoId);
//localhost:3000/resena/autor/:autor_id
router.get("/autor/:autor_id", getResenasByAutorId);
//localhost:3000/resena
router.post("/", createResena);
//localhost:3000/resena/:id
router.put("/:id", updateResena);
//localhost:3000/resena/:id
router.delete("/:id", deleteResena);

export default router;