const apiPath = '/api/v1';

export default {
  mainPage: () => '/',
  logInPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
  logInPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};
