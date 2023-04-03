import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './container.styles';

type Props = {
  children?: ReactNode;
} & S.ContainerProps;

export const Container: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (<S.Container {...props}>
    {children}
  </S.Container>)
}
