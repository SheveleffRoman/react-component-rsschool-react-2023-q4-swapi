import { Link } from 'react-router-dom';

function Uncontrolled() {
  return (
    <>
      <div>Uncontrolled Route</div>
      <Link to={'/'}>
        <button>to main</button>
      </Link>
    </>
  );
}

export default Uncontrolled;
