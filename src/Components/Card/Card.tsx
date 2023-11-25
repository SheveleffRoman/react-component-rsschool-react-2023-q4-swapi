import Link from 'next/link';
import { useDetails } from '../hooks/details';
import { useAppSelector } from '../hooks/redux';

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
  const { isDetailsOpen } = useAppSelector((state) => state.detailsSlice);

  return (
    <Link
      href={`/details/${lastPart}`}
      className={`${isDetailsOpen ? 'card-disabled' : ''}`}
    >
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
