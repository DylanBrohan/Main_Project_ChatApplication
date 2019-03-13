import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Private route - user will need to be authenticated to access these routes ->
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      //  if this is = true we are logged in
      auth.isAuthenticated === true ? (
        // load component
        <Component {...props} />
      ) : (
        // if not redirect to login
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
// Connect to redux Store
export default connect(mapStateToProps)(PrivateRoute);
