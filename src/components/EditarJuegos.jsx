import React, { useState } from "react";
import { editarJuego } from "../services/api";
import Estrellas from "./Estrellas";

function EditarJuego({ juego, onClose, onUpdated }) {
  const [titulo, setTitulo] = useState(juego.titulo);
  const [genero, setGenero] = useState(juego.genero);
  const [plataforma, setPlataforma] = useState(juego.plataforma);
  const [puntuacion, setPuntuacion] = useState(juego.puntuacion);
  const [horasJugadas, setHorasJugadas] = useState(juego.horasJugadas);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editarJuego(juego._id, {
        titulo,
        genero,
        plataforma,
        puntuacion,
        horasJugadas,
      });

      alert("Juego actualizado!");
      onUpdated();
      onClose();

    } catch (error) {
      console.log("Error editando juego:", error);
      alert("Error al editar");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h3>Editar Juego</h3>

        <label>Título:</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <br /><br />

        <label>Género:</label>
        <input value={genero} onChange={(e) => setGenero(e.target.value)} />

        <br /><br />

        <label>Plataforma:</label>
        <input value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />

        <br /><br />

        <label>Puntuación:</label>
        <Estrellas valor={puntuacion} onChange={setPuntuacion} />

        <br />

        <label>Horas Jugadas:</label>
        <input
          type="number"
          min="0"
          value={horasJugadas}
          onChange={(e) => setHorasJugadas(e.target.value)}
        />

        <br /><br />

        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditarJuego;
