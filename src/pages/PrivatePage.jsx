import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from 'redux/user';

function PrivatePage({ redirectTo = '/', children }) {
  const isLogin = useSelector(userSelectors.isLogin);

  if (isLogin) {
    return children;
  }

  return <Navigate to={redirectTo} replace />;
}

export default PrivatePage;
