import styled from 'styled-components';

const Container = styled.header`
  background: #333;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0 10px;
  }

  svg {
    color: red;
    font-size: 60px;
  }
`;
export default Container;
