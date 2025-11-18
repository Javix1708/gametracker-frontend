import axios from "axios";

// Conexión al backend
const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

//Juegos

export const obtenerJuegos = () => API.get("/juegos");
export const crearJuego = (data) => API.post("/juegos", data);
export const editarJuego = (id, data) => API.put(`/juegos/${id}`, data);
export const eliminarJuego = (id) => API.delete(`/juegos/${id}`);
export const marcarComoCompletado = (id, estado) => API.put(`/juegos/${id}`, { completado: estado });

//Reseña

export const obtenerResenas = (juegoId) => API.get(`/resenas/${juegoId}`);
export const crearResena = (data) => API.post("/resenas", data);
export const eliminarResena = (id) => API.delete(`/resenas/${id}`);
