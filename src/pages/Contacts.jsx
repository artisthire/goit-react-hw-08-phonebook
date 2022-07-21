import { useSelector } from 'react-redux';
import { userSelectors } from 'redux/user';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

function Contacts() {
  const isLogin = useSelector(userSelectors.isLogin);

  if (isLogin) {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />

        <ContactList />
      </div>
    );
  }
  return null;
}

export default Contacts;
