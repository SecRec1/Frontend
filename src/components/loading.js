// loading.js
import React from "react";
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "top", height: "100vh" }}>
      <Atom color="#e5de2d" size="medium" />
    </div>
  );
};

export default Loading;
