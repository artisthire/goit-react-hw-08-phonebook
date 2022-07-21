import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';
import PrivateRoute from 'components/PrivateRoute';
import ProtectedRoute from 'components/ProtectedRoute';
import Contacts from 'pages/Contacts';
import Register from 'pages/Register';
import Login from 'pages/Login';
import NavMenu from 'components/NavMenu';
import { Wrapper, Container } from './App.styled';

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    userSelectors.isFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(userOperations.getCurrentUser());
  }, [dispatch]);

  if (isFetchingCurrentUser) {
    return <p>Data synchronization...</p>;
  }

  return (
    <>
      <NavMenu />
      <Wrapper>
        <Container>
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
      </Wrapper>
    </>
  );
}

export default App;
