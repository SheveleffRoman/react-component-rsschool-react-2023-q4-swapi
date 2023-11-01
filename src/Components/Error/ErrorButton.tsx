import { useState } from 'react';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Fake error');
  }

  return <button onClick={handleClick}>Fake error</button>;
};

export default ErrorButton;
