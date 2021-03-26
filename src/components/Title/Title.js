import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './Title.module.css';

const Title = ({ title }) => (
  <CSSTransition
    in={true}
    appear={true}
    classNames={styles}
    timeout={500}
    unmountOnExit
  >
    <h1 className={styles.title}>{title}</h1>
  </CSSTransition>
);

export default Title;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
