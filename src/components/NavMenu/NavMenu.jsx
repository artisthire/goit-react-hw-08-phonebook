import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { userSelectors } from 'redux/user';
import UserMenu from 'components/UserMenu';
import styles from './NavMenu.module.css';

function NavMenu() {
  const isLogin = useSelector(userSelectors.isLogin);

  return (
    <AppBar position="static" component="div" className={styles.navMenu}>
      <Container maxWidth="md">
        <Toolbar disableGutters className={styles.inner}>
          {isLogin && (
            <Box className={styles.mainMenu}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }
              >
                Contacts
              </NavLink>
            </Box>
          )}

          {!isLogin && (
            <Box className={styles.registrationMenu}>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }
              >
                Singup
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }
              >
                Login
              </NavLink>
            </Box>
          )}
          {isLogin && <UserMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavMenu;
