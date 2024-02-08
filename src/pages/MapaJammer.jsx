import React, { useState, useEffect } from 'react';
import Sidenav from '../Sidenav';
import SimpleContainer from '../SimpleContainer';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function MapaJammer() {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);

  useEffect(() => {
    async function fetchDadosDoBanco() {
      try {
        const response = await fetch('http://localhost:5000/dados-do-banco');

        if (!response.ok) {
          throw new Error('Erro ao obter os dados do banco');
        }
        const data = await response.json();
        setDadosDoBanco(data.dados);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    }

    fetchDadosDoBanco();
  }, []);

  return (
    <>
       <SimpleContainer />
      <Sidenav />
     
     
    </>
  );
}
