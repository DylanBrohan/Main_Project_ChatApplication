import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEducation } from "../../actions/profileActions";
import Moment from "react-moment";

class Education extends Component {
  // Delete by id when this is called
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    // Map through education properties and pull out id - school - degree
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {/* If Edu to = null -> Now  */}
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            // Else set date
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          {/* On Delete by education Id */}
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn                                  btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th> </th>
            </tr>
            {/* Pulled from state */}
            {education}
          </thead>
        </table>
      </div>
    );
  }
}
// Required
Education.proptype = {
  deleteEducation: PropTypes.func.isRequired
};
// Connection to Redux store
export default connect(
  null,
  { deleteEducation }
)(Education);
