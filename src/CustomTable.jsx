import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table'; // Renomeie a importação para evitar o conflito
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';

// Restante do código...


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CustomTable({ dadosDoBanco }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Seguradora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dadosDoBanco.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell>{row.placa}</TableCell>
              <TableCell>{row.seguradora}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
