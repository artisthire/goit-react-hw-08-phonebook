import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { userSelectors } from 'redux/user';
import UserMenu from 'components/UserMenu';
import { NavLinkStyled } from './NavMenu.styled';

function NavMenu() {
  const isLogin = useSelector(userSelectors.isLogin);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2a7385' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLogin && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              <NavLinkStyled to="/">Home</NavLinkStyled>
              <NavLinkStyled to="/contacts">Contacts</NavLinkStyled>
            </Box>
          )}

          {!isLogin && (
            <Box
              sx={{ flexGrow: 0, display: { xs: 'flex', marginLeft: 'auto' } }}
            >
              <NavLinkStyled to="/register">Singup</NavLinkStyled>
              <NavLinkStyled to="/login">Login</NavLinkStyled>
            </Box>
          )}
          {isLogin && (
            <Box sx={{ flexGrow: 0, display: { xs: 'flex' } }}>
              <UserMenu />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavMenu;
