import YupPassword from 'yup-password';
import * as yup from 'yup';

YupPassword(yup);

export const schema = yup
  .object({
    name: yup
      .string()
      .required()
      .matches(/^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё0-9\s-]*$/, {
        message: 'Invalid name format',
        excludeEmptyString: true,
      })
      .test(
        'startsWithCapital',
        'Name should start with a capital letter',
        (value) => {
          if (value) {
            const firstChar = value.charAt(0);
            return /^[A-ZА-ЯЁ]/.test(firstChar);
          }
          return true;
        }
      ),
    age: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .positive()
      .required(),
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    confirmPassword: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
    terms: yup.boolean().oneOf([true], 'Agree is required').required(),
    image: yup
      .mixed<FileList>()
      .required('File not found')
      .test('fileExists', 'File not found', (files) => {
        return !files || files.length != 0;
      })
      .test('fileFormat', 'Only JPG or PNG files are allowed', (files) => {
        return Array.from(files).every(
          (file) => file.type === 'image/png' || file.type === 'image/jpeg'
        );
      })
      .test('fileSize', 'Only documents up to 2MB are permitted', (files) => {
        return Array.from(files).every((file) => file.size <= 2_000_000);
      }),
    country: yup.string().required(),
  })
  .required();
