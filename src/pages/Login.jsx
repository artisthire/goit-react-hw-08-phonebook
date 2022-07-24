import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { userOperations, userSelectors, clearErrors } from 'redux/user';
import { contactsApi } from 'redux/contacts/contacts-api';
import FormContainer from 'components/FormContainer';

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const errorMessage = useSelector(userSelectors.errorLogin);
  const isLoading = useSelector(userSelectors.isLoading);

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(contactsApi.util.invalidateTags(['Contacts']));
    dispatch(userOperations.loginUser(formValue));
  };

  const handleChange = ({ currentTarget }) => {
    setFormValue({
      ...formValue,
      [currentTarget.name]: currentTarget.value,
    });
  };

  return (
    <FormContainer
      title="Login form"
      submit={{
        handler: handleSubmit,
        isProgress: isLoading,
        btnText: 'Login',
      }}
      processFormError={{
        message: errorMessage,
        onClose: () => dispatch(clearErrors()),
      }}
    >
      <FormGroup>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          size="small"
          type="email"
          name="email"
          autoComplete="true"
          inputProps={{
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
            title:
              'Email should contain simbol @, minimum two letters after @ in domain',
          }}
          required
          value={email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          name="password"
          inputProps={{
            minLength: 7,
          }}
          required
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
    </FormContainer>
  );
}

export default Login;
