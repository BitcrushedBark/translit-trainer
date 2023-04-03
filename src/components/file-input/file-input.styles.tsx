import styled, { css, keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';
import { Text } from '../text';

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

interface Props {
  isFocused?: boolean;
}

export const FileInputWrapper = styled.label<Props & GenericStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;
  position:relative;

  animation: ${({ isFocused }) => isFocused ? css`${pulse} 1.7s infinite` : ''};

  &:hover {
    animation: ${pulse} 1.7s infinite;
    animation-delay: 700ms;
  }

  &:active {
    box-shadow: 0 .5rem #1eaafa;
    transform: translateY(.5rem);
  }

  ${(props) => applyGenericStyleProps(props)}
`;

export const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  min-width: 100%;
  min-height: 100%;
`;

export const FileInputText = styled(Text)<Props>`
  && {
    font-size: 1.5rem;
    color: #fdfdfd;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    text-align: center;
    z-index: 1;
    padding: 0 2rem;

    border: 1px solid #268bd2;
    box-shadow: 0 .5rem #1d689e;
    outline: none;
    background-color: #268bd2;

    &:hover {
      box-shadow: none;
      background-color: #fdfdfd;
      color: #1eaafa;
    }

    ${({ isFocused }) => isFocused ? `
      box-shadow: none;
      background-color: #fdfdfd;
      color: #1eaafa;
      outline: 1px dashed #1eaafa;
      outline-offset: -7px;
    ` : ''}
  }
`;