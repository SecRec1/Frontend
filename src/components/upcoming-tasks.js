// import React, { Component } from "react";
// import axios from "axios";
// import { DateTime } from "luxon";
// import lodash from "lodash";

// import TaskManager from "./task-container";

// export default class TaskCalculator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       taskrecords: [],
//       taskids: [],
//       taskinfo: [],
//       tasksnfiltered: [],
//       specssn: {},
//       upcoming: [],
//       due: [],
//       overdue: [],
//       finalupcoming: [],
//       finaldue: [],
//       finaloverdue: [],
//       uptaskentries: [],
//       duetaskentries: [],
//       overduetaskentries: [],
//       odentries: [],
//       hourtasks: [],
//       datetasks: [],
//     };

//     this.getIBSTs = this.getIBSTs.bind(this);
//     this.getSpecsSN = this.getSpecsSN.bind(this);
//     this.filterByDate = this.filterByDate.bind(this);
//     this.getUpTaskInfo = this.getUpTaskInfo.bind(this);
//     this.filterByHours = this.filterByHours.bind(this);
//     this.getDueTaskInfo = this.getDueTaskInfo.bind(this);
//     this.getOverTaskInfo = this.getOverTaskInfo.bind(this);
//     this.combineUpTaskInfo = this.combineUpTaskInfo.bind(this);
//     this.combineDueTaskInfo = this.combineDueTaskInfo.bind(this);
//     this.combineOverTaskInfo = this.combineOverTaskInfo.bind(this);
//     this.checkLastCompleted = this.checkLastCompleted.bind(this);
//   }
//   getSpecsSN() {
//     this.setState({ specssn: this.props.specsn });
//   }

//   getIBSTs() {
//     axios.get(`https://backend-1-jevl.onrender.com:/IBST`).then((response) => {
//       this.setState({
//         taskrecords: [...response.data],
//       });
//       const taskrecords = this.state.taskrecords;
//       const filteredrecords = taskrecords.filter(
//         (record) => record.specs_sn === this.state.specssn
//       );

//       this.setState({
//         tasksnfiltered: [...filteredrecords],
//       });
//       this.checkLastCompleted();
//       this.getUpTaskInfo();
//       this.getDueTaskInfo();
//       this.getOverTaskInfo();
//     });
//   }
//   checkLastCompleted() {
//     const tasksnfiltered = this.state.tasksnfiltered;
//     const tasktimefiltered = tasksnfiltered.forEach((record) => {
//       if (
//         record.lastcompleted.includes("-") ||
//         record.lastcompleted.includes("/")
//       ) {
//         this.setState({ datetasks: [record].concat(this.state.datetasks) });
//       } else {
//         this.setState({ hourtasks: [record].concat(this.state.hourtasks) });
//       }
//     });
//     this.filterByDate();
//     this.filterByHours();
//   }

//   filterByHours() {
//     const { hourtasks } = this.state;
//     const currenthours = this.props.specsItem.hours;

//     // Filtering upcoming tasks
//     const upcoming = hourtasks.filter((record) => {
//       const remainingHours = parseInt(record.nextdue, 10) - currenthours;
//       return remainingHours < 80 && remainingHours > 40;
//     });

//     // Filtering due tasks
//     const due = hourtasks.filter((record) => {
//       const remainingHours = parseInt(record.nextdue, 10) - currenthours;
//       return remainingHours < 40 && remainingHours > 0;
//     });

//     // Filtering overdue tasks
//     const overdue = hourtasks.filter((record) => {
//       const remainingHours = parseInt(record.nextdue, 10) - currenthours;
//       return remainingHours < 1;
//     });

//     // Updating state with the filtered tasks
//     this.setState({
//       upcoming: [...upcoming].concat(this.state.upcoming),
//       due: [...due].concat(this.state.due),
//       overdue: [...overdue].concat(this.state.overdue),
//     });
//   }

  // filterByDate() {
  //   const Today = DateTime.now();
  //   const thirtyday = Today + 2592000000;
  //   const sevenday = Today + 60400;
  //   const oneday = Today + 86400000;
  //   const machinerecords = this.state.datetasks;

  //   //checking for records between 8 and 30 days

  //   const upcoming = machinerecords.filter(
  //     (record) =>
  //       DateTime.fromISO(record.nextdue) <= thirtyday &&
  //       DateTime.fromISO(record.nextdue) >= sevenday
  //   );

  //   {
  //     this.setState({ upcoming: [...upcoming] });
  //   }

  //   //checking for records between 1 and 7 days
  //   const due = machinerecords.filter(
  //     (record) =>
  //       DateTime.fromISO(record.nextdue) <= sevenday &&
  //       DateTime.fromISO(record.nextdue) >= oneday
  //   );

  //   {
  //     this.setState({ due: [...due] });
  //   }
  //   //checking if record is past its due date
  //   const overdue = machinerecords.filter(
  //     (record) => DateTime.fromISO(record.nextdue) <= oneday
  //   );
  //   {
  //     this.setState({ overdue: [...overdue] });
  //   }
  // }

//   getUpTaskInfo() {
//     const uptaskid = this.state.upcoming.map((record) => {
//       return record.task_id;
//     });
//     const uptaskrec = uptaskid.forEach((record) => {
//       axios.get(`https://backend-1-jevl.onrender.com:/Task/${record}`).then((response) => {
//         this.setState(
//           {
//             finalupcoming: [response.data].concat(this.state.finalupcoming),
//           },
//           () => {
//             this.combineUpTaskInfo();
//           }
//         );
//       });
//     });
//   }
  // getDueTaskInfo() {
  //   const duetaskid = this.state.due.map((record) => {
  //     return record.task_id;
  //   });
  //   const duetaskrec = duetaskid.forEach((record) => {
  //     axios.get(`https://backend-1-jevl.onrender.com:/Task/${record}`).then((response) => {
  //       this.setState(
  //         {
  //           finaldue: [response.data].concat(this.state.finaldue),
  //         },
  //         () => {
  //           this.combineDueTaskInfo();
  //         }
  //       );
  //     });
  //   });
  // }
//   getOverTaskInfo() {
//     const odtaskid = this.state.overdue.map((record) => {
//       return record.task_id;
//     });
//     const odtaskrec = odtaskid.forEach((record) => {
//       axios.get(`https://backend-1-jevl.onrender.com:/Task/${record}`).then((response) => {
//         this.setState(
//           {
//             finaloverdue: [response.data].concat(this.state.finaloverdue),
//           },
//           () => {
//             this.combineOverTaskInfo();
//           }
//         );
//       });
//     });
//   }

//   combineUpTaskInfo() {
//     const settaskid = _.keyBy(this.state.upcoming, "task_id");
//     const setIBSTid = _.keyBy(this.state.finalupcoming, "id");
//     const combineentries = _.merge(settaskid, setIBSTid);
//     this.setState({
//       uptaskentries: combineentries,
//     });
//   }
//   combineDueTaskInfo() {
//     const settaskid = _.keyBy(this.state.due, "task_id");
//     const setIBSTid = _.keyBy(this.state.finaldue, "id");
//     const combineentries = _.merge(settaskid, setIBSTid);
//     this.setState({
//       duetaskentries: combineentries,
//     });
//   }
//   combineOverTaskInfo() {
//     const settaskid = _.keyBy(this.state.overdue, "task_id");
//     const setIBSTid = _.keyBy(this.state.finaloverdue, "id");
//     const combineentries = _.merge(settaskid, setIBSTid);

//     this.setState({
//       overduetaskentries: combineentries,
//     });
//   }

//   componentDidMount() {
//     this.getSpecsSN();
//     this.getIBSTs();
//   }

//   render() {
//     return (
//       <TaskManager
//         upcoming={this.state.uptaskentries}
//         due={this.state.duetaskentries}
//         overdue={this.state.overduetaskentries}
//       />
//     );
//   }
// }
import React, { Component } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import lodash from "lodash";

import TaskBarManager from "./task-container";

export default class TaskCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskrecords: [],
      tasksnfiltered: [],
      specssn: props.specsn,
      upcoming: [],
      due: [],
      overdue: [],
      finalupcoming: [],
      finaldue: [],
      finaloverdue: [],
      uptaskentries: {},
      duetaskentries: {},
      overduetaskentries: {},
      hourtasks: [],
      datetasks: [],
    };

    this.getIBSTs = this.getIBSTs.bind(this);
    this.checkLastCompleted = this.checkLastCompleted.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.filterByHours = this.filterByHours.bind(this);
    this.getUpTaskInfo = this.getUpTaskInfo.bind(this);
    this.getDueTaskInfo = this.getDueTaskInfo.bind(this);
    this.getOverTaskInfo = this.getOverTaskInfo.bind(this);
    this.combineUpTaskInfo = this.combineUpTaskInfo.bind(this);
    this.combineDueTaskInfo = this.combineDueTaskInfo.bind(this);
    this.combineOverTaskInfo = this.combineOverTaskInfo.bind(this);
  }

  async getIBSTs() {
    try {
      const response = await axios.get(`https://backend-1-jevl.onrender.com/IBST`);
      const taskrecords = response.data;
      const filteredrecords = taskrecords.filter(
        (record) => record.specs_sn === this.state.specssn
      );

      this.setState(
        {
          taskrecords,
          tasksnfiltered: filteredrecords,
        },
        () => {
          this.checkLastCompleted();
        }
      );
    } catch (error) {
      console.error("Error fetching IBSTs:", error);
    }
  }

  checkLastCompleted() {
    const datetasks = [];
    const hourtasks = [];

    this.state.tasksnfiltered.forEach((record) => {
      if (
        record.lastcompleted.includes("-") ||
        record.lastcompleted.includes("/")
      ) {
        datetasks.push(record);
      } else {
        hourtasks.push(record);
      }
    });

    this.setState({ datetasks, hourtasks }, () => {
      this.filterByDate();
      this.filterByHours();
    });
  }

  filterByHours() {
    const { hourtasks } = this.state;
    const currenthours = this.props.specsItem.hours;

    const upcoming = hourtasks.filter((record) => {
      const remainingHours = parseInt(record.nextdue, 10) - currenthours;
      return remainingHours < 80 && remainingHours > 40;
    });

    const due = hourtasks.filter((record) => {
      const remainingHours = parseInt(record.nextdue, 10) - currenthours;
      return remainingHours < 40 && remainingHours > 0;
    });

    const overdue = hourtasks.filter((record) => {
      const remainingHours = parseInt(record.nextdue, 10) - currenthours;
      return remainingHours < 1;
    });

    console.log("Hour tasks filtered:", { upcoming, due, overdue });

    this.setState((prevState) => ({
      upcoming: [...prevState.upcoming, ...upcoming],
      due: [...prevState.due, ...due],
      overdue: [...prevState.overdue, ...overdue],
      }),
      () => {
        this.getUpTaskInfo();
        this.getDueTaskInfo();
        this.getOverTaskInfo();
      }
    );
  }

  filterByDate() {
    const today = DateTime.now();
    const thirtyDaysFromNow = today.plus({ days: 30 });
    const sevenDaysFromNow = today.plus({ days: 7 });
    const oneDayFromNow = today.plus({ days: 1 });
    const { datetasks } = this.state;
  
    const upcoming = datetasks.filter(
      (record) =>
        DateTime.fromISO(record.nextdue) <= thirtyDaysFromNow &&
        DateTime.fromISO(record.nextdue) >= sevenDaysFromNow
    );
  
    const due = datetasks.filter(
      (record) =>
        DateTime.fromISO(record.nextdue) <= sevenDaysFromNow &&
        DateTime.fromISO(record.nextdue) >= oneDayFromNow
    );
  
    const overdue = datetasks.filter(
      (record) => DateTime.fromISO(record.nextdue) <= oneDayFromNow
    );
  
    console.log("Filtering date tasks...");
    console.log("Upcoming tasks:", upcoming);
    console.log("Due tasks:", due);
    console.log("Overdue tasks:", overdue);
  
    this.setState((prevState) => ({
      upcoming: [...prevState.upcoming, ...upcoming],
      due: [...prevState.due, ...due],
      overdue: [...prevState.overdue, ...overdue],
    }), () => {
      this.getUpTaskInfo();
      this.getDueTaskInfo();
      this.getOverTaskInfo();
    });
  }
  

  getUpTaskInfo() {
    const uptaskid = this.state.upcoming.map((record) => record.task_id);

    Promise.all(
      uptaskid.map((id) =>
        axios
          .get(`https://backend-1-jevl.onrender.com/Task/${id}`)
          .then((response) => response.data)
      )
    )
      .then((tasks) => {
        this.setState({ finalupcoming: tasks }, this.combineUpTaskInfo);
      })
      .catch((error) => {
        console.error("Error fetching upcoming tasks:", error);
      });
  }

  getDueTaskInfo() {
    const duetaskid = this.state.due.map((record) => record.task_id);

    Promise.all(
      duetaskid.map((id) =>
        axios
          .get(`https://backend-1-jevl.onrender.com/Task/${id}`)
          .then((response) => response.data)
      )
    )
      .then((tasks) => {
        this.setState({ finaldue: tasks }, this.combineDueTaskInfo);
      })
      .catch((error) => {
        console.error("Error fetching due tasks:", error);
      });
  }

  getOverTaskInfo() {
    const odtaskid = this.state.overdue.map((record) => record.task_id);

    Promise.all(
      odtaskid.map((id) =>
        axios
          .get(`https://backend-1-jevl.onrender.com/Task/${id}`)
          .then((response) => response.data)
      )
    )
      .then((tasks) => {
        this.setState({ finaloverdue: tasks }, this.combineOverTaskInfo);
      })
      .catch((error) => {
        console.error("Error fetching overdue tasks:", error);
      });
  }

  combineUpTaskInfo() {
    const uptaskentries = lodash.merge(
      lodash.keyBy(this.state.upcoming, "task_id"),
      lodash.keyBy(this.state.finalupcoming, "id")
    );

    this.setState({ uptaskentries });
  }

  combineDueTaskInfo() {
    const duetaskentries = lodash.merge(
      lodash.keyBy(this.state.due, "task_id"),
      lodash.keyBy(this.state.finaldue, "id")
    );

    this.setState({ duetaskentries });
  }

  combineOverTaskInfo() {
    const overduetaskentries = lodash.merge(
      lodash.keyBy(this.state.overdue, "task_id"),
      lodash.keyBy(this.state.finaloverdue, "id")
    );

    this.setState({ overduetaskentries });
  }

  componentDidMount() {
    this.getIBSTs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.specsItem !== this.props.specsItem) {
      this.setState({ specssn: this.props.specsn }, () => {
        this.checkLastCompleted();
      });
    }
  }

  render() {
    return (
      <TaskBarManager
        upcoming={this.state.uptaskentries}
        due={this.state.duetaskentries}
        overdue={this.state.overduetaskentries}
      />
    );
  }
}
