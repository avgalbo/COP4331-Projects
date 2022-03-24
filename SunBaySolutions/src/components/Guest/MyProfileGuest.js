import React, { useState, useEffect } from "react";
import GuestAccountSettingComponent from "./GuestAccountSettingComponent";
import axios from "axios";
import {
  AccountSettingWrapper,
  GuestContainer,
  GuestH1,
  EditAccountBtnLink,
} from "./GuestElements";
import Storage from '../../tokenStorage.js';

const MyProfileGuest = () => {

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
      setPNumber(ud.phone);
      setEmail(ud.email);
      setUName(ud.username);
      setPass(ud.password);
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  return (
    <>
      <GuestContainer>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <EditAccountBtnLink to="/editaccountguest">Edit Account{" "}</EditAccountBtnLink>
        <GuestH1>Account Settings</GuestH1>
        <AccountSettingWrapper>
          <GuestAccountSettingComponent settingTitle="FirstName" description={FirstName} />
          <GuestAccountSettingComponent settingTitle="LastName" description={LastName} />
          <GuestAccountSettingComponent settingTitle="PhoneNumber" description={PhoneNumber} />
          <GuestAccountSettingComponent settingTitle="Email" description={Email} />
          <GuestAccountSettingComponent settingTitle="UserName" description={UserName} />
          <GuestAccountSettingComponent settingTitle="Password" description={Password} />
        </AccountSettingWrapper>
      </GuestContainer>
    </>
  );
};

export default MyProfileGuest;
