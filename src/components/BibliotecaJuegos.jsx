import React, { useEffect, useState } from "react";
import { obtenerJuegos } from "../services/api";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";
import EstadisticasPersonales from "./EstadisticasPersonales";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  const cargar = async () => {
  const res = await obtenerJuegos();
 setJuegos(res.data);
};
    useEffect(() => { cargar();
  }, []);

  return (
    <div>
      <h2>Biblioteca de Juegos</h2>

      <EstadisticasPersonales juegos={juegos} />

      {/* Contenedores */}
      <div
        style={{
          display: "flex",
         
          gap: "40px",
          marginTop: "20px",
        }}
      >
        {/* Formulario */}
        <div style={{ width: "320px", flexShrink: 0 }}>
          <FormularioJuego refrescar={cargar} />
        </div>

        {/* Tarjetas */}
    
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onUpdate={cargar}
              onDelete={cargar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BibliotecaJuegos;
