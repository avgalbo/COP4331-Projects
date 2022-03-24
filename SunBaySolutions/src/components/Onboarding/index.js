import React, { useState, useEffect } from "react";
//import { Link } from 'react-router';
import { Link } from 'react-router-dom'
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH0,
  FormH1,
  FormH2,
  FormLabel,
  FormInput,
  FormButton,
  FormButton1,
  Text,
} from "../Admin/RegisterElements";
import axios from "axios";
import Storage from "../../tokenStorage";


const Onboarding = () => {
  const [message, setMessage] = useState("");

  ///
  const [TokenX, setToken] = useState(null);
  const [FirstNameX, setFName] = useState(null);
  const [LastNameX, setLName] = useState(null);
  const [PhoneNumberX, setPhone] = useState(null);
  const [UsernameX, setUsername] = useState(null);
  const [EmailX, setEmail] = useState(null);
  ///

  //Variables
  let Token = Storage.retrieveToken()

  useEffect(async () => {
    //JSON OBJECT
    let getParams = window.location.search.replace("?","").split("&");
    let username = "";
    for (let i in getParams) {
      let tmpSearch = getParams[i].split("=");
      if (tmpSearch[0] === "username")
        username = tmpSearch[1];
    }
    if (username === "") {
      setMessage("Error: Missing username. Contact support for assistance.");
      return;
    }

    //Get user info everytime we load the page
    axios({
      method: "post",
      url: bp.buildPath("api/account/login"),
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        "username": username,
        "password": ""
      })
    }).then(function (response) {
      let ud = response.data;

      //Getting info needed for this page
      setToken(ud.token ? ud.token.replace("Bearer ","") : null);
      setFName(ud.first_name);
      setLName(ud.last_name);
      setPhone(ud.phone);
      setEmail(ud.email);
      setUsername(ud.username);
    }).catch(function (error) {
      if (String(error).indexOf("401") !== -1)
        setMessage("Error: Account already activated.");
      else
        setMessage(' ' + error);
    });
  }, []);

  let NewPassword;

  let bp = require("../Path.js");

  const getResetToken = async (event) => {
    event.preventDefault();
    NewPassword = NewPassword.value;

    if (NewPassword !== "") {
      //JSON OBJECT
      let getParams = window.location.search.replace("?","").split("&");
      let token = TokenX;

      let obj = { password: NewPassword };
      let js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "patch",
        url: bp.buildPath("api/account/"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        data: js,
      };

      axios(config).then(function (response) {
        var res = response.data;
        if (res.err_code) {
          setMessage(res.description);
        }
        else {
          setMessage('Password successfully reset.');
          // Go to sign-in page.
          window.location.href = "/signin";
        }
      }).catch(err => {
        let stringErr = String(err);
        if (stringErr.indexOf("403") !== -1)
          return setMessage("Session expired. Please reset your password again.");
        return setMessage(err);
      });
    }
    else {
      setMessage('Please enter a password.');
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/"><i>Welcome!</i></Icon>
          <FormContent>
            <Form action="#">
              <FormH0>Account Creation</FormH0>
              <FormH2>
                You have a reservation at Hotel Knightro, which requires an account. Please sign up below.
              </FormH2>
              <FormLabel htmlFor="for">Name</FormLabel>
              <FormH2>{FirstNameX} {LastNameX}</FormH2>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormH2>{EmailX}</FormH2>
              <FormLabel htmlFor="for">Phone Number</FormLabel>
              <FormH2>{PhoneNumberX}</FormH2>
              <FormLabel htmlFor="for">Username</FormLabel>
              <FormH2>{UsernameX}</FormH2>
              {/* Room/check-in-out info will be shown on account activation. */}
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput type="password" required ref={(c) => NewPassword = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" onClick={getResetToken}>Create Account</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Onboarding;
