import React, { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MarkerClusterer from '@google/markerclusterer'; // Importe o MarkerClusterer

const YOUR_API_KEY = 'AIzaSyC_XNhC6afHXQIJ9f68h_xXnCvEvrBBzEQ'; // Insira sua chave da API do Google Maps

class SimpleContainer extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
    this.geocoder = null;
    this.service = null;
    this.initialCenter = { lat: -23.594754, lng: -46.608019 }; // Coordenadas iniciais do mapa
    this.state = {
      counter: 60, // Inicia o contador em 60 segundos
      dadosDoBanco: [], // Inicia os dados do banco como uma array vazia
      mapType: 'roadmap', // Tipo inicial do mapa
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/dados-do-banco');
      if (!response.ok) {
        throw new Error('Erro ao obter os dados do banco');
      }
      const { dados } = await response.json();
      this.setState({ dadosDoBanco: dados });
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      this.initMap();
    };
    document.body.appendChild(script);

    this.interval = setInterval(() => {
      this.setState(
        (prevState) => ({
          counter: prevState.counter - 1,
        }),
        () => {
          if (this.state.counter <= 0) {
            this.atualizarMapa();
            this.setState({ counter: 60 });
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initMap() {
    this.map = new window.google.maps.Map(this.mapRef.current, {
      center: this.initialCenter,
      zoom: 11,
      streetViewControl: true,
      gestureHandling: 'greedy',
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'hybrid']
      }
    });
    this.geocoder = new window.google.maps.Geocoder();
    this.map.setMapTypeId(this.state.mapType);
    this.service = new window.google.maps.places.PlacesService(this.map);

    // Adiciona um controle de tipo de mapa
    const mapTypeControlDiv = document.createElement('div');
    this.createMapTypeControl(mapTypeControlDiv);
    this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(mapTypeControlDiv);

    // Adiciona marcadores
    this.adicionarMarcadores();
  }

  createMapTypeControl(controlDiv) {
    // Cria um controle de seleção de tipo de mapa
    const mapTypeControl = document.createElement('select');
    mapTypeControl.style.backgroundColor = '#fff';
    mapTypeControl.style.border = 'none';
    mapTypeControl.style.outline = 'none';
    mapTypeControl.style.padding = '2px';
    mapTypeControl.style.cursor = 'pointer';
    mapTypeControl.innerHTML = `
      <option value="roadmap">Mapa</option>
      <option value="hybrid">Híbrido</option>
    `;
    controlDiv.appendChild(mapTypeControl);

    // Define o evento de mudança de tipo de mapa
    mapTypeControl.addEventListener('change', (event) => {
      this.setState({ mapType: event.target.value });
      this.map.setMapTypeId(event.target.value);
    });
  }

  atualizarMapa() {
    this.map.panTo(this.initialCenter); // Atualiza o mapa para as coordenadas iniciais
  }

  adicionarMarcadores() {
    const { dadosDoBanco } = this.state;
    if (!Array.isArray(dadosDoBanco)) {
      console.error('Os dados do banco não estão no formato esperado.');
      return;
    }
  
    const markers = []; // Array para armazenar os marcadores
  
    dadosDoBanco.forEach((item) => {
      const lat = parseFloat(item.LATITUDE.replace(',', '.'));
      const lng = parseFloat(item.LONGITUDE.replace(',', '.'));
  
      if (!isNaN(lat) && !isNaN(lng)) {
        const latLng = { lat, lng };
        let iconUrl = 'icon_off.png';
        if (item.ATUALIZADO === "1") {
          iconUrl = 'icon_ok.png';
        }
  
        const marker = new window.google.maps.Marker({
          position: latLng,
          map: this.map,
          title: `Placa: ${item.placa}\n Nome: ${item.NOME}\n id Hospedeito: ${item.ID_HOSPEDEIRO}\n id : ${item.ID}\n Seguradora: ${item.seguradora}   `,
          icon: {
            url: iconUrl,
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });
  
        markers.push(marker);
      }
    });
  
    // Agrupar marcadores próximos
    new MarkerClusterer(this.map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      gridSize: 50, // Tamanho do grid para agrupar marcadores
      maxZoom: 15, // Zoom máximo em que os marcadores são agrupados
      zoomOnClick: true, // Zoom no grupo quando clicado
    });
  }
  

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '30px',
          }}
        >
          <div
            ref={this.mapRef}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              position: 'relative',
              height: '100%',
              width: '100%',
            }}
          />
          <Box
            sx={{
              height: '30px',
              bgcolor: '#fff',
              color: '#000',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {String(this.state.counter).padStart(2, '0')}:00
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export default SimpleContainer;
