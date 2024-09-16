import React from "react";

const SubDesOptions = ({ subdesitems = [] }) => {
  return subdesitems.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
};

export default SubDesOptions;