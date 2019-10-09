import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  ul {
    display: flex;
    flex: 1;
    width: 100%;
    list-style: none;

    li {
      margin-right: 5px;
    }
  }
`;

export default function ReportPatienties() {
  const reports = useSelector(state => state.toggleSimulator.reports);

  return (
    <Container>
      <ul>
        {reports.map((report, index, array) => {
          return (
            <li key={report.id}>
              {`${report.id.toUpperCase()}:
              ${report.value}
              ${index < array.length - 1 ? ',' : ''}`}
              {/* Adiciona as vírgulas automaticamente */}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
