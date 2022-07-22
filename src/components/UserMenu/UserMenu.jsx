import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';

function UserMenu() {
  const dispatch = useDispatch();
  const userEmail = useSelector(userSelectors.userEmail);

  const handleClick = () => {
    dispatch(userOperations.logoutUser());
  };

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
