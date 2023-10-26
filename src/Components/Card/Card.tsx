import { Component } from 'react';

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

class Card extends Component<CardProps> {
  render() {
    const { data } = this.props;

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
  }
}

export default Card;
