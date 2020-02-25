import * as Yup from 'yup';

export const StoreSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  avatar_id: Yup.number(),
});

export const UpdateSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  avatar_id: Yup.number(),
});
