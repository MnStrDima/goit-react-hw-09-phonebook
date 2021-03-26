const getIsAuthenticated = state => state.auth.isLoggedIn;

const getEmail = state => state.auth.user.email;

const getUserName = state => state.auth.user.name;

const getToken = state => state.auth.token;

const getIsAuthLoading = state => state.auth.isAuthLoading;

const getErrorMessage = state => state.auth.error;

export default {
  getIsAuthenticated,
  getEmail,
  getUserName,
  getToken,
  getIsAuthLoading,
  getErrorMessage,
};
