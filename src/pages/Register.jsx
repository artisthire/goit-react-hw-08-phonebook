import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors, clearErrors } from 'redux/user';
import { contactsApi } from 'redux/contacts/contacts-api';
import { toastErrorNotification } from 'services/utils';

const initialState = {
  name: '',
  email: '',
  password: '',
};

function Register() {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, password } = formValue;
  const errorModalId = useRef(null);
  const dispatch = useDispatch();
  const connectionError = useSelector(userSelectors.errorRegister);

  if (connectionError) {
    errorModalId.current = toastErrorNotification.show(
      connectionError,
      null,
      () => dispatch(clearErrors())
    );
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    dispatch(contactsApi.util.invalidateTags(['Contacts']));
    dispatch(userOperations.registerUser(formValue));
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
      <h1>Register page</h1>
      <form onSubmit={handleSubmit} onClick={handleClick}>
        <p>
          <label>
            Name:{' '}
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChange}
            />
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

        <button type="submit">Singup</button>
      </form>
    </div>
  );
}

export default Register;
