import React from 'react';

import './Error.css';

export function Error({ message, status }) {
  return (
    <section className="error">
      <h1 className="error__message">
        Error {status}: {message}
      </h1>
    </section>
  );
}
