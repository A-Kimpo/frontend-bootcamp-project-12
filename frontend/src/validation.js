import { object, string, ref } from 'yup';

export const getLogInSchema = () => object({
  username: string().required(),
  password: string().required(),
});

export const getSignUpSchema = () => object({
  username: string()
    .trim()
    .required('errors.required')
    .min(3, 'errors.length')
    .max(20, 'errors.length'),
  password: string()
    .required('errors.required')
    .min(6, 'errors.minLength'),
  confirmPassword: string()
    .required('errors.required')
    .oneOf([ref('password')], 'errors.diffPasswords'),
});

export const getModalSchema = (existingNames) => object({
  channelNewName: string()
    .min(3, 'errors.length')
    .max(20, 'errors.length')
    .notOneOf(existingNames, 'errors.existChannel'),
});
