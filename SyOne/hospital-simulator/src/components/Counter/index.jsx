import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 10px;

  p {
    font-size: 25px;
  }
`;

const Counter = ({ count }) => (
  <Container>
    <h4>Execuções</h4>
    <p>{count}</p>
  </Container>
);

export default connect(state => ({
  count: state.counter.count,
}))(Counter);
