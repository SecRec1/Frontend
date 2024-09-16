import React, { Component } from "react";
import axios from "axios";
import styles from "../../../style/dashboard.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      showModal: false, // State to control modal visibility
      newJob: {
        job: "",
        reasons: "",
      },
    };

    this.getJobs = this.getJobs.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteJob = this.deleteJob.bind(this); // Bind the delete function
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs() {
    axios
      .get("https://backend-1-jevl.onrender.com/Jobs")
      .then((response) => {
        this.setState({ jobs: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      newJob: {
        ...this.state.newJob,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://backend-1-jevl.onrender.com/Jobs", this.state.newJob)
      .then((response) => {
        this.setState({
          jobs: [...this.state.jobs, response.data],
          showModal: false, // Close modal on success
          newJob: { job: "", reasons: "" }, // Reset form
        });
      })
      .catch((error) => {
        console.error("Error adding job:", error);
      });
  }

  deleteJob(id) {
    axios
      .delete(`https://backend-1-jevl.onrender.com/Jobs/${id}`)
      .then(() => {
        this.setState({
          jobs: this.state.jobs.filter((job) => job.id !== id),
        });
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  }

  render() {
    return (
      <div>
        <div className="jobs-header">
          <h1>Jobs in Waiting</h1>
          <button onClick={this.toggleModal}>+</button>
        </div>

        <div className="jobs-container">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Waiting On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.job}</td>
                  <td>{job.reasons}</td>
                  <td>
                    <button onClick={() => this.deleteJob(job.id)}>-</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Job</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Job:
                  <input
                    type="text"
                    name="job"
                    value={this.state.newJob.job}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <label>
                  Waiting On:
                  <input
                    type="text"
                    name="reasons"
                    value={this.state.newJob.reasons}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Add Job</button>
              </form>
              <button onClick={this.toggleModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
