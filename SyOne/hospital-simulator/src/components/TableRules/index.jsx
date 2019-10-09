import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export const Container = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  background: grey;
  margin: 0 10px 10px 10px;
  padding: 10px 20px;

  p {
    background: #7159c1;
    text-align: center;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  svg {
    margin-right: 5px;
  }

  ul {
    list-style: none;
  }
`;

export default function TableRules() {
  const rules = useSelector(state => state.toggleSimulator.rules);
  return (
    <Container>
      <p>Tabela de Regras</p>
      <div>
        <ul>
          {rules.map(rule => (
            <li key={rule.id}>
              <FontAwesomeIcon icon={faHandPointRight} />
              {rule.description}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
