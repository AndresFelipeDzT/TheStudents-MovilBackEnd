import { Usuario } from "../models/Usuario.js";

const initialUsuarios = [
    {
        correo: "carlos.perez@universidad.edu",
        nombre_usuario: "carlosp",
        nombre: "Carlos Pérez",
        biografia: "Estudiante apasionado por el desarrollo web y las bases de datos.",
        foto_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        color_perfil: "#3498DB",
        carrera: "Ingeniería de Sistemas",
        semestre: 6
    },
    {
        correo: "ana.gomez@universidad.edu",
        nombre_usuario: "anagomez",
        nombre: "Ana Gómez",
        biografia: "Amante del café, los algoritmos y la inteligencia artificial.",
        foto_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        color_perfil: "#E91E63",
        carrera: "Ingeniería de Software",
        semestre: 4
    },
    {
        correo: "luis.torres@universidad.edu",
        nombre_usuario: "luistorres",
        nombre: "Luis Torres",
        biografia: "Futuro ingeniero mecánico y entusiasta de la robótica.",
        foto_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
        color_perfil: "#2ECC71",
        carrera: "Ingeniería Mecánica",
        semestre: 8
    },
    {
        correo: "maria.rodriguez@universidad.edu",
        nombre_usuario: "mariarod",
        nombre: "María Rodríguez",
        biografia: "Diseñadora UX/UI en formación. Creando experiencias amigables.",
        foto_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        color_perfil: "#9B59B6",
        carrera: "Diseño Gráfico",
        semestre: 5
    },
    {
        correo: "jorge.mendez@universidad.edu",
        nombre_usuario: "jorgem",
        nombre: "Jorge Méndez",
        biografia: "Ciberseguridad y redes. Hacker ético en proceso.",
        foto_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        color_perfil: "#F39C12",
        carrera: "Ingeniería de Sistemas",
        semestre: 9
    },
    {
        correo: "sofia.castro@universidad.edu",
        nombre_usuario: "sofiacastro",
        nombre: "Sofía Castro",
        biografia: "Los datos mueven al mundo. Análisis y estadística.",
        foto_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        color_perfil: "#1ABC9C",
        carrera: "Estadística y Ciencia de Datos",
        semestre: 3
    },
    {
        correo: "david.vargas@universidad.edu",
        nombre_usuario: "dvargas",
        nombre: "David Vargas",
        biografia: "Resolviendo problemas complejos con matemáticas y código.",
        foto_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        color_perfil: "#E74C3C",
        carrera: "Matemáticas Aplicadas",
        semestre: 7
    },
    {
        correo: "valeria.rios@universidad.edu",
        nombre_usuario: "valerios",
        nombre: "Valeria Ríos",
        biografia: "Innovación, tecnología y gestión de proyectos ágiles.",
        foto_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        color_perfil: "#34495E",
        carrera: "Administración de Sistemas Informáticos",
        semestre: 2
    },
    {
        correo: "mateo.ortiz@universidad.edu",
        nombre_usuario: "mateoortiz",
        nombre: "Mateo Ortiz",
        biografia: "Desarrollador backend de día, gamer de noche.",
        foto_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
        color_perfil: "#16A085",
        carrera: "Ingeniería de Sistemas",
        semestre: 10
    },
    {
        correo: "camila.navarro@universidad.edu",
        nombre_usuario: "camilan",
        nombre: "Camila Navarro",
        biografia: "Arquitectura de software y sistemas distribuidos.",
        foto_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        color_perfil: "#D35400",
        carrera: "Ingeniería de Software",
        semestre: 6
    }
];

export async function loadInitialUsuarios() {
    try {
        const count = await Usuario.count();
        if (count === 0) {
            await Usuario.bulkCreate(initialUsuarios);
            console.log("Initial usuarios loaded successfully with 10 records.");
        } else {
            console.log("Usuarios already exist in the database. Skipping initial load.");
        }
    } catch (error) {
        console.error("Error loading initial usuarios:", error);
    }

}
