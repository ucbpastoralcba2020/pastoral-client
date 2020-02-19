import React, { Component } from 'react';
import SinglePage from './components/singlePage/SinglePage';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminPage from './components/adminPage/AdminPage';
import Auth from './components/adminPage/Auth';
import AuthService from './services/authService';
import NewAccount from './components/adminPage/NewAccount';

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {
      auth: this.auth.isLoggedIn()
    }
  }

  onAuthChange = () => {
    this.setState({
      auth: this.auth.isLoggedIn()
    })
  }
  isAdmin = () => {
    let auth = new AuthService();

    if (this.state.auth) {
      if (auth.getUser().role === "Administrador") {
        return <Route path="/" render={(routerProps) => <AdminPage {...routerProps} onAuthChange={this.onAuthChange} />} />
      }
    }
    return;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" render={(routerProps) => <Auth {...routerProps} onAuthChange={this.onAuthChange} />} />
          <Route path="/new-account" component={NewAccount} />
          <Route path="/pastoral" component={SinglePage} />
          {this.isAdmin()}
          <Redirect from="*" to="/pastoral" />
        </Switch>
      </Router>
    )
  }
}

export default App;

