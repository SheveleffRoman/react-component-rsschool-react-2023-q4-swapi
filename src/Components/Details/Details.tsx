import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataService from '../../API/DataService';

interface Resident {
  name: string;
}

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planet, setPlanet] = useState({ name: '', residents: [] });
  const [residentsData, setResidentsData] = useState<Resident[]>([]);
  const [error, setError] = useState('Error');
  const [loading, setLoading] = useState(false);

  const peopleDetails = (id: string) => {
    setLoading(true);
    DataService.getById(id)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setPlanet(data);
        return fetchResidentsData(data.residents);
      })
      .catch((error) => {
        console.error('Произошла ошибка:', error);
      });
  };

  const fetchResidentsData = (residents: string[]) => {
    const residentPromises = residents.map((resident) => {
      return DataService.getResidentsByUrl(resident);
    });

    Promise.all(residentPromises)
      .then((responses) => {
        const residentsInfo = responses.map((response) => response.data);
        setResidentsData(residentsInfo);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching resident data');
        console.error('Error fetching resident data:', error);
        setLoading(false);
      });
    setError('');
  };

  useEffect(() => {
    peopleDetails(id!);
  }, []);

  return (
    <div className="details">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Popular citizens of {planet.name}</h1>
          <ul>
            {residentsData.length === 0 ? (
              <h1>Not found</h1>
            ) : (
              residentsData.map((resident: Resident) => (
                <li key={resident.name}>{resident.name}</li>
              ))
            )}
          </ul>
          <button type="button" onClick={() => navigate('/')}>
            back
          </button>
        </>
      )}
    </div>
  );
};

export default Details;
