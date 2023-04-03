import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export interface ToggleSliderProps {
  isChecked?: boolean;
}

export const ToggleLabel = styled.label<GenericStyleProps>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  ${(props) => applyGenericStyleProps(props)}
`;

export const ToggleInput = styled.input<GenericStyleProps>`
  opacity: 0;
  width: 0;
  height: 0;

  ${(props) => applyGenericStyleProps(props)}
`;

export const ToggleSlider = styled.span<ToggleSliderProps & GenericStyleProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 4px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fdfdfd;
    transition: 0.2s;

    ${({ isChecked }) => isChecked ? `
      transform: translateX(26px);
    ` : ''}
  }

  ${(props) => applyGenericStyleProps(props)}
`;
