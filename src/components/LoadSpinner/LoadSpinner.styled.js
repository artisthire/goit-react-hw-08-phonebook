import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ImSpinner9 } from 'react-icons/im';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

export const LoadingIcon = styled(ImSpinner9)`
  color: #7a82b5;

  animation: ${rotate} 1s linear infinite;
`;
