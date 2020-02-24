import * as Yup from 'yup';

export const StoreSchema = Yup.object().shape({
  name: Yup.string().required(),
  address_street: Yup.string().required(),
  address_number: Yup.number().required(),
  address_complement: Yup.string(),
  address_state: Yup.string().required(),
  address_city: Yup.string().required(),
  address_zipcode: Yup.string().required(),
});

export const UpdateSchema = Yup.object().shape({
  name: Yup.string(),
  address_street: Yup.string(),
  address_number: Yup.number(),
  address_complement: Yup.string(),
  address_state: Yup.string(),
  address_city: Yup.string(),
  address_zipcode: Yup.string(),
});
