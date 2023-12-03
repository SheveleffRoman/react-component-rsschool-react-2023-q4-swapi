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
    <div className="wrapper">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            {...register('name')}
            type="text"
            placeholder="name"
            autoComplete="off"
            className={`${errors.name ? 'error' : ''}`}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="age">Age: </label>
          <input
            autoComplete="off"
            id="age"
            {...register('age')}
            placeholder="age"
            className={`${errors.age ? 'error' : ''}`}
          />
          {errors.age && <p>{errors.age?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            {...register('email')}
            placeholder="email@example.com"
            autoComplete="off"
            className={`${errors.email ? 'error' : ''}`}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="password"
            className={`${errors.password ? 'error' : ''}`}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="confirmPassword">Confirm: </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="confirm password"
            className={`${errors.confirmPassword ? 'error' : ''}`}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="country">Choose country: </label>
          <input
            type="text"
            id="country"
            list="countryList"
            placeholder="type country"
            autoComplete="address"
            {...register('country')}
            className={`${errors.country ? 'error' : ''}`}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p>{errors.country?.message}</p>}
        </div>

        <div className="input-gender">
          <div className="centred-radio">
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
          </div>
          {errors.gender && <p>{errors.gender?.message}</p>}
        </div>

        <div className="input-checkbox">
          <input type="checkbox" id="terms" {...register('terms')} />
          <label htmlFor="terms">I agree to the Terms & Conditions </label>
          {errors.terms && <p>{errors.terms?.message}</p>}
        </div>

        <div className="input-file">
          <input type="file" {...register('image')} />
          {errors.image && <p>{errors.image?.message}</p>}
        </div>

        <div>
          {' '}
          <button type="submit">Send form</button>
        </div>
      </form>
      <Link to={'/'}>
        <button>Main page</button>
      </Link>
    </div>
  );
}

export default RHF;
