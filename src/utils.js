
import * as yup from 'yup';

export const validationSchema = yup.object({
  companyName: yup.mixed().required('Company name field is required.'),
  streetAddress: yup.mixed().required('Street address field is required.'),
  streetAddress1: yup.mixed().required('Street address one field is required.'),
  postalCode: yup.mixed().required('Postal Code field is required.'),
  city: yup.mixed().required('City field is required.'),
  state: yup.mixed().required('State field is required.'),
  country: yup.mixed().required('Country field is required.'),
  vatNo: yup.mixed().required('Vat Number field is required.'),
});

export const deliveryFormValidationSchema = yup.object({
  supplierCompanyName: yup.mixed().required('Supplier name field is required.'),
  loadedQuantity: yup.mixed().required('Total Quantity field is required.'),
  certNumberOfSeller: yup.mixed().required('Certificate number field is required.'),
  feedBackStockType: yup.mixed().required('Select one option'),
}); 

export const isNumber = (inputVal) => {
  const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  return regex.test(inputVal.toString());
}