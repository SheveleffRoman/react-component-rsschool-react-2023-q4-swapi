import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../../schema/schema';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { convertToBase64 } from '../converterBase64';
import { dataSlice } from '../../store/reducers/dataSlice';
import { errorSlice } from '../../store/reducers/errorsSlice';
import { ValidationError } from 'yup';

function Uncontrolled() {
  const { countries } = useAppSelector((state) => state.countrySlice);
  const error = useAppSelector((state) => state.errorsSlice);
  const { setData } = dataSlice.actions;
  const { setErrors, clearErrors } = errorSlice.actions;
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputPasswordConfirmationRef = useRef<HTMLInputElement>(null);
  const inputGenderRef = useRef<HTMLInputElement>(null);
  const inputTermsRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputCountryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = inputNameRef.current!.value;
    const age = Number(inputAgeRef.current!.value);
    const email = inputEmailRef.current!.value;
    const password = inputPasswordRef.current!.value;
    const confirmPassword = inputPasswordConfirmationRef.current!.value;
    const gender = inputGenderRef.current!.value;
    const terms = inputTermsRef.current!.checked;
    const image = inputImageRef.current!.files;
    const country = inputCountryRef.current!.value;

    dispatch(clearErrors());

    try {
      await schema.validate(
        {
          name,
          age,
          email,
          password,
          confirmPassword,
          gender,
          terms,
          image,
          country,
        },
        { abortEarly: false }
      );
      const imageBase64 = await convertToBase64(image![0]);
      dispatch(
        setData({
          name,
          age,
          email,
          password,
          confirmPassword,
          gender,
          terms,
          country,
          image: imageBase64,
          from: 'uncontrolled form',
        })
      );
      navigator('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        dispatch(setErrors(error.inner));
      }
    }
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            name="name"
            ref={inputNameRef}
          />
          <p>{error.name ? error.name : ''}</p>
        </fieldset>

        <fieldset>
          <legend>Age</legend>
          <label htmlFor="age">Age: </label>
          <input id="age" placeholder="age" ref={inputAgeRef} />
          <p>{error.age ? error.age : ''}</p>
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            placeholder="email@example.com"
            autoComplete="email"
            ref={inputEmailRef}
          />
          <p>{error.email ? error.email : ''}</p>
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <section>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              ref={inputPasswordRef}
            />
            <p>{error.password ? error.password : ''}</p>
          </section>

          <section>
            <label htmlFor="confirmPassword">Confirm: </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              ref={inputPasswordConfirmationRef}
            />
            <p>{error.confirmPassword ? error.confirmPassword : ''}</p>
          </section>
        </fieldset>

        <fieldset>
          <legend>Select a gender</legend>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              ref={inputGenderRef}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              ref={inputGenderRef}
            />
            <label htmlFor="female">Female</label>
          </div>
          <p>{error.gender ? error.gender : ''}</p>
        </fieldset>

        <fieldset>
          <legend>Terms & Conditions</legend>
          <input type="checkbox" id="terms" ref={inputTermsRef} />
          <label htmlFor="terms">I agree to the Terms & Conditions </label>
          <p>{error.terms ? error.terms : ''}</p>
        </fieldset>

        <fieldset>
          <legend>Load file</legend>
          <input type="file" ref={inputImageRef} />
          <p>{error.image ? error.image : ''}</p>
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
            ref={inputCountryRef}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <p>{error.country ? error.country : ''}</p>
        </fieldset>

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

export default Uncontrolled;
