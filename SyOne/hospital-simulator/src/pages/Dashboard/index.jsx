import React from 'react';

import Header from '../../components/Header';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import Container from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}
