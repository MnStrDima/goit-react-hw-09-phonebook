import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import styles from './ContactForm.module.css';
import Notification from '../Notification/Notification';
import {
  getAllContacts,
  getErrorMessage,
} from '../../redux/phoneBook/phoneBook-selectors';

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0930939393')
    .required("Enter contact's phone"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const [isContactExists, setIsContactExists] = useState(false);
  const contacts = useSelector(getAllContacts);
  const errorMessage = useSelector(getErrorMessage);

  const handleSubmit = contactObj => {
    if (contacts.some(({ name }) => name === contactObj.name)) {
      setIsContactExists(true);
      setTimeout(() => {
        setIsContactExists(false);
      }, 3000);

      return;
    }
    dispatch(phonebookOperations.addContact(contactObj));

    return setIsContactExists(false);
  };
  return (
    <>
      <Notification
        notificationInit={isContactExists}
        message="This contact already exists in your phonebook."
      />
      <Notification
        notificationInit={Boolean(errorMessage)}
        message={errorMessage}
      />
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={({ name, number }, { resetForm, setSubmitting }) => {
          handleSubmit({ name, number });
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Add new contact
          </Button>
        </Form>
      </Formik>
    </>
  );
}
