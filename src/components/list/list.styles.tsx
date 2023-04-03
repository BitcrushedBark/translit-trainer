import styled from 'styled-components';
import { GenericStyleProps, applyGenericStyleProps } from '@/utils';

export const List = styled.ul<GenericStyleProps>`
  display: table;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 3rem;
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;

  ${(props) => applyGenericStyleProps(props)}
`;

export const ListItem = styled.li<GenericStyleProps>`
  &:before {
    content: "\\25C6";
    margin-right: 5px;
    color: #268bd2;
  }

  ${(props) => applyGenericStyleProps(props)}
`;
