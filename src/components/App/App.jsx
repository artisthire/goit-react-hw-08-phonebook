import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { userOperations, userSelectors } from 'redux/user';
import PrivateRoute from 'components/PrivateRoute';
import ProtectedRoute from 'components/ProtectedRoute';
import Contacts from 'pages/Contacts';
import Register from 'pages/Register';
import Login from 'pages/Login';
import NavMenu from 'components/NavMenu';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    userSelectors.isFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(userOperations.getCurrentUser());
  }, [dispatch]);

  if (isFetchingCurrentUser) {
    return (
      <Container maxWidth="md" className={styles.container}>
        <Typography variant="h6" component="h2">
          Data synchronization...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <NavMenu />
      <Container maxWidth="md" className={styles.container}>
        <Routes>
          <Route element={<PrivateRoute redirectTo="login" />}>
            <Route path="/" element={<Contacts />} />
          </Route>
          <Route element={<ProtectedRoute redirectTo="/" />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
