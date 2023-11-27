import { Link } from 'react-router-dom';
import '../../App.css';

function Main() {
  return (
    <>
      <div>Main Route</div>
      <Link to={'/RHF'}>
        <button>to RHF</button>
      </Link>
      <Link to={'/uncontrolled'}>
        <button>to unconrtolled</button>
      </Link>
    </>
  );
}

export default Main;
