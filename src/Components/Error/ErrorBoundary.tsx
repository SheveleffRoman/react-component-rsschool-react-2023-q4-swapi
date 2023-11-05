import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error?.message === 'API ERROR') {
        return (
          <div className="error-message">
            <h2 className="title">Fetching data error, please reload page</h2>
            <img src="./src/assets/icons8-darth-vader.svg" alt="DarthVader" />
          </div>
        );
      } else {
        return (
          <div className="error-message">
            <h2 className="title">Fake error, please reload page</h2>
            <img src="./src/assets/icons8-darth-vader.svg" alt="DarthVader" />
          </div>
        );
      }
    }

    return this.props.children;
  }
}
