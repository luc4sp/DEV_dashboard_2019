import React from "react";
import { Redirect, Route } from "react-router-dom"

export const PrivateRoute = ({ component: Node, Comment, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Node {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )    
        }
    />
)