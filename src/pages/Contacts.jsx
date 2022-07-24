import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { userSelectors } from 'redux/user';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

function Contacts() {
  const isLogin = useSelector(userSelectors.isLogin);

  if (isLogin) {
    return (
      <Container disableGutters={true} maxWidth="sm">
        <ContactForm />

        <Typography variant="h4" component="h2" sx={{ margin: '40px 0 20px' }}>
          Contacts
        </Typography>
        <Filter />

        <ContactList />
      </Container>
    );
  }
}

export default Contacts;
