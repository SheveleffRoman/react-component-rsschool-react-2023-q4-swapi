import { Link } from 'react-router-dom';

function RHF() {
  return (
    <>
      <div>RHF Route</div>
      <Link to={'/'}>
        <button>to main</button>
      </Link>
    </>
  );
}

export default RHF;
