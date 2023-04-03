import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export interface HeaderProps {
  size?: string;
  color?: string;
}

export const Header = styled.h1<HeaderProps & GenericStyleProps>`
  text-align: center;
  color: ${({ color }) => color ?? '#268bd2'};

  ${(props) => applyGenericStyleProps(props)}
`;
