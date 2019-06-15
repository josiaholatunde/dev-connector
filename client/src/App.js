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
