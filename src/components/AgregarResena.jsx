import React, { useState } from "react";
import { crearResena } from "../services/api";

function AgregarResena({ juegoId, onChange }) {
  const [form, setForm] = useState({
    autor: "",
    texto: "",
    estrellas: 5,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearResena({
      juegoId,
      autor: form.autor,
      texto: form.texto,
      estrellas: Number(form.estrellas),
    });

    setForm({ autor: "", texto: "", estrellas: 5 });

    onChange();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        name="autor"
        placeholder="Tu nombre"
        value={form.autor}
        onChange={handleChange}
        required
      />

      <textarea
        name="texto"
        placeholder="Escribe tu reseña..."
        value={form.texto}
        onChange={handleChange}
        required
      ></textarea>

      <input
        type="number"
        name="estrellas"
        min="1"
        max="5"
        value={form.estrellas}
        onChange={handleChange}
      />

      <button type="submit">Agregar reseña</button>
    </form>
  );
}

export default AgregarResena;
