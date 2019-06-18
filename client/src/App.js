import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import Register from "./components/auth/Register";
import { setAuthToken } from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/Create-Profile";
import EditProfile from "./components/create-profile/Edit-Profile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/layout/Profiles";

if (localStorage.getItem("jwtToken")) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);

  store.dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
  //Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch({ type: SET_CURRENT_USER, payload: {} });
    //window.location.href = "/login";
  }
  //Clear current profile

  //redirect to Login
}
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <div className="container py-2">
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profiles" exact component={Profiles} />

              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute
                path="/add-education"
                exact
                component={AddEducation}
              />
              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />
              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/create-profile"
                exact
                component={CreateProfile}
              />
            </div>
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
