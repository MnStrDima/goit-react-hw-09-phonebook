import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Container } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import styles from './AppBar.module.css';
import appBarTransitionStyles from '../../transitionStyles/appBarTransitionStyles.module.css';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import authSelectors from '../../redux/auth/auth-selectors';

export default function AppBar() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <CSSTransition
      in={true}
      appear
      classNames={appBarTransitionStyles}
      timeout={500}
      unmountOnExit
    >
      <Container maxWidth="xl">
        <header className={styles.siteHeader}>
          <Navigation />
          {isAuthenticated ? <UserMenu /> : <AuthMenu />}
        </header>
      </Container>
    </CSSTransition>
  );
}
