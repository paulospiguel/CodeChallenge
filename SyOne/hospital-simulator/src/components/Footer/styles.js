import styled from 'styled-components';

const Container = styled.footer`
  background: #333;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  div {
    text-align: justify;

    p {
      font-family: 'Source Sans Pro', sans-serif;
      color: #dedede;
      font-size: 16px;
      font-size-adjust: 0.58;
      color: #7159c1;
    }
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid grey;
  }
`;
export default Container;
