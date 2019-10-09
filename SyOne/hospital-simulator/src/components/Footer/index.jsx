import React from 'react';

import Container from './styles';
import logo from '../../assets/logo-syone.png';

export default function Footer() {
  return (
    <Container>
      <div>
        <p>PauloSpiguel Developer</p>
        <p>Coding Challenge</p>
        <p>V. 1.0 | 2019</p>
      </div>
      <img src={logo} alt="logo-syone" />
    </Container>
  );
}
