import styled from 'styled-components';

export default styled.button`
  border: 0;
  outline: none;
  width: 48px;
  height: 48px;
  background-color: transparent;
  font-size: 20px;
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`;
