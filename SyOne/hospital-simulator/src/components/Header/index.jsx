import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';

import Container from './styles';

export default function Header() {
  return (
    <Container>
      <div className="logoIcon">
        <h1>Simulador</h1>
        <FontAwesomeIcon icon={faHospitalSymbol} />
        <h1>Hospital</h1>
      </div>
    </Container>
  );
}
