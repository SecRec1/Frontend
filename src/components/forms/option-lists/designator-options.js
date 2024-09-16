import React from "react";

const DesignatorOptions = ({ desitems = [] }) => {
  return desitems.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
};

export default DesignatorOptions;
