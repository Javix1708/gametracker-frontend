import React, { useEffect, useState } from "react";
import { obtenerResenas, eliminarResena } from "../services/api";

function ListaResenas({ juegoId }) {
  const [resenas, setResenas] = useState([]);

  const cargar = async () => {
    try {
      const res = await obtenerResenas(juegoId); 
      setResenas(res.data);
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    }
  };

  useEffect(() => {
    cargar();
  }, [juegoId]);

  const borrar = async (id) => {
    await eliminarResena(id);
    cargar();
  };

  return (
    <div>
      <h4>Reseñas</h4>

      {resenas.length === 0 && <p>No hay reseñas para este juego.</p>}

      {resenas.map((r) => (
        <div key={r._id} className="reseña">
          <p><b>{r.autor}</b></p>
          <p>{r.texto}</p>
          <p>⭐ {r.estrellas}</p>

          <button
            onClick={() => borrar(r._id)}
            style={{ background: "red", color: "white" }}
          >
            Eliminar reseña
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaResenas;
