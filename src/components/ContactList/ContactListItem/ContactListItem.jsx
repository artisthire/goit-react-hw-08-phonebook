import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useRemoveContactMutation } from 'redux/contacts/contacts-api';
import { filterActions } from 'redux/filter';
import styles from './ContactListItem.module.css';

function ContactListItem({ contact }) {
  const [removeContact, { isLoading: isRemovingContact }] =
    useRemoveContactMutation();
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  const onContactRemove = id => {
    removeContact(id).finally(() => dispatch(filterActions.setFilter('')));
  };

  return (
    <ListItem>
      <ListItemIcon>
        <ContactPhoneIcon color="primary" className={styles.itemIcon} />
      </ListItemIcon>
      <ListItemText className={styles.itemText}>
        {name}:{' '}
        <Link
          href={`tel:+${number}`}
          underline="none"
          className={styles.itemPhone}
        >
          {number}
        </Link>
      </ListItemText>

      <Box className={styles.btnContainer}>
        <Button
          variant="contained"
          type="button"
          aria-label="Delete"
          size="small"
          className={styles.btn}
          disabled={isRemovingContact}
          onClick={() => onContactRemove(id)}
        >
          <DeleteIcon />
        </Button>
        {isRemovingContact && (
          <CircularProgress size={24} className={styles.btnIcon} />
        )}
      </Box>
    </ListItem>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactListItem;
