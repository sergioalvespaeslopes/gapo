import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const drawerWidth = 240;

export default function Sidenav() {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [open, setOpen] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRowClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          ml: open ? `${drawerWidth}px` : '0px',
          transition: 'width 0.2s',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Gapo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon /> {/* Ícone para encolher o menu */}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'SendEmail', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={text === 'Starred' ? '/starred' : `/${text.toLowerCase()}`}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['AllMail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Placa</TableCell>
                  <TableCell>Data Rec</TableCell>
                  <TableCell>Data Jammer</TableCell>
                  <TableCell>Qtde</TableCell>
                  <TableCell>VELOCIDADE</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Vcc</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Coord</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dadosDoBanco.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow onClick={() => handleRowClick(index)}>
                      <TableCell>{item.placa}</TableCell>
                      <TableCell>{item.DATA_REC}</TableCell>
                      <TableCell>{item.DATA_JAMMER}</TableCell>
                      <TableCell>{item.QTDE}</TableCell>
                      <TableCell>{item.VELOCIDADE}</TableCell>
                      
                      <TableCell>...</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{item.ENDERECO}</TableCell>
                      <TableCell>{item.LATITUDE}; {item.LONGITUDE}</TableCell>
                    </TableRow>
                    {expandedIndex === index && (
                      <TableRow>
                        <TableCell colSpan={9}> {/* Colspan para ocupar todas as colunas */}
                          {item.CHAVE === "1" ? (
                            <img src="key_on.png" alt="Chave ligada" />
                          ) : (
                            <img src="key_off.png" alt="Chave desligada" />
                          )}&emsp;   

                          {item.ATUALIZADO === "1" || item.ATUALIZADO === "A"  ? (
                            <img src="connected_gray.png" alt={`Local coberto, quantidade de satélites: ${item.QTDADE_SATELITE}`} />
                          ) : (
                            <img src="connected_red.png" alt={`Local aberto, quantidade de satélites: ${item.QTDADE_SATELITE}`} />
                          )}&emsp;
                          <img src="jammer.png" alt='Jammer Ativo' />&emsp;

                          {item.BATERIA === "1" ? (
                            <img src="bateria_off.png" alt='Bateria violada' />
                          ) : (
                            <img src="bateria_on.png" alt='Bateria interna ok' />
                          )}&emsp;
                          {item.ID_HOSPEDEIRO !== "" && (
                            <img src="hospedado.png" width="16" height="16" alt={`Enviou posições para o id: ${item.ID_HOSPEDEIRO}`} />
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      </Box>
    </Box>
  );
}
