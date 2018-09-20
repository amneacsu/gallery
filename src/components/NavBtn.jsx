import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  outline: none;
  min-width: 48px;
  height: 48px;
  background-color: transparent;
  border-radius: 0;
  font-size: 20px;
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`;

const NavBtn = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClick}
    >{label}</StyledButton>
  );
};

NavBtn.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavBtn;
