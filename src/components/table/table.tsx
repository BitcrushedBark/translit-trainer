import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './table.styles';

type Props = {
  children: ReactNode;
};

export const Table: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.Table {...props}>
      {children}
    </S.Table>
  )
};

export const THead: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.THead {...props}>
      {children}
    </S.THead>
  )
};

export const TBody: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.TBody {...props}>
      {children}
    </S.TBody>
  )
};

export const TH: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.TH {...props}>
      {children}
    </S.TH>
  )
};

export const TD: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.TD {...props}>
      {children}
    </S.TD>
  )
};

export const TRow: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.TRow {...props}>
      {children}
    </S.TRow>
  )
};