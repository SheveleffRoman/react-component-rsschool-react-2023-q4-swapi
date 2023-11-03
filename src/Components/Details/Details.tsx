import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataService from '../../API/DataService';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planet, setPlanet] = useState({ name: '', residents: [] });
  const [residentsData, setResidentsData] = useState([]);
  const [error, setError] = useState('Error');

  const peopleDetails = (id: string) => {
    DataService.getById(id).then((response) => {
      const data = response.data;
      console.log(data);
      setPlanet(data);
    });
  };

  const fetchResidentsData = (residents) => {
    const residentPromises = residents.map((resident) => {
      return DataService.getResidentsByUrl(resident);
    });

    Promise.all(residentPromises)
      .then((responses) => {
        const residentsInfo = responses.map((response) => response.data);
        setResidentsData(residentsInfo);
      })
      .catch((error) => {
        console.error('Error fetching resident data:', error);
        setError('Error fetching resident data');
      });

    setError('');
  };

  useEffect(() => {
    setResidentsData([]);
    peopleDetails(id!);
  }, [id]);

  useEffect(() => {
    if (planet.residents.length > 0) {
      fetchResidentsData(planet.residents);
    }
  }, [planet.residents]);
  return (
    <div className="details">
      <h1>Popular citizens of {planet.name}</h1>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <ul>
          {residentsData.map((resident) => (
            <li key={resident.name}>{resident.name}</li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => navigate('/')}>
        back
      </button>
    </div>
  );
};

export default Details;
