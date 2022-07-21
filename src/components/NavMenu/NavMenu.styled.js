import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavLinkStyled = styled(NavLink)`
  display: block;
  padding: 4px 8px;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    opacity: 1;
    text-decoration: underline;
  }
`;

export { NavLinkStyled };
