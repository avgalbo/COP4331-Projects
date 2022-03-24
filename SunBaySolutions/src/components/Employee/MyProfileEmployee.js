import React, { useState, useEffect } from "react";
import AccountSettingComponent from "./AccountSettingComponent";
import axios from "axios";
import {
  AccountSettingWrapper,
  EmployeeContainer,
  EmployeeH1,
  EditAccountBtnLink,
} from "./EmployeeElements";
import Storage from '../../tokenStorage.js';

// Turn phone number string into a general format.
const phoneNumberIfy = (str) => {
  let num = str.replaceAll(/\D/g, "");
  if (num.length === 10)
    return `(${num.substring(0,3)}) ${num.substring(3,6)}-${num.substring(6)}`;
  else
    return str;
}

const MyProfileEmployee = () => {
  //useState
  const [message, setMessage] = useState(null);
  const [FirstName, setFName] = useState(null);
  const [LastName, setLName] = useState(null);
  const [PhoneNumber, setPNumber] = useState(null);
  const [Email, setEmail] = useState(null);
  const [UserName, setUName] = useState(null);
  const [Password, setPass] = useState(null);

  //Variables
  var Token = Storage.retrieveToken()

  //required files
  var bp = require("../Path.js");

  //Config for get account
  var config = {
    method: "get",
    url: bp.buildPath("api/account"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };

  //UserInfo
  useEffect(async () => {

    //Get user info everytime we lode the page
    axios(config).then(function (response) {

      var ud = response.data;

      //Getting info needed for this page
      setFName(ud.first_name);
      setLName(ud.last_name);
      setPNumber(phoneNumberIfy(ud.phone));
      setEmail(ud.email);
      setUName(ud.username);
      setPass("**********");
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  return (
    <>
      <EmployeeContainer id="Employee">
        <EmployeeH1>Account Settings</EmployeeH1>
        <EditAccountBtnLink to="/editaccount">Edit Account{" "}</EditAccountBtnLink>
        <AccountSettingWrapper>
          <AccountSettingComponent settingTitle="First Name" description={FirstName} />
          <AccountSettingComponent settingTitle="Last Name" description={LastName} />
          <AccountSettingComponent settingTitle="Phone Number" description={PhoneNumber} />
          <AccountSettingComponent settingTitle="Email" description={Email} />
          <AccountSettingComponent settingTitle="Username" description={UserName} />
          <AccountSettingComponent settingTitle="Password" description={Password} />
        </AccountSettingWrapper>
      </EmployeeContainer>
    </>
  );
};

export default MyProfileEmployee;
