import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export const Footer = styled.footer<GenericStyleProps>`
  ${(props) => applyGenericStyleProps(props)}
`;
