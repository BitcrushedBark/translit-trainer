import styled from 'styled-components';

export const Home = styled.div`
  text-align: center;
  width: 100%;
  min-height: 100vh;
  padding: 7px;
`;

export const HomeBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  min-height: calc(100vh - 14px);

  border: 2px dashed #1eaafa;
  border-radius: 4px;

  padding-bottom: 0.5rem;
`;
