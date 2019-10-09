import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Container = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;

  background: grey;
  margin: 10px 20px;
  padding: 10px 20px;
`;

export default function TableRules() {
  const rules = useSelector(state => state.toggleSimulator.rules);
  return (
    <Container>
      <p>Tabela de Regras</p>
      <div>
        <ul>
          {rules.map(rule => (
            <li key={rule.id}>{rule.description}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
