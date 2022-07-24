import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <Container maxWidth="md">
      <Typography variant="h6" component="h2">
        Page not found
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ paddingLeft: '30px' }}
      >
        <Link to="/">Back to home page</Link>
      </Typography>
    </Container>
  );
}

export default NotFound;
