import React, { useMemo } from 'react';
import { GenericStyleProps } from '@/utils';
import { TranslitData } from '@/types';
import * as S from './json-block.styles';

type Props = {
  json?: TranslitData | null;
};

export const JsonBlock: React.FC<Props & GenericStyleProps> = ({
  json,
  ...props
}) => {
  const entries = useMemo(() => Object.entries(json || {}), [json]);

  return (
    <S.JsonBlock {...props}>
      {`{`}
      {
        entries.map(([key, values], index) => (
          <S.JsonLine key={key}>
            <S.JsonKey>{`"${key}"`}</S.JsonKey>
            {`: [`}
            {values.map((value, index) => (
              <S.JsonValue key={key + value}>
                {`${ !index ? '' : ', ' }"${ value }"`}
              </S.JsonValue>
            ))}
            {index === entries.length - 1 ? ']' : '],'}
          </S.JsonLine>
        ))
      }
      {`}`}
    </S.JsonBlock>
  )
};
