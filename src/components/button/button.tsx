import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './button.styles';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props & GenericStyleProps> = ({
  children,
  disabled,
  onClick
}) => {
  return (
    <S.Button onClick={onClick} disabled={disabled} tabIndex={0}>
      {children}
    </S.Button>
  )
}
