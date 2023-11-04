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
  // const [error, setError] = useState('Error');
  const [loading, setLoading] = useState(false);

  const peopleDetails = (id: string) => {
    setLoading(true);
    DataService.getById(id).then((response) => {
      const data = response.data;
      console.log(data);
      setPlanet(data);
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
      .catch((error) => {
        console.error('Error fetching resident data:', error);
        setError('Error fetching resident data');
        setLoading(false);
      });

    setError('');
  };

  useEffect(() => {
    setResidentsData([]);
    peopleDetails(id!);
  }, []);

  useEffect(() => {
    if (planet.residents.length > 0) {
      fetchResidentsData(planet.residents);
    }
  }, [planet.residents]);
  return (
    <div className="details">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Popular citizens of {planet.name}</h1>
          {residentsData.length === 0 ? (
            <h1>Not found</h1>
          ) : (
            <>
              <ul>
                {residentsData.map((resident: Resident) => (
                  <li key={resident.name}>{resident.name}</li>
                ))}
              </ul>
              <button type="button" onClick={() => navigate('/')}>
                back
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Details;
