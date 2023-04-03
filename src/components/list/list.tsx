import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './list.styles';

type Props = {
  children: ReactNode;
};

export const List: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.List {...props}>
      {children}
    </S.List>
  )
};

export const ListItem: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.ListItem {...props}>
      {children}
    </S.ListItem>
  )
};
