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
  FormSelect
} from "./RegisterElements.js";
import Storage from "../../tokenStorage.js";

const RegisterAccount = () => {
  // useStates
  const [message, setMessage] = useState(null);
  const [RoomList, setRoomList] = useState([]);

  //required files
  var bp = require("../Path.js");

  //Variables
  var Token = Storage.retrieveToken();

  //variables
  let FirstName;
  let LastName;
  let PhoneNumber;
  let Email;
  let Password;
  let Role;
  let UserName;
  let Room;
  let CID;
  let COD;
  let RoomsOpen = [];

  // Get open rooms.
  useEffect(async () => {

    // Get list of available rooms.
    let configX = {
      method: "get",
      url: bp.buildPath("api/floor"),
      headers: {
        "Content-Type": "application/json",
        "authorization": Token
      }
    }
    axios(configX).then(function (response) {

      const resp_rm = response.data;

      for (let i = 0; i < resp_rm.length; i++) {
        if (resp_rm[i].occupant === -1) {
          RoomsOpen.push(resp_rm[i].room_id);
        }
      }
      setRoomList(RoomsOpen);
    });

  }, []);

  const doRegister = async event => {

    if (Room === null || UserName === null || Password === null || FirstName === null || LastName === null || Email === null || PhoneNumber === null || Role === null || CID === null || COD === null) {
      setMessage('Please enter all information');
    }
    else {

      const checkin = Number(new Date(CID.value))/1000;
      const checkout = Number(new Date(COD.value))/1000
      // Create JSON payload.
      let obj = {
        "username": UserName.value,
        "first_name": FirstName.value,
        "email": Email.value,
        "phone": PhoneNumber.value,
        "role": Role.value,
        "checkin": checkin ? checkin : -1,
        "checkout": checkout ? checkout : -1
      };
      if (Room.value) obj['room'] = Room.value;
      if (Password.value) obj['password'] = Password.value;
      if (LastName.value) obj['last_name'] = LastName.value;

      var js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "post",
        url: bp.buildPath("api/account/create"),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        data: js,
      };
      //REGISTERING A NEW USER
      axios(config)
        .then(function (response) {
          if(response.data.err_code){
            if (response.data.err_code === 400)
              setMessage("Username, Email, or Phone Number Taken");
            else
              setMessage(String(response.data.description))
          }else{
            setMessage("Account provisioned successfully.")
          }
        })
        .catch(function (error) {
          //Error function to show error as console logs
          let errStr = String(error);
          if (errStr.indexOf("400") !== -1)
            errStr = "Username, Email, or Phone Number Taken";
          setMessage(errStr);
        });
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/admin">&lsaquo; Rooms</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Register Account</FormH1>
              <FormLabel htmlFor="for">Room </FormLabel>
              {/*<FormInput type="text" ref={(c) => Room = c} />*/}
              <FormSelect ref={(c) => Room = c}>
                {
                  RoomList.map(itm =>
                      <option value={itm}>{itm}</option>
                  )
                }
              </FormSelect>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <FormInput type="name" ref={(c) => FirstName = c} />
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput type="name" ref={(c) => LastName = c} />
              <FormLabel htmlFor="for">Phone Number</FormLabel>
              <FormInput type="phonenumber" ref={(c) => PhoneNumber = c} />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" ref={(c) => Email = c} />
              <FormLabel htmlFor="for">Username</FormLabel>
              <FormInput type="text" ref={(c) => UserName = c} />
              <FormLabel htmlFor="for">Password (optional)</FormLabel>
              <FormInput type="password" ref={(c) => Password = c} />
              <FormLabel htmlFor="for">Role </FormLabel>
              {/*<FormInput type="name" ref={(c) => Role = c} />*/}
              <FormSelect ref={(c) => Role = c}>
                    <option value="guest">Guest</option>
                    <option value="staff">Staff Member</option>
                    <option value="admin">Admin</option>
              </FormSelect>
              {/*Let's be honest: this data was never used.*/}
              <FormLabel htmlFor="for">Check-in Date </FormLabel>
              <FormInput type="date" ref={(c) => CID = c} />
              <FormLabel htmlFor="for">Check-out Date </FormLabel>
              <FormInput type="date" ref={(c) => COD = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton onClick={doRegister}>Register User</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default RegisterAccount;
