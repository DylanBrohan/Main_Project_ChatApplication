import React from "react";
import { Link } from "react-router-dom";

// Profile sub sections links to each
const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      {/* Routes to each Profile Action */}
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
