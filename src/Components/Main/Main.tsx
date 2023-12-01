import { Link } from 'react-router-dom';
import '../../App.css';
import { useAppSelector } from '../hooks/redux';
import FormInfo from '../UI/FormInfo';

function Main() {
  const { collection } = useAppSelector((state) => state.collectSubmit);
  return (
    <>
      <h1>Main Route </h1>
      <Link to={'/RHF'}>
        <button>to RHF</button>
      </Link>
      <Link to={'/uncontrolled'}>
        <button>to uncontrolled</button>
      </Link>

      {collection &&
        collection.map((form) => <FormInfo form={form} key={form.name} />)}
    </>
  );
}

export default Main;
