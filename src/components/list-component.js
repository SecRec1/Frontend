import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import specsItem from "./specs-item";

const RecordList = (props) => {
  const specsList = props.data.map((specsItem) => {
    return (
      <div key={specsItem.sn} classname="Specsitem Card">
        <h1>{specsItem.name}</h1>
      </div>
    );
  });
  return <div>{specsList}</div>;
};

export default RecordList;
