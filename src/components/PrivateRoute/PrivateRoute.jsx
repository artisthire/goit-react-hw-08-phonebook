import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from 'redux/user';

function PrivateRoute({ redirectTo = '/' }) {
  const isLogin = useSelector(userSelectors.isLogin);
  return isLogin ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
