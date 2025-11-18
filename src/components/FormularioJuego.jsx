import { useState, useEffect } from "react";
import { crearJuego, editarJuego } from "../services/api";

export default function FormularioJuego({ refrescar, juego }) {
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    horasJugadas: 0,
    completado: false,
    puntuacion: "",
    portada: "",
  });

  useEffect(() => {
    if (juego) {
      setForm({
        titulo: juego.titulo || "",
        plataforma: juego.plataforma || "",
        genero: juego.genero || "",
        horasJugadas: juego.horasJugadas || 0,
        completado: juego.completado || false,
        puntuacion: juego.puntuacion || "",
        portada: juego.portada || "",
      });
    }
  }, [juego]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let val = value;

    if (name === "puntuacion") {
      val = val.replace(",", ".");
      if (val !== "" && isNaN(val)) return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        puntuacion: Number(form.puntuacion),
      };

      if (juego) {
        await editarJuego(juego._id, payload);
      } else {
        await crearJuego(payload);
      }

      refrescar();

      setForm({
        titulo: "",
        plataforma: "",
        genero: "",
        horasJugadas: 0,
        completado: false,
        puntuacion: "",
        portada: "",
      });

    } catch (error) {
      console.error("Error al guardar juego:", error);
    }
  };

  return (
    <form
      className="formulario-juego"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px"
      }}
    >
      <h2>{juego ? "Editar Juego" : "Agregar Juego"}</h2>

      <input type="text" name="titulo" placeholder="Título del juego" value={form.titulo} onChange={handleChange} required />
      <input type="text" name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
      <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} />
      <input type="number" name="horasJugadas" placeholder="Horas jugadas" min="0" value={form.horasJugadas} onChange={handleChange} />
      <input type="text" name="puntuacion" placeholder="Puntuación (0–5)" value={form.puntuacion} onChange={handleChange} />

      <input
        type="text"
        name="portada"
        placeholder="URL de la portada"
        value={form.portada}
        onChange={handleChange}
      />

      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input type="checkbox" name="completado" checked={form.completado} onChange={handleChange} />
        Completado
      </label>

      <button type="submit">
        {juego ? "Guardar cambios" : "Agregar juego"}
      </button>
    </form>
  );
}
