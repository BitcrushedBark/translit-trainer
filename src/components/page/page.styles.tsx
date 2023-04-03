import styled, { keyframes } from 'styled-components';
import { Container } from '@/components';

const flipIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`;


export const Page = styled(Container)`
  && {
    flex-direction: column;
    padding: 2rem;
    animation: ${flipIn} 0.2s ease-in-out;
  }
`;
