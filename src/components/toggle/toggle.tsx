import React, { useState, useEffect } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './toggle.styles';

type Props = {
  onClick?: (isChecked: boolean) => void;
};

export const Toggle: React.FC<Props & GenericStyleProps> = ({ onClick, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    onClick?.(isChecked);
  }, [isChecked, onClick]);

  return (
    <S.ToggleLabel {...props}>
      <S.ToggleInput
        type='checkbox'
        onChange={() => setIsChecked(!isChecked)}
        tabIndex={0} 
      />
      <S.ToggleSlider isChecked={isChecked} />
    </S.ToggleLabel>
  )
}
