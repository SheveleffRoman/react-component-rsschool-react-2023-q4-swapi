import React, { Component } from 'react';

interface CardProps {
  data: {
    name: string;
    climate: string;
  };
}

class Card extends Component<CardProps> {
  render() {
    const { data } = this.props;

    return (
      <div className="card">
        <h2>{data.name}</h2>
        <p>{data.climate}</p>
      </div>
    );
  }
}

export default Card;
