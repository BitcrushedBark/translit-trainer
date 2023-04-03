import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export interface TextProps {
  color?: string;
  shouldShrink?: boolean;
}

export const Text = styled.span<TextProps & GenericStyleProps>`
  font-size: '1rem';
  color: ${({ color }) => color ?? '#313638'};

  ${({ shouldShrink }) => shouldShrink ? `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
    min-width: 0;
  ` : ''}

  ${(props) => applyGenericStyleProps(props)}
`;
