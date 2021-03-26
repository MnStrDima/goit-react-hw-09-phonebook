import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { authSelectors, authOperations } from '../../redux/auth';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const email = useSelector(authSelectors.getEmail);
  const name = useSelector(authSelectors.getUserName);

  const onLogout = () => dispatch(authOperations.logOut());
  return (
    <div className={styles.container}>
      <span className={styles.email}>Welcome, {name ? name : email}</span>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="medium"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}
