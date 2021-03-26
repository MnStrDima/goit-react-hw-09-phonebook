import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import Title from '../../components/Title/Title';
import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';
import Modal from '../../components/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import styles from '../../transitionStyles/app.module.css';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import {
  getAllContacts,
  getLoading,
} from '../../redux/phoneBook/phoneBook-selectors';
import { authSelectors } from '../../redux/auth';

export default function ContactsView() {
  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);
  const isLoading = useSelector(getLoading);
  const isAuthLoading = useSelector(authSelectors.getIsAuthLoading);

  useEffect(() => {
    dispatch(phonebookOperations.fetchContacts());
  }, [dispatch]);

  // componentDidMount() {
  //   fetchContacts();
  // }

  return (
    <>
      {isLoading ||
        (isAuthLoading && (
          <Modal>
            <Preloader />
          </Modal>
        ))}
      <Container maxWidth="md">
        <Title title="Phonebook:" />

        <ContactForm />

        {contacts.length > 0 && <h2 className={styles.title}>Contacts:</h2>}

        <Filter />

        <ContactList />
      </Container>
    </>
  );
}
