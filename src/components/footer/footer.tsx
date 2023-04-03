import React from 'react';
import { GenericStyleProps } from '@/utils';
import { Text } from '../text';
import { Link } from '../link';
import * as S from './footer.styles';

export const Footer: React.FC<GenericStyleProps> = ({ ...props }) => {
  return (
    <S.Footer {...props}>
      <Text>
        {`Inspired by `}
        <Link href='https://kana-quiz.tofugu.com' target='_blank'>Tofugu’s Learn Kana Quiz tool</Link>
      </Text>
    </S.Footer>
  )
};
