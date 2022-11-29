import * as Yup from 'yup';

export interface IYourDetails {
  firstName?: string;
  surname?: string;
  email?: string;
}

export const yourDetailsSchema: Yup.SchemaOf<IYourDetails> = Yup.object().shape(
  {
    firstName: Yup.string()
      .required('Required')
      .trim()
      .min(2, 'First name should contain atleast 2 characters.')
      .max(30, 'First name should contain less than 30 characters.'),
    surname: Yup.string()
      .required('Required')
      .trim()
      .min(2, 'Surname should contain atleast 2 characters.')
      .max(30, 'Surname should contain less than 30 characters.'),
    email: Yup.string()
      .email('Incorect email. Please try again!')
      .required('Required'),
  }
);

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  None = 'None',
}

export interface IMoreComments {
  telephoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const moreComentsSchema: Yup.SchemaOf<IMoreComments> =
  Yup.object().shape({
    telephoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(),
    gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
    dateOfBirth: Yup.string().required().trim(),
  });

export interface IFinalComments {
  comments: string;
}

export const finalCommentsSchema: Yup.SchemaOf<IFinalComments> =
  Yup.object().shape({
    comments: Yup.string().required(),
  });
