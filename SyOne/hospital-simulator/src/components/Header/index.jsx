import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';

import Container from './styles';

export default function Header() {
  return (
    <Container>
      <h1>Simulador</h1>
      <div>
        <FontAwesomeIcon icon={faHospitalSymbol} />
      </div>
      <h1>Hospital</h1>
    </Container>
  );
}
