import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Container, Button, Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import styles from './EditContactView.module.css';
import routesData from '../../routes';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import Notification from '../../components/Notification/Notification';
import Title from '../../components/Title/Title';
import Modal from '../../components/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import {
  getAllContacts,
  getErrorMessage,
  getLoading,
} from '../../redux/phoneBook/phoneBook-selectors';
import { authSelectors } from '../../redux/auth';

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0930939393')
    .required("Enter contact's phone"),
});

export default function ContactUpdateView({ location, history }) {
  const { contactObj: contactToUpdate } = location.state;

  const dispatch = useDispatch();
  const [isContactExists, setIsContactExists] = useState(false);
  const contacts = useSelector(getAllContacts);
  const errorMessage = useSelector(getErrorMessage);
  const isLoading = useSelector(getLoading);
  const isAuthLoading = useSelector(authSelectors.getIsAuthLoading);

  const handleSubmit = async contactObj => {
    if (contacts.some(({ name }) => name === contactObj.name)) {
      setIsContactExists(true);
      setTimeout(() => {
        setIsContactExists(false);
      }, 3000);

      return;
    }
    await dispatch(phonebookOperations.updateContact(contactObj));

    setIsContactExists(false);
    returnHandler();
  };

  const returnHandler = async () => {
    await history.push(location?.state?.from || routesData.pathes.contacts);
  };

  return (
    <>
      {isLoading ||
        (isAuthLoading && (
          <Modal>
            <Preloader />
          </Modal>
        ))}
      <Container maxWidth="md">
        <Title title="Edit choosen contact:" />
        <Notification
          notificationInit={isContactExists}
          message="This contact already exists in your phonebook."
        />
        <Notification
          notificationInit={Boolean(errorMessage)}
          message={errorMessage}
        />
        <Formik
          initialValues={{
            name: contactToUpdate.name,
            number: contactToUpdate.number,
          }}
          validationSchema={validationSchema}
          onSubmit={(
            { name, number, id = contactToUpdate.id },
            { resetForm, setSubmitting },
          ) => {
            handleSubmit({ id, name, number });
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form className={styles.contactForm}>
            <Field
              component={TextField}
              type="text"
              name="name"
              label="Name:"
              variant="outlined"
              margin="dense"
            />

            <Field
              component={TextField}
              type="tel"
              name="number"
              label="Number:"
              variant="outlined"
              margin="dense"
            />
            <Box className={styles.btnWrapper}>
              <Link to={routesData.pathes.contacts}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  style={{ marginRight: '10px' }}
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    </>
  );
}
