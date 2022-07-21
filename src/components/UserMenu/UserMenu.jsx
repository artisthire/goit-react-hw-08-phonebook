import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';
import { toastErrorNotification } from 'services/utils';

function UserMenu() {
  const dispatch = useDispatch();
  const userEmail = useSelector(userSelectors.userEmail);
  const connectionError = useSelector(userSelectors.errorLogout);

  const handleClick = () => {
    dispatch(userOperations.logoutUser());
  };

  if (connectionError) {
    toastErrorNotification.show(connectionError);
  }

  return (
    <div>
      <span>{userEmail}</span>{' '}
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
