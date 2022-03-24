import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "../../components/SignIn/SigninElements.js";

import Storage from "../../tokenStorage.js";

const EditAccountGuest = () => {
  //required files
  var bp = require("../Path.js");

  //useState
  const [message, setMessage] = useState(null);
  const [FirstNameX, setFName] = useState(null);
  const [LastNameX, setLName] = useState(null);
  const [PhoneNumberX, setPhone] = useState(null);
  const [EmailX, setEmail] = useState(null);

  //Variables
  var Token = Storage.retrieveToken()

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
      setPhone(ud.phone);
      setEmail(ud.email);
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  var FirstName;
  var LastName;
  var Phone;
  var Email;
  var NewPassword;

  const doEditAcc = async event => {
    event.preventDefault();
    setMessage('');
    if (NewPassword.value.localeCompare('') === 0) {
      setMessage('NewPassword is Required');
    } else {

      if (FirstName.value.localeCompare('') === 0) {
        FirstName = FirstNameX;
      }
      if (LastName.value.localeCompare('') === 0) {
        LastName = LastNameX;
      }
      if (Phone.value.localeCompare('') === 0) {
        Phone = PhoneNumberX;
      }
      if (Email.value.localeCompare('') === 0) {
        Email = EmailX;
      }

      //JSON OBJECT
      var obj = {
        "password": NewPassword.value,
        "first_name": FirstName.value,
        "last_name": LastName.value,
        "email": Email.value,
        "phone": Phone.value
      };

      var js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "patch",
        url: bp.buildPath("api/account/"),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        data: js,
      };
      axios(config)
        .then(function (response) {
          window.location.href = "/myprofileguest";
        })
        .catch(function (error) {
          //Error function to show error as consol logs
          setMessage(" " + error);
        });
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Cyber Hotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Edit Account</FormH1>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <FormInput type="name" ref={(c) => FirstName = c} />
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput type="name" ref={(c) => LastName = c}  />
              <FormLabel htmlFor="for">Phone Number</FormLabel>
              <FormInput type="phonenumber" ref={(c) => Phone = c}  />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" ref={(c) => Email = c} />
              <FormLabel htmlFor="for">Password </FormLabel>
              <FormInput type="password" required='true' ref={(c) => NewPassword = c}/>
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" class="button" onClick={doEditAcc}>Edit Info</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default EditAccountGuest;
