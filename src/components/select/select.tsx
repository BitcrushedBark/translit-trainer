import React, { ChangeEvent } from 'react';
import { GenericStyleProps } from '@/utils';
import * as S from './select.styles';

type Props = {
  options: { value: string | number; label: string }[];
  defaultValue?: string | number | null;
  placeholder?: string;
  labelPrefix?: string;
  labelPostfix?: string;
  value: string | number| null;
  onChange: (value: string | number) => void;
};

export const Select: React.FC<Props & GenericStyleProps> = ({
  options,
  defaultValue = '',
  onChange,
  value,
  placeholder,
  labelPrefix = '',
  labelPostfix = '',
  ...props
}) => {  
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>{
    const selectedValue = event.target.value;
    onChange(selectedValue);
  }

  return (
    <S.Select {...props} value={value == null ? '' : value} onChange={handleChange}>
      {
        <option key={'default-placeholder'} value="" disabled hidden>
          {placeholder}
        </option>
      }
      {options.map(option => (
        <S.Option key={option.value} value={option.value}>
          {labelPrefix}{option.label}{labelPostfix}
        </S.Option>
      ))}
    </S.Select>
  )
};
