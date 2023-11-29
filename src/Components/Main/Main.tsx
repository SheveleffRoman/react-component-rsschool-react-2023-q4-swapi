import { Link } from 'react-router-dom';
import '../../App.css';

function Main() {
  return (
    <>
      <h1>Main Route </h1>
      <Link to={'/RHF'}>
        <button>to RHF</button>
      </Link>
      <Link to={'/uncontrolled'}>
        <button>to uncontrolled</button>
      </Link>
    </>
  );
}

export default Main;
