import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddContactMutation } from 'redux/contacts/contacts-api';
import { getCashedContacts } from 'redux/contacts/contacts-selectors';
import { filterActions } from 'redux/filter';
import { toastErrorNotification } from 'services/utils';
import LoadSpinner from 'components/LoadSpinner';
import { Form, Label, LabelName, Input, Button } from './ContactForm.styled';

const initialState = {
  name: '',
  number: '',
};

function ContactForm() {
  const [formValue, setFormValue] = useState(initialState);
  const { name, number } = formValue;
  const toastIsNameId = useRef(null);
  const cachedContacts = useSelector(getCashedContacts);
  const [addContact, { isLoading: isAddingContact }] = useAddContactMutation();
  const dispatch = useDispatch();

  const warningToastDismiss = () =>
    toastErrorNotification.hide(toastIsNameId.current);

  const handleSubmit = async evt => {
    evt.preventDefault();
    warningToastDismiss();

    const normalizeName = name.toLocaleLowerCase();

    const isNameInContacts = cachedContacts.some(
      contact => contact.name.toLocaleLowerCase() === normalizeName
    );

    if (isNameInContacts) {
      toastIsNameId.current = toastErrorNotification.show(
        `"${name}" is already in contacts`
      );
      return;
    }

    if (name && number) {
      addContact({ name, number }).finally(() => {
        dispatch(filterActions.setFilter(''));
        setFormValue(initialState);
      });
    }
  };

  const handleChange = ({ currentTarget }) => {
    setFormValue({
      ...formValue,
      [currentTarget.name]: currentTarget.value.trim(),
    });
  };

  return (
    <Form onSubmit={handleSubmit} onClick={warningToastDismiss}>
      <Label>
        <LabelName>Name</LabelName>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>
      <Label>
        <LabelName>Phone</LabelName>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={isAddingContact}>
        {isAddingContact && <LoadSpinner style={{ marginRight: 5 }} />}
        Add contact
      </Button>
    </Form>
  );
}

export default ContactForm;
