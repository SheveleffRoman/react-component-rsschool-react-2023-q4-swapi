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
  const inputMaleRef = useRef<HTMLInputElement>(null);
  const inputFemaleRef = useRef<HTMLInputElement>(null);
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
    const terms = inputTermsRef.current!.checked;
    const image = inputImageRef.current!.files;
    const country = inputCountryRef.current!.value;
    const genderMale = inputMaleRef.current!;
    const genderFemale = inputFemaleRef.current!;
    let gender = '';

    if (!genderMale.checked && !genderFemale.checked) {
      gender = '';
    } else if (genderMale.checked) {
      gender = genderMale.value;
    } else {
      gender = genderFemale.value;
    }

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
    <div className="wrapper">
      <h1>Uncontrolled Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            name="name"
            ref={inputNameRef}
            className={`${error.name ? 'error' : ''}`}
          />
          {error.name && <p>{error.name ? error.name : ''}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="age">Age: </label>
          <input
            id="age"
            placeholder="age"
            ref={inputAgeRef}
            className={`${error.age ? 'error' : ''}`}
          />
          {error.age && <p>{error.age ? error.age : ''}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            placeholder="email@example.com"
            autoComplete="email"
            ref={inputEmailRef}
            className={`${error.email ? 'error' : ''}`}
          />
          {error.email && <p>{error.email ? error.email : ''}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={inputPasswordRef}
            className={`${error.password ? 'error' : ''}`}
          />
          {error.password && <p>{error.password ? error.password : ''}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="confirmPassword">Confirm: </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="confirm password"
            ref={inputPasswordConfirmationRef}
            className={`${error.confirmPassword ? 'error' : ''}`}
          />
          {error.confirmPassword && (
            <p>{error.confirmPassword ? error.confirmPassword : ''}</p>
          )}
        </div>

        <div className="input-box">
          <label htmlFor="country">Choose country: </label>
          <input
            type="text"
            id="country"
            list="countryList"
            placeholder="type country"
            autoComplete="address"
            ref={inputCountryRef}
            className={`${error.country ? 'error' : ''}`}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {error.country && <p>{error.country ? error.country : ''}</p>}
        </div>

        <div className="input-gender">
          <div className="centred-radio">
            <div>
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                ref={inputMaleRef}
              />
              <label htmlFor="male">Male</label>
            </div>

            <div>
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                ref={inputFemaleRef}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {error.gender && <p>{error.gender ? error.gender : ''}</p>}
        </div>

        <div className="input-checkbox">
          <input type="checkbox" id="terms" ref={inputTermsRef} />
          <label htmlFor="terms">I agree to the Terms & Conditions </label>
          {error.terms && <p>{error.terms ? error.terms : ''}</p>}
        </div>

        <div className="input-file">
          <legend>Load file</legend>
          <input type="file" ref={inputImageRef} />
          {error.image && <p>{error.image ? error.image : ''}</p>}
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

export default Uncontrolled;
