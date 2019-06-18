import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileAction";

class Experience extends Component {
  handleDelete = _id => {
    this.props.deleteExperience(_id);
  };
  render() {
    const experience = this.props.experience.map(
      ({ _id, company, title, from, to }, index) => (
        <tr key={index}>
          <td>{company}</td>
          <td>{title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{from}</Moment> -
            <Moment format="YYYY/MM/DD">{to}</Moment>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.handleDelete.bind(this, _id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
    return (
      <div>
        <h3 className="mb-4">Experience Credentials</h3>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          {experience}
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience);
