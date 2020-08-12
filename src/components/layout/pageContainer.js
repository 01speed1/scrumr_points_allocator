import React from "react";

export default function PageContainer({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2" />
        <div className="col-sm-12 col-lg-8">{children}</div>
        <div className="col-lg-2" />
      </div>
    </div>
  );
}
