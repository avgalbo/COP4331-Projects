import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AccountSettingWrapper,
  EmployeeContainer,
  EmployeeH1,
  EmployeeH3,
  FormWrap,
  FormContent,
  Form,
} from "./EmployeeElements";


const Employee = () => {
  //States
  const [message, setMessage] = useState(null);
  const [FirstName, setFName] = useState(null);
  const [LastName, setLName] = useState(null);

  //Variables
  var Token = Storage.retrieveToken();

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
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  return (
    <EmployeeContainer id="Employee">
      <FormWrap>
        <FormContent>
          <Form>
            <EmployeeH3>{FirstName} {LastName} {message}</EmployeeH3>
          </Form>
        </FormContent>
      </FormWrap>
      <EmployeeH1>You're logged in! Let's get to work.</EmployeeH1>
      <AccountSettingWrapper></AccountSettingWrapper>
    </EmployeeContainer>
  );
};

export default Employee;
