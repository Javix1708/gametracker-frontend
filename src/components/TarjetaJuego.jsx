import React, { useState } from "react";
import { eliminarJuego, editarJuego } from "../services/api";
import ListaResenas from "./ListaResenas";
import AgregarResena from "./AgregarResena";

function TarjetaJuego({ juego, onUpdate, onDelete }) {
  const [editando, setEditando] = useState(false);
  const [temp, setTemp] = useState({ ...juego });

  const guardarCambios = async () => {
    await editarJuego(juego._id, temp);
    setEditando(false);
    onUpdate();
  };

  const borrar = async () => {
    await eliminarJuego(juego._id);
    onDelete();
  };

  return (
    <div className="tarjeta" style={{ width: "260px" }}>
      
      {!editando && (
        <img
          src={juego.portada}
          alt="portada"
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/260x160?text=Sin+Imagen")
          }
        />
      )}

      {editando ? (
        <>
          <input value={temp.titulo} onChange={(e) => setTemp({ ...temp, titulo: e.target.value })} placeholder="Título" />
          <input value={temp.genero} onChange={(e) => setTemp({ ...temp, genero: e.target.value })} placeholder="Género" />
          <input value={temp.plataforma} onChange={(e) => setTemp({ ...temp, plataforma: e.target.value })} placeholder="Plataforma" />
          <input type="number" value={temp.horasJugadas} onChange={(e) => setTemp({ ...temp, horasJugadas: Number(e.target.value) })} placeholder="Horas jugadas" />
          <input type="number" step="0.1" value={temp.puntuacion} onChange={(e) => setTemp({ ...temp, puntuacion: parseFloat(e.target.value) })} placeholder="Puntuación (0–5 con decimal)" min="0" max="5" />
          <input value={temp.portada} onChange={(e) => setTemp({ ...temp, portada: e.target.value })} placeholder="URL portada" />

          <label>
            <input type="checkbox" checked={temp.completado} onChange={(e) => setTemp({ ...temp, completado: e.target.checked })} />
            Completado
          </label>

          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{juego.titulo}</h3>
          <p><b>Género:</b> {juego.genero}</p>
          <p><b>Plataforma:</b> {juego.plataforma}</p>
          <p><b>Horas jugadas:</b> {juego.horasJugadas}</p>
          <p><b>Puntuación:</b> ⭐ {juego.puntuacion}</p>

          <p>
            <b>Estado:</b>{" "}
            {juego.completado ? "✔ Completado" : "En progreso..."}
          </p>

          <button onClick={() => setEditando(true)}>Editar</button>

          <button
            onClick={borrar}
            style={{ background: "red", color: "white", marginLeft: "10px" }}
          >
            Eliminar
          </button>

          <AgregarResena juegoId={juego._id} onChange={onUpdate} />
          <ListaResenas juegoId={juego._id} />
        </>
      )}
    </div>
  );
}

export default TarjetaJuego;
