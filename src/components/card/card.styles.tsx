import styled, { css, keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

interface CardProps {
  isActive?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isMobile?: boolean;
  isDisabled?: boolean;
  isFlipping?: boolean;
  isShowingBack?: boolean;
  isVisible?: boolean;
  hasIncorrectAttempts?: boolean;
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

const foldCorner = keyframes`
  0% { clip-path: polygon(0 0,100% 0,100% 0,100% 100%,0 100%); }
  100% { clip-path: polygon(0 0,calc(100% - 2.00rem) 0,100% 2.00rem,100% 100%,0 100%); }
`;

const flipIn = (finalOpacity = 1) => keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: ${finalOpacity};
  }
`;

const flipHorizontally = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

export const CardWrapper = styled.div<CardProps & GenericStyleProps>`
  width: 10rem;
  min-width: 10rem;
  height: 15rem;
  margin: .5rem;
  position: relative;

  ${({ isFlipping, isShowingBack }) => isFlipping && css`
    animation: ${flipHorizontally} 0.4s;
    animation-direction: ${isShowingBack ? 'forward' : 'reverse'};
    animation-fill-mode: forwards;
  `}

  ${({ isShowingBack }) => isShowingBack && css`
    transform: rotateY(180deg);
  `}
`;

export const Card = styled.form<CardProps & GenericStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #268bd2;
  color: #fdfdfd;
  transition: all 0.3s ease-in-out;
  border: .3rem solid #268bd2;
  border-radius: 4px;
  padding: 1rem;
  font-size: 4rem;
  text-align: center;
  scroll-margin-top: 1rem;
  outline: 1px solid #1d689e;
  outline-offset: -7px;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;

  ${({ isMobile }) => isMobile ? 'scroll-margin-top: 30px;' : ''}

  ${({ isActive, isMobile }) => isActive && css`
    background-color: #1d689e;
    border-color: #1d689e;
    outline-color: #268bd2;
    ${isMobile ? '' : css`
      animation: ${grow} .5s 1;
      transform: scale(1.1);
    `};
  `}

  ${({ hasIncorrectAttempts, isMobile }) => hasIncorrectAttempts && css`
    ${isMobile ? '' : css`animation: ${errorShake} 1s linear 1;`};
  `}

  ${({ isDisabled }) => isDisabled && css`
    cursor: default;
    animation: ${foldCorner} 0.5s;
    animation-fill-mode: forwards;
  `}

  ${({ isCorrect, hasIncorrectAttempts }) => isCorrect && `
    background-color: ${hasIncorrectAttempts ? '#e3bf5b' : '#80c9a9'};
    border-color: ${hasIncorrectAttempts ? '#e3bf5b' : '#80c9a9'};
  `}

  ${({ isWrong }) => isWrong && `
    background-color: #5783a2;
    border-color: #5783a2;
  `}

  ${(props) => applyGenericStyleProps(props)}
`;

export const CardRotateIcon = styled.div<{
  isVisible?: boolean
} & GenericStyleProps>`
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  text-align: center;
  color: #fdfdfd;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #1d689e;
  font-size: 3rem;
  padding-top: 0.5rem;
  margin: 0;
  cursor: pointer;
  visibility: hidden;
  user-select: none;

  ${({ isVisible }) => isVisible && css`
    animation: ${flipIn()} 1s;
    animation-fill-mode: forwards;
  `}
`;

export const CardAnswerCounter = styled.div<{
  isShowingBack?: boolean;
  isFlipping?: boolean;
} & GenericStyleProps>`
  text-align: center;
  color: #fdfdfd;
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.5;

  ${({ isFlipping }) => isFlipping && css`
    animation: ${flipIn(0.5)} 0.4s;
    animation-fill-mode: forwards;
  `}

  ${({ isShowingBack }) => isShowingBack && css`
    animation: none;
    opacity: 0;
  `}
`;

export const CardText = styled.span<CardProps & {
  isPlaceholder?: boolean;
} & GenericStyleProps>`
  text-align: center;
  margin: 2rem;
  border-radius: 4px;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  width: 100%;
  min-width: 0;

  ${({ isDisabled }) => isDisabled ? 'cursor: default;' : 'cursor: pointer;'}

  ${({ isFlipping }) => isFlipping && css`
    animation: ${flipIn()} 0.4s;
    animation-fill-mode: forwards;
  `}

  ${({ isShowingBack, isPlaceholder }) => isShowingBack && `
    transform: rotateY(180deg);
    font-weight: 800;
    ${isPlaceholder ? '' : 'font-size: 1.2rem;'}
  `}

  ${(props) => applyGenericStyleProps(props)}
`;

export const CardInput = styled.input<CardProps & GenericStyleProps>`
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

  ${({ isFlipping, isVisible }) => isVisible && isFlipping && css`
    animation: ${flipIn(0.7)} 0.4s;
    animation-fill-mode: forwards;
  `}

  :disabled {
    opacity: 0.7;
  }

  ${(props) => applyGenericStyleProps(props)}
`;

export const ScrollAnchor = styled.div<Pick<CardProps, 'isMobile'>>`
  position: absolute;
  top: 0;
  scroll-margin-top: ${({ isMobile }) => isMobile ? '60px' : '30px'};
`;

