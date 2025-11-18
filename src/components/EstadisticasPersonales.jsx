import React from "react";

function EstadisticasPersonales({ juegos }) {

  if (!juegos || juegos.length === 0) {
    return (
      <div className="stats-box">
        <h2>Estadísticas Personales</h2>
        <p>No hay juegos registrados todavía.</p>
      </div>
    );
  }

  const totalJuegos = juegos.length;
  const totalHoras = juegos.reduce((acc, j) => acc + (j.horasJugadas || 0), 0);
  const promedioPuntuacion = (
    juegos.reduce((acc, j) => acc + (j.puntuacion || 0), 0) / totalJuegos
  ).toFixed(1);

  const completados = juegos.filter(j => j.completado).length;
  const progreso = ((completados / totalJuegos) * 100).toFixed(1);

  return (
    <div className="stats-box">
      <h2> Estadísticas Personales</h2>

      <p><strong>Total de juegos:</strong> {totalJuegos}</p>
      <p><strong>Horas jugadas:</strong> {totalHoras} h</p>
      <p><strong>Promedio de puntuación:</strong> ⭐ {promedioPuntuacion} / 5</p>
      <p><strong>Completados:</strong> {completados} / {totalJuegos}</p>
     
    </div>
  );
}

export default EstadisticasPersonales;
