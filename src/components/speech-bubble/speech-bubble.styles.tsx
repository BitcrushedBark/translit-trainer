import styled, { css, keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';
import { Container } from '../container';

export interface SpeechBubbleProps {
  tailPosition?: 'up' | 'down' | 'left' | 'right' | 'none';
  bubbleStyle?: 'default' | 'error' | 'code';
}

const errorShake = keyframes`
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(3px);
  }
  20% {
    transform: translateX(-3px);
  }
  30% {
    transform: translateX(3px);
  }
  40% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(3px);
  }
  60% {
    transform: translateX(-3px);
  }
  70% {
    transform: translateX(0);
  }
`;

export const SpeechBubble = styled(Container)<SpeechBubbleProps & GenericStyleProps>`
  && {
    position: relative;
    max-width: 500px;
    text-align: left;
    padding: 2rem;
    align-items: start;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    outline-width: 1px;
    outline-style: dashed;
    outline-offset: -7px;
    flex-direction: column;

    &:before {
      content: '';
      position: absolute;
      transform: translate(50%, -50%) rotate(45deg) translateZ(0);
      height: 30px;
      width: 30px;
      border-width: 0 1px 1px 0;
      border-radius: 0 0 2px 0;
      outline: 2px dotted #fdfdfd;
      outline-offset: -7px;

      ${({ tailPosition }) => {
        switch (tailPosition) {
          case 'down':
            return `
              top: 100%;
              left: calc(50% - 30px);
            `;
          case 'up':
            return `
              top: 0;
              left: calc(50% - 30px);
            `;
          case 'left':
            return `
              bottom: calc(50% - 30px);
              right: 100%;
            `;
          case 'right':
            return `
              bottom: calc(50% - 30px);
              right: 0;
            `;
          default:
            return `
              top: 100%;
              left: calc(50% - 30px);
            `;
        }
      }}
    }

    ${({ bubbleStyle }) => {
      switch(bubbleStyle) {
        case 'error':
          return css`
            border-color: #d94c03;
            outline-color: #d36c00;
            color: #d94c03;
            animation: ${errorShake} 0.5s linear 1;

            &:before {
              background: #d94c03;
            }
          `;
        case 'code':
          return `
            border-color: #555c5f;
            outline-color: #7b8386;
            color: #555c5f;

            &:before {
              background: #555c5f;
            }
          `;
        default:
          return `
            border-color: #268bd2;
            outline-color: #1eaafa;

            &:before {
              background: #268bd2;
            }
          `;
      }
    }};
    
    ${(props) => applyGenericStyleProps(props)}
  }
`;
