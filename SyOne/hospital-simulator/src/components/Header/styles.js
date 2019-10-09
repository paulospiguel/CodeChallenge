import styled from 'styled-components';

const Container = styled.header`
  @media only screen and (max-width: 360px) {
    h1 {
      transition: all 0.2s;
      font-size: calc(1em + 2vmin);
      margin: 0px;
    }
  }
  background: #333;
  /*  margin-top: 20px; */
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  svg {
    position: relative;
    color: red;
    font-size: 100px;
    margin: -30px 0 -30px 0;
    padding: 10px 0 10px 0;
  }

  .logoIcon {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    background: #fff;
    padding: 5px 30px 5px 20px;
    border-radius: 30px;
  }

  h1 {
    margin: 0;
    color: red;
  }
`;
export default Container;
