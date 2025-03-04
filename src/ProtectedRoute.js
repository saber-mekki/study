import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./helper";

 function ProtectedRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

function ProtectedAdminRoute ( {isAdmin, component: Component, ...rest } ) {
  return   isAuthenticated()  && isAdmin ? <Component /> : <Redirect to="/login" />;
};

export {ProtectedRoute,ProtectedAdminRoute} ;