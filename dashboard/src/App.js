import React , { Component } from 'react';
import './App.css';
import ApolloClient from "apollo-client";
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link';
import {InMemoryCache} from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch} from "react-router-dom"
import { PrivateRoute } from './privateRoute'
import AuthorPage from "./Pages/AuthorPage"
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage'
import ProfilPage from './Pages/ProfilPage'

const InitialState = {
  token: window.localStorage.getItem("token"),
  search: "",
};

export const AuthorContext = React.createContext(InitialState);

const requestLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});
/*
const request = async (operation) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Bearer " + token);
    operation.setContext({
      header: {
        Authorization: "Bearer " + token
      }
    });
  }
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle = undefined;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward && forwarderati(opon).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
        .catch(observer.error.bind(observer));
    return() => {
      if (handle)
        handle.unsubscribe();
    }
  })

);
*/

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    requestLink,
    new HttpLink({uri: 'http://localhost:8080'})
  ]),
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "" ,
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AuthorPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/HomePage" component={HomePage}/>
          <PrivateRoute exact path="/ProfilPage" component={ProfilPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;