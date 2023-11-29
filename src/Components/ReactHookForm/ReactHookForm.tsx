import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormData } from '../../app.interface';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { dataSlice } from '../../store/reducers/dataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    password: yup
      .string()
      .required('Password is required')
      .test('password-strength', ' Week password', (value) => {
        if (!value) {
          return false;
        }

        const hasNumber = /\d/.test(value);

        const hasUppercase = /[A-Z]/.test(value);

        const hasLowercase = /[a-z]/.test(value);

        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

        return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
      }),
  })
  .required();

function RHF() {
  const {} = useAppSelector((state) => state.dataSlice);
  const { transferData } = dataSlice.actions;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(transferData(data));
    console.log(data);
    reset();
  };

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     console.log(value, name, type);
  //     dispatch(transferData(value.name!));
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

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
        <input type="" {...register('password')} />
        <p>{errors.password?.message}</p>
        <div>
          {' '}
          <button type="submit">Send form</button>
        </div>
      </form>

      <Link to={'/'}>
        <button>to main</button>
      </Link>
    </>
  );
}

export default RHF;
