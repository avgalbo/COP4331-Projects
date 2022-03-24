import React, { useState } from "react";
//import { Link } from 'react-router';
import { Link } from 'react-router-dom'
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  FormButton1,
  Text,
} from "./ResetByTokenElements";
import axios from "axios";


const ResetByToken = () => {
  const [message, setMessage] = useState("");
  let NewPassword;

  let bp = require("../Path.js");

  const getResetToken = async (event) => {
    event.preventDefault();
    NewPassword = NewPassword.value;

    if (NewPassword !== "") {
      //JSON OBJECT
      let getParams = window.location.search.replace("?","").split("&");
      let token = "";
      for (let i in getParams) {
        let tmpSearch = getParams[i].split("=");
        if (tmpSearch[0] === "token")
          token = tmpSearch[1];
      }
      if (token === "") {
        setMessage("You are not authorized to perform this action.");
        return;
      }
        // setMessage("Session expired. Please reset your password again.");

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
          <Icon to="/"><i>Account Recovery</i></Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Reset Password</FormH1>
              <FormLabel htmlFor="for">Set New Password</FormLabel>
              <FormInput type="password" required ref={(c) => NewPassword = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" onClick={getResetToken}>Update</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ResetByToken;
