// import React, { Component } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import SpecsDetail from "../detail-page/specs-details";
// import TaskCalculator from "../upcoming-tasks";

// import styles from "../../style/specs-page.scss";

// export default class SpecsPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       specsItem: {},
//       admins: [],
//       loggedin: false,
//     };
    
//     this.getSpecs = this.getSpecs.bind(this);
//     this.getLoggedinStatus = this.getLoggedinStatus.bind(this);
//     this.getAdmins = this.getAdmins.bind(this);
//   }

//   getSpecs() {
//     
//     console.log("Fetching specs with sn:", sn);
//     axios.get(`http://127.0.0.1:8000/Specs/${sn}`).then((response) => {
//       this.setState({
//         specsItem: response.data,
//       });
//     });
//   }
//   async getLoggedinStatus() {
//     const admins = this.state.admins;
//     const loggedInAdmin = admins.find((admin) => admin.loggedin === true);

//     if (loggedInAdmin) {
//       this.setState({ loggedin: true });
//     } else {
//       this.setState({ loggedin: false });
//     }
//   }

//   async getAdmins() {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/Admin`);
//       this.setState({ admins: response.data }, this.getLoggedinStatus);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async componentDidMount() {
//     this.getSpecs();
//     await this.getAdmins();
//   }

//   render() {
//     return (
//       <div className="wrapper">
//         <div className="detail-wrapper">
//           <SpecsDetail
//             loggedin={this.state.loggedin}
//             className="details"
//             specsn={this.props.sn}
//           />
//         </div>
//         <div className="task-wrapper">
//           <TaskCalculator
//             specsItem={this.state.specsItem}
//             specsn={this.props.sn}
//           />
//         </div>
//       </div>
//     );
//   }
// }
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
    axios.get(`http://127.0.0.1:8000/Specs/${sn}`).then((response) => {
      setSpecsItem(response.data);
    });
  };

  const getAdmins = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Admin`);
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
