import styled from 'styled-components';

export const Link = styled.a`
  position: relative;
  color: #1d689e;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #53a5df;
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #e6f6ff);
  }
`;
