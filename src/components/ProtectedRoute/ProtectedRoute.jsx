import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from 'redux/user';

function ProtectedRoute({ redirectTo = '/' }) {
  const isLogin = useSelector(userSelectors.isLogin);
  return !isLogin ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
