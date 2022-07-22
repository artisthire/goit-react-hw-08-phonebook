import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelectors } from 'redux/user';

function PrivateRoute({ redirectTo = '/' }) {
  const isLogin = useSelector(userSelectors.isLogin);
  return isLogin ? <Outlet /> : <Navigate to={redirectTo} />;
}

PrivateRoute.prototype = {
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
