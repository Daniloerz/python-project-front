import React from 'react';
import { HomeContainer, WelcomeMessage, ImageContainer } from '../assets/styles/Home.styles';

// Importa la imagen
import logo from '../assets/images/MS_logo.jpg';

function Home() {
  return (
    <HomeContainer>
      <WelcomeMessage>Bienvenidos al Sistema de Gestión de la Tienda</WelcomeMessage>
      <ImageContainer>
        <img src={logo} alt="Producto destacado" />
      </ImageContainer>
    </HomeContainer>
  );
}

export default Home;
