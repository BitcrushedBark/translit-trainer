import styled, { keyframes } from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

const flipIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const JsonBlock = styled.div<GenericStyleProps>`
  font-size: 1rem;
  font-family: monospace;
  min-width: 200px;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 4px;
  overflow: hidden;
  max-width: 100%;
  animation: ${flipIn} 0.5s ease-out;

  ${(props) => applyGenericStyleProps(props)}
`;

export const JsonLine = styled.div<GenericStyleProps>`
  text-indent: 1rem;

  ${(props) => applyGenericStyleProps(props)}
`;

export const JsonKey = styled.span<GenericStyleProps>`
  color: #8a3ffc;

  ${(props) => applyGenericStyleProps(props)}
`;

export const JsonValue = styled.span<GenericStyleProps>`
  color: #53a5df;

  ${(props) => applyGenericStyleProps(props)}
`;
