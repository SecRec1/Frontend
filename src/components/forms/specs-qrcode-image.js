import React from "react";

const SpecsQRCodeImage = props => {
  if (!props.qrcode) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={props.qrcode} />
    </div>
  );
};

export default SpecsQRCodeImage;