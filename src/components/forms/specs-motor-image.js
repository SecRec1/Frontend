import React from "react";

const SpecsMotorImage = props => {
  if (!props.motor) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={props.motor} />
    </div>
  );
};

export default SpecsMotorImage;