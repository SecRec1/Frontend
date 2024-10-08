import React, { Component } from "react";
import axios from "axios";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      username: "",
      password: "",
      loggedin: false,
    };
    this.isNavigatingAway = false; // Track navigation vs refresh
  }

  componentDidMount() {
    this.getAdmins();
    const loggedin = sessionStorage.getItem("loggedin") === "true";
    const username = sessionStorage.getItem("username");
    if (loggedin && username) {
      this.setState({ loggedin, username }, this.toggleView);
    }

    // Adding event listeners
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  componentWillUnmount() {
    // Removing event listeners to avoid memory leaks
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  getAdmins = () => {
    axios
      .get("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Admin")
      .then((response) => this.setState({ admins: response.data }))
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, admins } = this.state;
    const admin = admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      await this.updateAdminStatus(admin.id, true);
      this.setState({ loggedin: true, password: "" }, () => {
        sessionStorage.setItem("loggedin", true);
        sessionStorage.setItem("username", username);
        this.toggleView();
      });
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  handleLogout = async () => {
    const { username, admins } = this.state;
    const admin = admins.find((admin) => admin.username === username);
    if (admin) {
      await this.updateAdminStatus(admin.id, false);
      this.setState({ loggedin: false, username: "" }, () => {
        sessionStorage.removeItem("loggedin");
        sessionStorage.removeItem("username");
        this.toggleView();
      });
    }
    window.location.reload();
  };

  updateAdminStatus = async (id, status) => {
    await axios.put(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Admin/${id}/status`, {
      loggedin: status,
    });
  };

  handleBeforeUnload = (event) => {
    if (this.isNavigatingAway) {
      const { username, admins } = this.state;
      const admin = admins.find((admin) => admin.username === username);
      if (admin) {
        // Update the admin status to logged out
        this.updateAdminStatus(admin.id, false);

        // Clear sessionStorage
        sessionStorage.removeItem("loggedin");
        sessionStorage.removeItem("username");
      }
    }
  };

  handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      this.isNavigatingAway = true;
    } else {
      this.isNavigatingAway = false;
    }
  };

  toggleView = () => {
    const { loggedin } = this.state;
    const loggedinStatus = document.getElementById("logged-in-status");
    const loginBox = document.getElementById("login-box");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");

    if (loggedin) {
      loggedinStatus.style.display = "block";
      loginBox.style.display = "none";
      login.style.display = "none";
      logout.style.display = "block";
    } else {
      loggedinStatus.style.display = "none";
      loginBox.style.display = "block";
      login.style.display = "block";
      logout.style.display = "none";
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <h1 id="logged-in-status" className="logged-in-status hide">
            Admin {this.state.username} is logged in
          </h1>
          <form
            id="login-box"
            className="login-box"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button id="login" className="login" type="submit">
              Login
            </button>
          </form>
          <div className="button-container">
            <button
              id="logout"
              className="logout hide"
              type="button"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
