import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  errorRemover,
} from './phoneBook-actions';

const resetError = dispatch =>
  setTimeout(() => dispatch(errorRemover(null)), 3000);

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    return dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
    resetError(dispatch);
  }
};

const addContact = contactObj => async dispatch => {
  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contactObj);
    return dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error.message));
    resetError(dispatch);
  }
};

const updateContact = contactObj => async dispatch => {
  dispatch(updateContactRequest());
  const { id, name, number } = contactObj;
  try {
    const { data } = await axios.patch(`/contacts/${id}`, { name, number });
    return dispatch(updateContactSuccess(data));
  } catch (error) {
    dispatch(updateContactError(error.message));
    resetError(dispatch);
  }
};

const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);
    return dispatch(deleteContactSuccess(contactId));
  } catch (error) {
    dispatch(deleteContactError(error.message));
    resetError(dispatch);
  }
};

export default { addContact, updateContact, deleteContact, fetchContacts };
