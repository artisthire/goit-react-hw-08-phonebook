import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';
import { toastErrorNotification } from 'services/utils';

function Login() {
  const dispatch = useDispatch();
  const connectionError = useSelector(userSelectors.errorLogin);

  const handleSubmit = evt => {
    evt.preventDefault();
    const formData = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    );
    dispatch(userOperations.loginUser(formData));
  };

  if (connectionError) {
    toastErrorNotification.show(connectionError);
  }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email:{' '}
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              autoComplete="true"
            />
          </label>
        </p>
        <p>
          <label>
            Password:{' '}
            <input type="password" name="password" required minLength={7} />
          </label>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
