import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors, userActions } from 'redux/user';
import { toastErrorNotification } from 'services/utils';

function Login() {
  const errorModalId = useRef(null);
  const dispatch = useDispatch();
  const connectionError = useSelector(userSelectors.errorLogin);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    dispatch(userOperations.loginUser(formData))
      .unwrap()
      .then(() => form.reset());
  };

  if (connectionError) {
    errorModalId.current = toastErrorNotification.show(
      connectionError,
      null,
      () => dispatch(userActions.clearErrors())
    );
  }

  const handleClick = () => {
    toastErrorNotification.hide(errorModalId.current);
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit} onClick={handleClick}>
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
