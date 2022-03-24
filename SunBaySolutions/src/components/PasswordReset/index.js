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
} from "./PasswordResetElements";
import axios from "axios";
let path = require("path");


const ResetPassword = () => {
  const [message, setMessage] = useState("");
  let PhoneNumber;
  var bp = require("../Path.js");

  const getPasswordReset = async (event) => {
    event.preventDefault();
    PhoneNumber = PhoneNumber.value;
    // warn: this is NOT enforced at sign-up.
    // if (PhoneNumber.charAt(3) === '-' && PhoneNumber.charAt(7) === '-') {
      //JSON OBJECT
      var obj = { phone: PhoneNumber.value };
      var js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "get",
        url: bp.buildPath(path.join("api/account/letmein/", PhoneNumber)),
        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config).then(function (response) {
        var res = response.data;
        if (res.err_code) {
          setMessage(res.description);
        }
        else {
          setMessage('Check your phone for a password reset link.');
        }
      });
    // }
    // else{
    //   setMessage('Please Enter phone number like this: 123-456-7890');
    // }
  }

  return (
      <>
        <Container>
          <FormWrap>
            <Icon to="/signin">&lsaquo; Sign In</Icon>
            <FormContent>
              <Form action="#">
                <FormH1>Forgot Password</FormH1>
                <FormLabel htmlFor="for">Phone Number</FormLabel>
                <FormInput type="phone" required ref={(c) => PhoneNumber = c}/>
                <FormLabel> {message} </FormLabel>
                <FormButton type="submit" onClick={getPasswordReset}>Reset</FormButton>
              </Form>
            </FormContent>
          </FormWrap>
        </Container>
      </>
  );
};

export default ResetPassword;
