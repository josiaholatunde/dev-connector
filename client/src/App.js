import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { setAuthToken } from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";

if (localStorage.getItem("jwtToken")) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);

  store.dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
  //Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch({ type: SET_CURRENT_USER, payload: {} });
    window.location.href = "/login";
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
            </div>
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
