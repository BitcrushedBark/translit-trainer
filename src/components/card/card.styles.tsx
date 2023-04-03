import styled, { css, keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

interface CardProps {
  isActive?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isMobile?: boolean;
}

const grow = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const errorShake = keyframes`
  0% {
    background-color: #d32727;
    border-color: #d32727;
    transform: translateX(0);
  }
  10% {
    background-color: #d32727;
    border-color: #d32727;
    transform: translateX(3px);
  }
  20% {
    background-color: #d32727;
    border-color: #d32727;
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
  100% {
    background-color: #5783a2;
    border-color: #5783a2;
  }
`;

export const Card = styled.form<CardProps & GenericStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #268bd2;
  color: #fdfdfd;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: .3rem solid #268bd2;
  border-radius: 4px;
  width: 8rem;
  padding: 1rem;
  margin: .5rem;
  font-size: 4rem;
  text-align: center;
  scroll-margin-top: 1rem;
  min-width: 10rem;
  outline: 1px solid #1d689e;
  outline-offset: -7px;
  scroll-margin-top: 15px;

  ${({ isMobile }) => isMobile ? 'scroll-margin-top: 30px;' : ''}

  ${({ isActive, isMobile }) => isActive && css`
    transform: scale(1.1);
    background-color: #1d689e;
    border-color: #1d689e;
    outline-color: #268bd2;
    ${isMobile ? '' : css`animation: ${grow} .5s 1;`};
  `}

  ${({ isCorrect }) => isCorrect && css`
    background-color: #80c9a9;
    border-color: #80c9a9;
  `}

  ${({ isWrong, isMobile }) => isWrong && css`
    ${isMobile ? '' : css`animation: ${errorShake} 1s linear 1;`};
    background-color: #5783a2;
    border-color: #5783a2;
  `}

  ${(props) => applyGenericStyleProps(props)}
`;

export const CardText = styled.span<GenericStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
  border-radius: 4px;
  overflow: hidden;
  max-width: 100%;

  ${(props) => applyGenericStyleProps(props)}
`;

export const CardInput = styled.input<GenericStyleProps>`
  font-size: 1.5rem;
  padding: 0.5rem;
  text-align: center;
  margin-top: 1rem;
  width: 90%;

  outline: none;
  text-align: center;
  text-transform: lowercase;
  box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
  border-radius: 4px;
  border-color: #fdfdfd;
  border-style: none;

  ${(props) => applyGenericStyleProps(props)}
`;

