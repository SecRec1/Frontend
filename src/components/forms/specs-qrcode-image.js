import React from "react";

const SpecsQRCodeImage = props => {
  if (!props.QRCode) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={props.QRCode} />
    </div>
  );
};

export default SpecsQRCodeImage;