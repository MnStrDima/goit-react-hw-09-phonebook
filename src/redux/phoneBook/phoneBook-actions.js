import { createAction } from '@reduxjs/toolkit';
import types from './phoneBook-constants';

export const fetchContactsRequest = createAction(types.fetchRequest);
export const fetchContactsSuccess = createAction(types.fetchSuccess);
export const fetchContactsError = createAction(types.fetchError);

export const addContactRequest = createAction(types.addRequest);
export const addContactSuccess = createAction(types.addSuccess);
export const addContactError = createAction(types.addError);

export const updateContactRequest = createAction(types.updateRequest);
export const updateContactSuccess = createAction(types.updateSuccess);
export const updateContactError = createAction(types.updateError);

export const deleteContactRequest = createAction(types.deleteRequest);
export const deleteContactSuccess = createAction(types.deleteSuccess);
export const deleteContactError = createAction(types.deleteError);

export const changeFilter = createAction(types.changeFilter);
export const errorRemover = createAction(types.errorRemove);
