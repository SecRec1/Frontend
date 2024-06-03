import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from "../style/record-list.scss";

const RecordList = (props) => {
  const specsList = props.data.map((specsItem) => {
    return (
      <div key={specsItem.sn} className="Specs-item-container">
        <div className="text-content">
          <div className="item-card">
            <div className="leftside">
              <img className="qrcode" src={specsItem.qrcode} />
            </div>
            <div className="rightside">
              <div className="top">
                <div className="left">
                  <h4 className="serialnumber ">{specsItem.sn}</h4>
                  <h4 className="name">{specsItem.name}</h4>
                  <h4 className="designator">{specsItem.designator}</h4>
                  <h4 className="subdesignator">{specsItem.subdesignator}</h4>
                </div>
                <div className="right">
                  <h4 className="department">{specsItem.department}</h4>
                  <h4 className="oil">{specsItem.oil}</h4>
                  <h4 className="coolant">{specsItem.coolant}</h4>
                </div>
              </div>
              <div className="bottom">
                <img className="motor plate" src={specsItem.motor} />
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <a
            className="action-icon"
            onClick={() => props.handleEditClick(specsItem)}
          >
            <FontAwesomeIcon icon="edit" />
          </a>

          <a
            className="action-icon"
            onClick={() => props.handleDeleteClick(specsItem)}
          >
            <FontAwesomeIcon icon="trash" />
          </a>
          <Link className="record-link" to={`/Specs/${specsItem.sn}`}>Tasks</Link>
        </div>
      </div>
    );
  });

  return <div className="Specs-list-wrapper">{specsList}</div>;
};

export default RecordList;
