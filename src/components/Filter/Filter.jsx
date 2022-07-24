import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { filterSelectors, filterActions } from 'redux/filter';
import styles from './Filter.module.css';

function Filter() {
  const filterValue = useSelector(filterSelectors.getFilter);
  const dispatch = useDispatch();

  const onFilterChange = ({ currentTarget }) =>
    dispatch(filterActions.setFilter(currentTarget.value));

  return (
    <Container disableGutters={true} maxWidth="sm" className={styles.container}>
      <FormGroup>
        <TextField
          id="search"
          label="Find contact by name"
          variant="outlined"
          size="small"
          type="search"
          name="search"
          required
          value={filterValue}
          onChange={onFilterChange}
        />
      </FormGroup>
    </Container>
  );
}

export default Filter;
