import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { useAddContactMutation } from 'redux/contacts/contacts-api';
import { getCashedContacts } from 'redux/contacts/contacts-selectors';
import { filterActions } from 'redux/filter';
import FormContainer from 'components/FormContainer';

const initialState = {
  name: '',
  number: '',
};

function ContactForm() {
  const [formValue, setFormValue] = useState(initialState);
  const [validateError, setValidateError] = useState('');
  const cachedContacts = useSelector(getCashedContacts);
  const [addContact, { isLoading: isAddingContact }] = useAddContactMutation();
  const dispatch = useDispatch();
  const { name, number } = formValue;

  const handleSubmit = async evt => {
    evt.preventDefault();

    const nameValue = name.trim();
    const numberValue = number.trim();

    const normalizeName = nameValue.toLocaleLowerCase();
    const isNameInContacts = cachedContacts.some(
      contact => contact.name.toLocaleLowerCase() === normalizeName
    );

    if (isNameInContacts) {
      setValidateError(`"${nameValue}" is already in contacts`);
      return;
    }

    if (nameValue && numberValue) {
      addContact({ name: nameValue, number: numberValue }).finally(() => {
        dispatch(filterActions.setFilter(''));
        setFormValue(initialState);
      });
    }
  };

  const handleChange = ({ currentTarget }) => {
    setFormValue({
      ...formValue,
      [currentTarget.name]: currentTarget.value,
    });
  };

  return (
    <FormContainer
      title="Phonebook"
      submit={{
        handler: handleSubmit,
        isProgress: isAddingContact,
        btnText: 'Add contact',
      }}
      processFormError={{
        message: validateError,
        onClose: () => setValidateError(''),
      }}
    >
      <FormGroup>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          size="small"
          type="text"
          name="name"
          required
          inputProps={{
            maxLength: 40,
            pattern:
              "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
            title:
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          }}
          value={name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          id="number"
          label="Phone"
          variant="outlined"
          size="small"
          type="text"
          name="number"
          required
          inputProps={{
            pattern:
              '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
            title:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
          }}
          value={number}
          onChange={handleChange}
        />
      </FormGroup>
    </FormContainer>
  );
}

export default ContactForm;
