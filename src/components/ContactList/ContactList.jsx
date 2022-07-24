import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetContactsQuery } from 'redux/contacts/contacts-api';
import { filterSelectors } from 'redux/filter';
import ContactListItem from 'components/ContactList/ContactListItem';
import styles from './ContactList.module.css';

function ContactList() {
  const filter = useSelector(filterSelectors.getFilter);
  const { data: contacts = [], isFetching: isLoadingContacts } =
    useGetContactsQuery();
  const visibleContacts = useMemo(() => {
    const normalizedFilterValue = filter.toLowerCase();

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );

    return visibleContacts;
  }, [contacts, filter]);

  if (isLoadingContacts) {
    return <CircularProgress className={styles.loadingIcon} size={60} />;
  }

  return (
    <List className={styles.list}>
      {visibleContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
}

export default ContactList;
