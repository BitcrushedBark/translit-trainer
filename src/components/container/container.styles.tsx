import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export interface ContainerProps {
  flexDirection?: 'column' | 'row';
  alignItems?: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  opacity?: string;
}

export const Container = styled.div<ContainerProps & GenericStyleProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  animation: flip-in 0.2s ease-in-out;
  margin: 0;
  max-width: 100%;
  
  ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection}` : ''};
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems}` : ''};
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent}` : ''};
  ${({ opacity }) => opacity ? `opacity: ${opacity}` : ''};


  ${(props) => applyGenericStyleProps(props)}
`;
