import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './header.styles';

type Props = {
  children: ReactNode;
} & S.HeaderProps;

export const Header: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.Header {...props}>
      {children}
    </S.Header>
  )
}
