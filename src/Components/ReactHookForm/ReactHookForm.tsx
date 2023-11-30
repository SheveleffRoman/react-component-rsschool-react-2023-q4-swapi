import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormData } from '../../app.interface';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { dataSlice } from '../../store/reducers/dataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { convertToBase64 } from '../converterBase64';

YupPassword(yup);

const schema = yup
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
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password confirmation is required'),
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
          (file) =>
            file.name.toLowerCase().endsWith('.jpg') ||
            file.name.toLowerCase().endsWith('.png')
        );
      })
      .test('fileSize', 'Only documents up to 2MB are permitted', (files) => {
        return Array.from(files).every((file) => file.size <= 2_000_000);
      }),
    country: yup.string().required(),
  })
  .required();

function RHF() {
  const { countries } = useAppSelector((state) => state.countrySlice);
  const {} = useAppSelector((state) => state.dataSlice);
  const { setData } = dataSlice.actions;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const imageBase64 = await convertToBase64(data.image[0]);
    console.log(imageBase64);
    dispatch(
      setData({
        ...data,
        image: imageBase64,
      })
    );
    console.log(data);
    reset();
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} type="text" placeholder="name" />
        <p>{errors.name?.message}</p>
        <input {...register('age')} placeholder="age" />
        <p>{errors.age?.message}</p>
        <input {...register('email')} placeholder="email@example.com" />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          {...register('password')}
          placeholder="password"
        />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="confirm password"
        />
        <p>{errors.confirmPassword?.message}</p>
        <fieldset>
          <legend>Select a gender</legend>

          <div>
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="female">Female</label>
          </div>
          <p>{errors.gender?.message}</p>
        </fieldset>
        <fieldset>
          <legend>Terms & Conditions</legend>
          <input type="checkbox" id="terms" {...register('terms')} />
          <label htmlFor="terms">I agree to the Terms & Conditions </label>
          <p>{errors.terms?.message}</p>
        </fieldset>
        <fieldset>
          <legend>Load file</legend>
          <input type="file" {...register('image')} />
          <p>{errors.image?.message}</p>
        </fieldset>
        <fieldset>
          <legend>Select country</legend>
          {/* <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            list="countries"
            {...register('country')}
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist> */}
          <label htmlFor="country">Выберите страну:</label>
          <input
            type="text"
            id="country"
            list="countryList"
            placeholder="Выберите страну..."
            {...register('country')}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <p>{errors.country?.message}</p>
        </fieldset>
        <div>
          {' '}
          <button type="submit">Send form</button>
        </div>
      </form>
      <button
        onClick={() => {
          setValue('name', 'Roman');
          setValue('age', 26);
          setValue('email', 'roman@yandex.ru');
          setValue('gender', 'male');
          setValue('terms', true);
          setValue('password', 'Romanik16)');
          setValue('confirmPassword', 'Romanik16)');
        }}
      >
        Fill data
      </button>

      <Link to={'/'}>
        <button>to main</button>
      </Link>
    </>
  );
}

export default RHF;
