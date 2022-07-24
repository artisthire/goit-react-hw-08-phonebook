import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { userOperations, userSelectors } from 'redux/user';
import styles from './UserMenu.module.css';

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userEmail = useSelector(userSelectors.userEmail);

  const handleMenu = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setAnchorEl(null);
    dispatch(userOperations.logoutUser());
  };

  return (
    <Box className={styles.container}>
      <Typography variant="string" component="span">
        {userEmail}
      </Typography>
      <IconButton
        size="large"
        aria-label="account"
        aria-controls="menu-user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-user"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={styles.submenuItem} onClick={handleClick}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
