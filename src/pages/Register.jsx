import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from 'redux/user';
import { toastErrorNotification } from 'services/utils';

function Register() {
  const dispatch = useDispatch();
  const connectionError = useSelector(userSelectors.errorRegister);

  const handleSubmit = async evt => {
    evt.preventDefault();
    const formData = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    );

    dispatch(userOperations.registerUser(formData));
  };

  if (connectionError) {
    toastErrorNotification.show(connectionError);
  }

  return (
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name: <input type="text" name="name" required />
          </label>
        </p>
        <p>
          <label>
            Email:{' '}
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Password:{' '}
            <input type="password" name="password" required minLength={7} />
          </label>
        </p>

        <button type="submit">Singup</button>
      </form>
    </div>
  );
}

export default Register;
