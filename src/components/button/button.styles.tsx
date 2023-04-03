import styled, { keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export const pulse = keyframes`
  0% {
    box-shadow: 0 .5rem #e6f6ff;
    border-radius: 4px;
  }
  30% {
    box-shadow: 0 .5rem #53a5df;
    border-radius: 4px;
  }
  40% {
    box-shadow: 0 .5rem #53a5df;
    border-radius: 4px;
  }
  70% {
    box-shadow: 0 .5rem #53a5df;
    border-radius: 4px;
  }
  100% {
    box-shadow: 0 .5rem #e6f6ff;
    border-radius: 4px;
  }
}`;

export interface ButtonProps {
  isDisabled?: boolean;
}

export const Button = styled.button<ButtonProps & GenericStyleProps>`
  border-radius: 4px;
  border: 1px solid #268bd2;
  width: 10rem;
  height: 5rem;
  font-size: 1.5rem;
  display: block;
  margin-left: .5rem;
  margin-right: .5rem;
  outline: none;
  color: #fdfdfd;
  cursor: pointer;
  box-shadow: 0 .5rem #1d689e;
  background-color: #268bd2;

  &:hover, &:focus {
    box-shadow: none;
    background-color: #fdfdfd;
    color: #1eaafa;
    animation: ${pulse} 1.7s infinite;
    animation-delay: 700ms;
  }

  &:focus {
    outline: 1px dashed #1eaafa;
    outline-offset: -7px;
  }

  &:active {
    box-shadow: 0 .5rem #1eaafa;
    transform: translateY(.5rem);
  }

  ${({ isDisabled }) => isDisabled ? `
    pointer-events: none;
    user-select: none;
    cursor: not-allowed;
    color: #b3b3b3;
    border: 1px solid #f2f2f2;
    box-shadow: 0 .5rem #888888;
    background-color: #f2f2f2;

    &:active {
      box-shadow: 0 .5rem #888888;
      transform: none;
    }

    &:hover {
      color: #b3b3b3;
      box-shadow: 0 .5rem #888888;
      outline: none;
      animation: none;
    }
  `: ''}

  ${(props) => applyGenericStyleProps(props)}
`;
