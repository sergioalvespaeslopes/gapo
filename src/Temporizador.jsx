import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function Temporizador() {
  const [segundos, setSegundos] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos(prevSegundos => prevSegundos - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Este efeito será executado apenas uma vez, sem dependências

  useEffect(() => {
    if (segundos < 0) {
      // Recarregar a página após 60 segundos
      window.location.reload();
    }
  }, [segundos]);

  return (
    <div style={{ color: 'black', textAlign: 'center', marginTop: '0vh', transform: 'translateY(-50%)' }}> {/* Estilos para centralizar o componente */}
      Time: {segundos}
    </div>
  );
}

export default Temporizador;
