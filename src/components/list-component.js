import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Styles from "../style/record-list.scss";

const RecordList = (props) => {
  const specsList = props.data.map((specsItem) => {
    return (
      <div key={specsItem.sn} className="Specs-item-container">
        <div className="text-content">
          <div className="item-card">
            <div className="leftside">
              <div className="top">
                <img className="qrcode" src={specsItem.qrcode} />
              </div>

              <div className="bottom">
                <img className="motor plate" src={specsItem.motor} />
              </div>
            </div>

            <div className="rightside">
              <div className="left">
                <h4 className="serialnumber item">{specsItem.sn}</h4>
                <h4 className="name item">{specsItem.name}</h4>
                <h4 className="designator item">{specsItem.designator}</h4>
                <h4 className="subdesignator item">
                  {specsItem.subdesignator}
                </h4>
              </div>
              <div className="right">
                <h4 className="department item">{specsItem.department}</h4>
                <h4 className="oil item">{specsItem.oil}</h4>
                <h4 className="coolant item">{specsItem.coolant}</h4>
                <h4 className="hours item">Machine Hours:{specsItem.hours}</h4>
              </div>
            </div>
          </div>
        </div>
        
        <div className="actions">
          <a
            className="action-icon"
            onClick={() => props.handleDeleteClick(specsItem)}
          >
            <FontAwesomeIcon icon="trash" />
          </a>
          <Link className="record-link" to={`/Specs/${specsItem.sn}`}>
            Detail Page
          </Link>
        </div>
      </div>
    );
  });

  return <div className="Specs-list-wrapper">{specsList}</div>;
};

export default RecordList;
