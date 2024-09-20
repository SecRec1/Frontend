import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SpecsDetail from "../detail-page/specs-details";
import TaskCalculator from "../upcoming-tasks";
import styles from "../../style/specs-page.scss"; // Import your styles if needed

const SpecsPage = () => {
  const { sn } = useParams(); // for React Router v6
  const [specsItem, setSpecsItem] = useState({});
  const [admins, setAdmins] = useState([]);
  const [loggedin, setLoggedin] = useState(false);

  const getSpecs = () => {
    axios.get(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Specs/${sn}`).then((response) => {
      setSpecsItem(response.data);
    });
  };

  const getAdmins = async () => {
    try {
      const response = await axios.get(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Admin`);
      setAdmins(response.data);
      getLoggedinStatus(response.data); // Pass the response data to check the logged in status
    } catch (error) {
      console.error(error);
    }
  };

  const getLoggedinStatus = (adminData) => {
    const loggedInAdmin = adminData.find((admin) => admin.loggedin === true);
    setLoggedin(!!loggedInAdmin);
  };

  useEffect(() => {
    getSpecs();
    getAdmins();
  }, [sn]); // Dependency array includes sn to re-fetch data if sn changes

  return (
    <div className="wrapper">
      <div className="detail-wrapper">
        <SpecsDetail
          loggedin={loggedin}
          className="details"
          specsn={sn} // for React Router v6
        />
      </div>
      <div className="task-wrapper">
        <TaskCalculator specsItem={specsItem} specsn={sn} />
      </div>
    </div>
  );
};

export default SpecsPage;
