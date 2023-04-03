import React, { ReactNode } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './speech-bubble.styles';

type Props = {
  children: ReactNode;
} & S.SpeechBubbleProps;

export const SpeechBubble: React.FC<Props & GenericStyleProps> = ({ children, ...props }) => {
  return (
    <S.SpeechBubble {...props}>
      {children}
    </S.SpeechBubble>
  )
};
