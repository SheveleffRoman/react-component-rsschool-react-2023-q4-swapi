import { useNavigate, useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <h1>Details {id} works</h1>
      <button type="button" onClick={() => navigate(-1)}>
        back
      </button>
    </>
  );
};

export default Details;
