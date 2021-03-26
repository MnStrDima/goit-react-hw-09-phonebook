import { NavLink } from 'react-router-dom';
import routesData from '../../routes';
import styles from './AuthMenu.module.css';

const AuthMenu = () => (
  <>
    <nav className={styles.authNav}>
      <NavLink
        exact
        to={routesData.pathes.registerPage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Register
      </NavLink>
      <NavLink
        exact
        to={routesData.pathes.loginPage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Log In
      </NavLink>
    </nav>
  </>
);

export default AuthMenu;
