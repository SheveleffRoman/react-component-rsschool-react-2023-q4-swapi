import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../../schema/schema';
import { useAppSelector } from '../hooks/redux';

function Uncontrolled() {
  const { countries } = useAppSelector((state) => state.countrySlice);
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
    const name = inputNameRef.current?.value;
    const age = inputAgeRef.current?.value;
    const email = inputEmailRef.current?.value;
    const password = inputPasswordRef.current?.value;
    const confirmPassword = inputPasswordConfirmationRef.current?.value;
    const gender = inputGenderRef.current?.value;
    const terms = inputTermsRef.current?.checked;
    const image = inputImageRef.current?.files;
    const country = inputCountryRef.current?.value;

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
      navigator('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Uncontrolled Route</h1>
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
            defaultValue={'Roman'}
          />
          {/* <p>{errors.name?.message}</p> */}
        </fieldset>

        <fieldset>
          <legend>Age</legend>
          <label htmlFor="age">Age: </label>
          <input
            id="age"
            placeholder="age"
            ref={inputAgeRef}
            defaultValue={25}
          />
          {/* <p>{errors.age?.message}</p> */}
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
            defaultValue={'Roman@yandex.com'}
          />
          {/* <p>{errors.email?.message}</p> */}
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <section>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="text"
              placeholder="password"
              ref={inputPasswordRef}
              defaultValue={'Romanik16)'}
            />
            {/* <p>{errors.password?.message}</p> */}
          </section>

          <section>
            <label htmlFor="confirmPassword">Confirm: </label>
            <input
              id="confirmPassword"
              type="text"
              placeholder="confirm password"
              ref={inputPasswordConfirmationRef}
              defaultValue={'Romanik16)'}
            />
            {/* <p>{errors.confirmPassword?.message}</p> */}
          </section>
        </fieldset>

        <fieldset>
          <legend>Select a gender</legend>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              ref={inputGenderRef}
              defaultChecked
            />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input
              type="radio"
              id="female"
              value="female"
              ref={inputGenderRef}
            />
            <label htmlFor="female">Female</label>
          </div>
          {/* <p>{errors.gender?.message}</p> */}
        </fieldset>

        <fieldset>
          <legend>Terms & Conditions</legend>
          <input
            type="checkbox"
            id="terms"
            ref={inputTermsRef}
            defaultChecked
          />
          <label htmlFor="terms">I agree to the Terms & Conditions </label>
          {/* <p>{errors.terms?.message}</p> */}
        </fieldset>

        <fieldset>
          <legend>Load file</legend>
          <input type="file" ref={inputImageRef} />
          {/* <p>{errors.image?.message}</p> */}
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
            defaultValue={'Russia'}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {/* <p>{errors.country?.message}</p> */}
        </fieldset>

        {/* 

        

       

        

        

        */}
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
