import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #e1e1e1;
  padding: 20px;
  margin: 20px;
  overflow-y: scroll;

  > header {
    display: flex;
    background: #fff;
    color: green;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 10px;
    padding: 20px 10px;

    svg {
      font-size: 3.5em;
      color: red;
    }

    h1 {
      font-size: 20px;
    }
  }
  .divForm {
    border: 2px solid #e1e1e1;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    padding: 10px;
  }

  button {
    background: green;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 1.6em;
    width: 300px;
  }
`;

export const HeaderName = styled.div``;

export const DivSimulator = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0 0 10px;
  padding: 20px 10px;
  color: #000;
`;

export const DivList = styled.div`
  display: flex;
  flex: 1;
`;
export const List = styled.ul`
  list-style: none;
  width: 100%;
  margin: 10px 5px;
  background: #dcdcdc;
  padding: 10px 20px;
  border-radius: 4px;
  > div {
    background: #fff;
    height: 80%;
    flex: 1;
    margin: 10px;
    padding: 5px;
  }
  > li {
    padding: 2px;
    flex: 1;
    text-align: justify;
    justify-items: center;
  }
  > h4 {
    background: #7159c1;
    text-align: center;
    border-radius: 4px;
    color: #fff;
  }
`;

export const DivInput = styled.div`
  display: flex;
  width: 100%;

  padding: 10px;
  margin-bottom: 10px;
  flex-direction: row;

  align-items: flex-start;
  background: #dcdcdc;
  label {
  }
  input {
    flex: 1;
    border-radius: 4px;
    margin: 5px 0;
    width: 100%;
    height: 30px;
  }
`;

export const DivReport = styled.div`
  background: #dcdcdc;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  h3 {
    color: #7159c1;
  }
  .divMessage {
    background: #fff;
    margin: 10px 0;
    border-radius: 4px;
    ul {
      list-style: none;
      padding: 10px;
      ul {
        list-style-image: url('sqpurple.gif');
      }
    }

    svg {
      font-weight: bold;
      color: grey;
      margin-right: 5px;
    }
  }
  .dateTime {
    text-align: center;
    background: #fff;
    padding: 5px;
    margin: 10px 0;
    border-radius: 4px;
    font-weight: bold;
    color: #7159c1;
  }
`;
