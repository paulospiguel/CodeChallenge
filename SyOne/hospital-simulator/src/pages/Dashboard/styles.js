import styled from "styled-components";

const Container = styled.div`
  background: #e1e1e1;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .fieldInput {
    display: flex;
    flex-direction: column;

    div {
      display: inherit;
      flex-direction: inherit;
    }
  }
`;

export default Container;
