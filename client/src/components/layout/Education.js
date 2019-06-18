import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileAction";

class Experience extends Component {
  handleDelete = _id => {
    this.props.deleteEducation(_id);
  };
  render() {
    let education;
    if (this.props.education.length > 0) {
      education = this.props.education.map(
        ({ _id, school, degree, from, to }, index) => (
          <tr key={index}>
            <td>{school}</td>
            <td>{degree}</td>
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
    } else {
      education = (
        <tr>
          <th colSpan="4">No Education Credentials To Display</th>
        </tr>
      );
    }
    return (
      <div>
        <h3 className="mb-4">Education Credentials</h3>
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          {education}
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(Experience);
