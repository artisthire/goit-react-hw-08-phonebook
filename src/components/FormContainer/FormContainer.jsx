import { useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { toastErrorNotification } from 'services/utils';
import styles from './FormContainer.module.css';

function FormContainer({ title, submit, processFormError, children }) {
  const errorModalId = useRef(null);

  if (Boolean(processFormError.message)) {
    errorModalId.current = toastErrorNotification.show(
      processFormError.message,
      null,
      () => processFormError.onClose && processFormError.onClose()
    );
  }

  const handleClick = evt => {
    if (evt.target.tagName === 'INPUT') {
      processFormError && toastErrorNotification.hide(errorModalId.current);
    }
  };

  return (
    <Container disableGutters={true} maxWidth="sm">
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
        {title}
      </Typography>
      <form
        component="form"
        className={styles.form}
        onSubmit={submit.handler}
        onClick={handleClick}
      >
        {children}
        <Box className={styles.submitBtnContainer}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={submit.isProgress}
          >
            {submit.btnText}
          </Button>
          {submit.isProgress && (
            <CircularProgress className={styles.submitIcon} size={24} />
          )}
        </Box>
      </form>
    </Container>
  );
}

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  submit: PropTypes.exact({
    handler: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
    isProgress: PropTypes.bool.isRequired,
  }).isRequired,
  processFormError: PropTypes.exact({
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  }),
  children: PropTypes.node.isRequired,
};

export default FormContainer;
