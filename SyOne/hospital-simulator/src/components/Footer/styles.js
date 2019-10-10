import styled from 'styled-components';

const Container = styled.footer`
  @media only screen and (max-width: 360px) {
    flex-direction: column;
    height: 100%;
    p {
      text-align: center;
    }
    img {
      margin-top: 10px;
    }
  }
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
      margin: 0;
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
