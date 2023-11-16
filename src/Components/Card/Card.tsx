import { Link } from 'react-router-dom';
import { useDetails } from '../hooks/details';

interface CardProps {
  data: {
    name: string;
    climate: string;
    diameter: string;
    rotation_period: string;
    population: string;
    terrain: string;
    surface_water: string;
    url: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const parts = data.url.split('/');
  const lastPart = parts[parts.length - 2];

  const { open } = useDetails();

  return (
    <Link to={`details/${lastPart}`}>
      <div className="card" role="planet-card" onClick={open}>
        <h2 className="card-title">{data.name}</h2>
        <p>Climate: {data.climate}</p>
        <p>Diameter: {data.diameter}</p>
        <p>Rotation period: {data.rotation_period}</p>
        <p>Population: {data.population}</p>
        <p>Terrain: {data.terrain}</p>
        <p>Surface water: {data.surface_water}%</p>
      </div>
    </Link>
  );
};

export default Card;
