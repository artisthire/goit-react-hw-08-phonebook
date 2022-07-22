import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelectors } from 'redux/user';

function ProtectedRoute({ redirectTo = '/' }) {
  const isLogin = useSelector(userSelectors.isLogin);
  return !isLogin ? <Outlet /> : <Navigate to={redirectTo} />;
}

ProtectedRoute.prototype = {
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
