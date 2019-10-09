import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.5em;
  align-items: center;

  > ul {
    display: flex;
    list-style: none;
    li {
      padding: 3px;
    }
  }
`;

export default function ReportPatienties() {
  const reports = useSelector(state => state.toggleSimulator.reports);

  return (
    <Container>
      <ul>
        {reports.map((report, index, array) => (
          <li key={report.id}>
            {`${report.id.toUpperCase()}:
              ${report.value}
              ${index < array.length - 1 ? ',' : ''}`}
            {/* Adiciona as vírgulas automaticamente */}
          </li>
        ))}
      </ul>
    </Container>
  );
}
