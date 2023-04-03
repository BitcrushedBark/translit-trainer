import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export const Table = styled.table<GenericStyleProps>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  color: #fdfdfd;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  margin-bottom: 1rem;

  ${(props) => applyGenericStyleProps(props)}
`;

export const THead = styled.thead<GenericStyleProps>`
  &:first-child {
    border-left: 3px solid #268bd2;
  }

  ${(props) => applyGenericStyleProps(props)}
`;

export const TBody = styled.tbody<GenericStyleProps>`
  font-size: 1rem;
  color: #268bd2;

  ${(props) => applyGenericStyleProps(props)}
`;

export const TH = styled.th<GenericStyleProps>`
  font-size: 1.5rem;
  padding: 1rem;
  background-color: #268bd2;
  border-top: 3px solid #268bd2;

  ${(props) => applyGenericStyleProps(props)}
`;

export const TD = styled.td<GenericStyleProps>`
  border-bottom: 3px solid #268bd2;
  min-width: 90px;

  &:first-child {
    border-left: 3px solid #268bd2;
  }

  &:last-child {
    border-right: 3px solid #268bd2;
  }

  ${(props) => applyGenericStyleProps(props)}
`;

export const TRow = styled.tr<GenericStyleProps>`
  ${(props) => applyGenericStyleProps(props)}
`;
