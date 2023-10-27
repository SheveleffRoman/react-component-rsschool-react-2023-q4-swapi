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
      return (
        <h2 className="title">
          Error has occurred, please reload the page.
        </h2>
      );
    }

    return this.props.children;
  }
}
