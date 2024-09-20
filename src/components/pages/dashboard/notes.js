import React, { Component } from "react";
import axios from "axios";

import styles from "../../../style/dashboard.scss";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      showModal: false,
      newNote: "",
    };

    this.getNotes = this.getNotes.bind(this);
    this.addNote = this.addNote.bind(this);
    this.retireNote = this.retireNote.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    axios
      .get("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Notes")
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNote() {
    const currentDate = new Date().toISOString(); // Format the date in ISO format
  
    axios
      .post("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Notes", {
        note: this.state.newNote,
        retired: "n",
        date: currentDate, // Add the date to the request body
      })
      .then((response) => {
        this.setState((prevState) => ({
          notes: [...prevState.notes, response.data],
          showModal: false,
          newNote: "",
        }));
      })
      .catch((error) => {
        console.log("Error adding note:", error);
      });
  }
  

  retireNote(noteId) {
    axios
      .put(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Notes/${noteId}`, { retired: "y" })
      .then(() => {
        this.setState((prevState) => ({
          notes: prevState.notes.map((note) =>
            note.id === noteId ? { ...note, retired: "y" } : note
          ),
        }));
      })
      .catch((error) => {
        console.log("Error retiring note:", error);
      });
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleInputChange(event) {
    this.setState({ newNote: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addNote();
  }

  render() {
    return (
      <div>
        <div className="notes-header">
          <h1>Notes</h1><button onClick={this.toggleModal}>Add Note</button>
        </div>

        
        <div className="notes-container">
          {this.state.notes
            .filter((note) => note.retired === "n") // Filter to show only non-retired notes
            .map((note) => (
              <div key={note.id}>
                {note.note}
                <button onClick={() => this.retireNote(note.id)}>
                  Retire?
                </button>
              </div>
            ))}
        </div>

        {/* Modal */}
        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Note</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Note:
                  <input
                    type="text"
                    value={this.state.newNote}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Add Note</button>
                <button type="button" onClick={this.toggleModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
