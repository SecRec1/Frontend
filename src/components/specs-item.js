import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

const SpecsItem = (props) => {
  const {
    SN,
    Name,
    QRCode,
    Designator,
    Subdesignator,
    Oil,
    Coolant,
    Department,
    Motor,
  } = props.SpecsItem;

  return (
    <div>
      <Link to={`/S/${SN}`}>
        <h1>{Name}{SN}{QRCode}</h1>
      </Link>
      <div>
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...<Link to={`/S/${SN}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>
      </div>
    </div>
  );
};

export default SpecsItem;
