import * as Yup from 'yup';

export const StoreSchema = Yup.object().shape({
  recipient_id: Yup.number().required(),
  courier_id: Yup.number().required(),
  product: Yup.string().required(),
});

export const UpdateSchema = Yup.object().shape({
  recipient_id: Yup.number(),
  courier_id: Yup.number(),
  product: Yup.string(),
});
