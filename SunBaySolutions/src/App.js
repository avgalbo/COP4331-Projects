import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";
import AdminPage from "./pages/admin";
import EmployeePage from "./pages/employee";
import GuestPage from "./pages/guest";
import AboutGuestPage from "./pages/aboutguest";
import PasswordResetPage from "./pages/resetpassword";
import ResetResetByTokenPage from "./pages/letmein";
import EditAccountEmployeePage from "./pages/editaccountemployee";
import OrdersPage from "./pages/orders";
import MyProfileEmployeePage from "./pages/myprofileemployee";
import RegisterAccountPage from "./pages/registeraccount";
import ResetByTokenPage from "./pages/letmein";
import OnboardingPage from "./pages/onboarding";
import Inventory from "./pages/Inventory";
import CheckOut from "./pages/checkout";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/admin" component={AdminPage} exact />
        <Route path="/employee" component={EmployeePage} exact />
        <Route path="/resetpassword" component={PasswordResetPage} exact />
        <Route path="/letmein" component={ResetByTokenPage} exact />
        <Route path="/onboarding" component={OnboardingPage} exact />
        <Route path="/guest" component={GuestPage} exact />
        <Route path="/about" component={AboutGuestPage} exact />

        <Route path="/orders" component={OrdersPage} exact />
        <Route
          path="/settings"
          component={MyProfileEmployeePage}
          exact
        />
        <Route
          path="/editaccount"
          component={EditAccountEmployeePage}
          exact
        />
        <Route path="/registeraccount" component={RegisterAccountPage} exact />
        <Route path="/inventory" component={Inventory} exact />
        <Route path="/checkout" component={CheckOut} exact />
      </Switch>
    </Router>
  );
}

export default App;
