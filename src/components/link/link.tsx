import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './link.styles';

type Props = {
  children: ReactNode;
  href: string;
  target?: string;
};

export const Link: React.FC<Props & GenericStyleProps> = ({
  children,
  href,
  target,
  ...props
}) => {
  return (
    <S.Link {...props} href={href} target={target} tabIndex={0}>
      {children}
    </S.Link>
  )
}
