import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './text.styles';

type Props = {
  children: ReactNode;
} & S.TextProps;

export const Text: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.Text {...props}>
      {children}
    </S.Text>
  )
}
