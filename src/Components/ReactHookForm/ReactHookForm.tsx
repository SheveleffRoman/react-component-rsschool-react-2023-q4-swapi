import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormData } from '../../app.interface';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { dataSlice } from '../../store/reducers/dataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertToBase64 } from '../converterBase64';
import { schema } from '../../schema/schema';

function RHF() {
  const { countries } = useAppSelector((state) => state.countrySlice);
  const {} = useAppSelector((state) => state.dataSlice);
  const { setData } = dataSlice.actions;
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

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
    dispatch(
      setData({
        ...data,
        image: imageBase64,
        from: 'react hook form',
      })
    );
    reset();
    navigator('/');
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            {...register('name')}
            type="text"
            placeholder="name"
            autoComplete="name"
          />
          <p>{errors.name?.message}</p>
        </fieldset>

        <fieldset>
          <legend>Age</legend>
          <label htmlFor="age">Age: </label>
          <input id="age" {...register('age')} placeholder="age" />
          <p>{errors.age?.message}</p>
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            {...register('email')}
            placeholder="email@example.com"
            autoComplete="email"
          />
          <p>{errors.email?.message}</p>
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <section>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="password"
            />
            <p>{errors.password?.message}</p>
          </section>

          <section>
            <label htmlFor="confirmPassword">Confirm: </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="confirm password"
            />
            <p>{errors.confirmPassword?.message}</p>
          </section>
        </fieldset>

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
          <label htmlFor="country">Choose country: </label>
          <input
            type="text"
            id="country"
            list="countryList"
            placeholder="type country"
            autoComplete="address"
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
