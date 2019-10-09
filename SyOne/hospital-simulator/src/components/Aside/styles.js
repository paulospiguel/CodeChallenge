import styled from 'styled-components';

export const Container = styled.aside`
  background: #202225;
  width: 120px;
  padding: 20px, 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  button {
    transition: all 0.2s;
    border-radius: 4px;
    height: 50px;
  }

  &:hover {
    border-radius: 6px;
  }
`;
