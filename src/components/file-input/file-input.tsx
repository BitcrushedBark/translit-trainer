import React, { ReactNode, ChangeEvent, useState, useRef,useEffect } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './file-input.styles';


type Props = {
  children: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export const FileInput: React.FC<Props & GenericStyleProps> = ({
  children,
  onChange,
  onClick = () => null,
  ...props
}) => {
  const wrapperRef = useRef<HTMLLabelElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <S.FileInputWrapper {...props} ref={wrapperRef} isFocused={isFocused} onClick={onClick}>
      <S.FileInput type='file'
        onChange={onChange}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <S.FileInputText isFocused={isFocused}>{children}</S.FileInputText>
    </S.FileInputWrapper>
  )
}
