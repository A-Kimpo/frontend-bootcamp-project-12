const apiPath = '/api/v1';

export default {
  logInPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
  mainPage: () => '/',
  logInPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};
