import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-message">
      <h2 className="title">Sorry, an unexpected error has occurred</h2>
      <img src="./src/assets/icons8-darth-vader.svg" alt="DarthVader" />{' '}
    </div>
  );
}
