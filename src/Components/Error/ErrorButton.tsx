import { Component } from 'react';

export default class ErrorButton extends Component {
  state = { hasError: false };

  handlerClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      throw new Error('Fake error');
    }

    return <button onClick={this.handlerClick}>Fake error</button>;
  }
}
