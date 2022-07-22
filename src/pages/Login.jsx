import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors, clearErrors } from 'redux/user';
import { contactsApi } from 'redux/contacts/contacts-api';
import { toastErrorNotification } from 'services/utils';

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const errorModalId = useRef(null);
  const dispatch = useDispatch();
  const connectionError = useSelector(userSelectors.errorLogin);

  if (connectionError) {
    errorModalId.current = toastErrorNotification.show(
      connectionError,
      null,
      () => dispatch(clearErrors())
    );
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(contactsApi.util.invalidateTags(['Contacts']));
    dispatch(userOperations.loginUser(formValue));
  };

  const handleClick = () => {
    toastErrorNotification.hide(errorModalId.current);
  };

  const handleChange = ({ currentTarget }) => {
    setFormValue({
      ...formValue,
      [currentTarget.name]: currentTarget.value,
    });
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
              autoComplete="true"
              title="Email should contain simbol @, minimum two letters after @ in domain"
              required
              value={email}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Password:{' '}
            <input
              type="password"
              name="password"
              minLength={7}
              required
              value={password}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
