import { useState } from "react";
import { crearJuego } from "../../services/api";

function FormularioJuego({ onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);

 
  const [portada, setPortada] = useState(null);

  const handleSubmit = async (e) => {e.preventDefault();

   
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("genero", genero);
    formData.append("plataforma", plataforma);
    formData.append("horasJugadas", horasJugadas);
    formData.append("puntuacion", puntuacion);

    
    if (portada) {
      formData.append("portada", portada);
    }

    try {
      await crearJuego(formData); 
      onAdd();
      limpiar();
    } catch (error) {
      console.error("Error creando juego:", error);
    }
  };

  const limpiar = () => {
    setTitulo("");
    setGenero("");
    setPlataforma("");
    setHorasJugadas(0);
    setPuntuacion(0);
    setPortada(null);
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit}>
      <h2>Agregar Juego</h2>

      <label>Título</label>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <label>Género</label>
      <input
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />

      <label>Plataforma</label>
      <input
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
      />

      <label>Horas Jugadas</label>
      <input
        type="number"
        min="0"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <label>Puntuación</label>
      <input
        type="number"
        min="0"
        max="5"
        value={puntuacion}
        onChange={(e) => setPuntuacion(e.target.value)}
      />

   
      <label>Portada del Juego</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPortada(e.target.files[0])}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioJuego;
