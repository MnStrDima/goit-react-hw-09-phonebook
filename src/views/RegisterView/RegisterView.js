import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { CSSTransition } from 'react-transition-group';
import { Container, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Notification from '../../components/Notification/Notification';
import Title from '../../components/Title/Title';
import { authOperations, authSelectors } from '../../redux/auth';
import Modal from '../../components/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import styles from './RegisterView.module.css';
import loginAndRegisterViewTransitionStyles from '../../transitionStyles/loginAndRegisterViewTransitionStyles.module.css';

const validationSchema = yup.object({
  name: yup.string().required("Please enter contact's name"),
  email: yup.string().email().required('Please enter email'),
  password: yup
    .string()
    .min(7, 'Must be at least 7 chars')
    .required('Please enter password'),
});

export default function RegisterView() {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(authSelectors.getIsAuthLoading);
  const errorMessage = useSelector(authSelectors.getErrorMessage);
  const handleRegisterClick = contactObj =>
    dispatch(authOperations.register(contactObj));
  return (
    <>
      {isAuthLoading && (
        <Modal>
          <Preloader />
        </Modal>
      )}
      <CSSTransition
        in={true}
        appear
        classNames={loginAndRegisterViewTransitionStyles}
        timeout={300}
        unmountOnExit
      >
        <Container maxWidth="md">
          <Notification
            notificationInit={Boolean(errorMessage)}
            message={errorMessage}
          />
          <Title title="Register form:" />
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(
              { name, email, password },
              { resetForm, setSubmitting },
            ) => {
              handleRegisterClick({ name, email, password });
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
                type="email"
                name="email"
                label="Email:"
                variant="outlined"
                margin="dense"
              />

              <Field
                component={TextField}
                type="text"
                name="password"
                label="Password:"
                variant="outlined"
                margin="dense"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
              >
                Register
              </Button>
            </Form>
          </Formik>
        </Container>
      </CSSTransition>
    </>
  );
}
