import React from 'react';

interface CardProps {
  data: {
    name: string;
    climate: string;
    diameter: string;
    rotation_period: string;
    population: string;
    terrain: string;
    surface_water: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card">
      <h2 className="card-title">{data.name}</h2>
      <p>Climate: {data.climate}</p>
      <p>Diameter: {data.diameter}</p>
      <p>Rotation period: {data.rotation_period}</p>
      <p>Population: {data.population}</p>
      <p>Terrain: {data.terrain}</p>
      <p>Surface water: {data.surface_water}%</p>
    </div>
  );
};

export default Card;
