import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './button.styles';

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props & GenericStyleProps> = ({
  children,
  isDisabled,
  onClick
}) => {
  return (
    <S.Button onClick={onClick} isDisabled={isDisabled} tabIndex={0}>
      {children}
    </S.Button>
  )
}
