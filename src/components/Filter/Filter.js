import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changeFilter } from '../../redux/phoneBook/phoneBook-actions';
import styles from './Filter.module.css';
import filterTransitionStyles from '../../transitionStyles/filterTransition.module.css';
import {
  getFilter,
  getContactsLength,
} from '../../redux/phoneBook/phoneBook-selectors';

export default function Filter() {
  const dispatch = useDispatch();
  const initialValue = useSelector(getFilter);
  const contactsLength = useSelector(getContactsLength);
  const onFilterChange = e => dispatch(changeFilter(e.target.value));

  return (
    <CSSTransition
      in={contactsLength > 1}
      classNames={filterTransitionStyles}
      timeout={250}
      unmountOnExit
    >
      <div className={styles.inputWrapper}>
        <label className={styles.filterLabel}>
          Find contacts by name:
          <input
            className={styles.filterInput}
            type="text"
            name="name"
            value={initialValue}
            onChange={onFilterChange}
          />
        </label>
      </div>
    </CSSTransition>
  );
}
