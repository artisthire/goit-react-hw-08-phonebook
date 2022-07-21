import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';
import PrivatePage from 'pages/PrivatePage';
import ProtectedPage from 'pages/ProtectedPage';
import Home from 'pages/Home';
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
            <Route path="/" element={<Home />} />
            <Route
              path="contacts"
              element={
                <PrivatePage redirectTo="/login">
                  <Contacts />
                </PrivatePage>
              }
            />
            <Route
              path="register"
              element={
                <ProtectedPage redirectTo="/contacts">
                  <Register />
                </ProtectedPage>
              }
            />
            <Route
              path="login"
              element={
                <ProtectedPage redirectTo="/contacts">
                  <Login />
                </ProtectedPage>
              }
            />
          </Routes>
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
