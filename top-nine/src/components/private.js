import React from "react";
import { Route, Redirect } from 'react-router-dom';
 

const Private = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("auth") ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  export default Private;