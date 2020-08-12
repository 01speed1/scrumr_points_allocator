import React from "react";

const ErrorBLock = ({ error }) => (
  <span className="nes-text is-error">
    {error && <strong>Error: {JSON.stringify(error)}</strong>}
  </span>
);

export default ErrorBLock;
