import React from 'react';

import { Container, MenuList, Button } from './styles';

export default function Aside() {
  return (
    <Container>
      <MenuList>
        <Button>Botão #1</Button>
        <Button>Botão #2</Button>
        <Button>Botão #3</Button>
        <Button>Botão #4</Button>
      </MenuList>
    </Container>
  );
}
