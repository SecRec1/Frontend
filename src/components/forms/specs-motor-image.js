import React from "react";

const SpecsMotorImage = props => {
  if (!props.Motor) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={props.Motor} />
    </div>
  );
};

export default SpecsMotorImage;