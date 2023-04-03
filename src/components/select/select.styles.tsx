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

export const Select = styled.select<GenericStyleProps>`
  text-align: center;
  border-radius: 4px;
  border: 1px solid #268bd2;
  padding: 1rem;
  font-size: 1.5rem;
  outline: none;
  color: transparent;
  cursor: pointer;
  box-shadow: 0 .5rem #1d689e;
  width: 3.5rem;

  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: left calc(100% - 1rem) top 55%;
  background-size: 1em;
  background-color: #268bd2;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;

  &:hover, &:focus {
    box-shadow: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2353a5df' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-color: #fdfdfd;
    animation: ${pulse} 1.7s infinite;
    animation-delay: 700ms;
  }

  &:focus {
    outline: 1px dashed #268bd2;
    outline-offset: -7px;
  }

  ${(props) => applyGenericStyleProps(props)}
`;

export const Option = styled.option<GenericStyleProps>`
  font-size: 1rem;
  color: #268bd2;

  ${(props) => applyGenericStyleProps(props)}
`;
