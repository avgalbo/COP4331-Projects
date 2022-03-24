import React, { useState, useEffect } from "react";
import AdminCardComponent from "../Admin/AdminCardComponent";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AdminContainer,
  AdminH1,
  AdminWrapper,
} from "./AdminElements";
const Admin = () => {

  //Room Details
  // TODO: Use API to get a list of floors.
  const [F1, setF1] = useState(["-----", "100", "-----", "101", "-----", "102", "-----", "103"]);
  const [F2, setF2] = useState(["-----", "200", "-----", "201", "-----", "202", "-----", "203"]);
  const [F3, setF3] = useState(["-----", "300", "-----", "301", "-----", "302", "-----", "303"]);

  //States
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [Users, setUsers] = useState([]);

  //Variables
  var Token = Storage.retrieveToken()

  //required files
  var bp = require("../Path.js");

  //Config for get Floors
  var config = {
    method: "get",
    url: bp.buildPath("api/account/all"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };


  //UserInfo
  useEffect(async () => {

    //Get user info everytime we lode the page
    axios(config).then(function (response) {
      var user = response.data;

      for (let i = 0; i < user.length; i++) {
        if (user[i].role === 'guest') {
          setUsers(...Users, user[i].username);
          if (user[i].room === '100') {
            F1[0] = user[i].username;
          }
          if (user[i].room === '101') {
            F1[2] = user[i].username;
          }
          if (user[i].room === '102') {
            F1[4] = user[i].username;
          }
          if (user[i].room === '103') {
            F1[6] = user[i].username;
          }
          if (user[i].room === '200') {
            F2[0] = user[i].username;
          }
          if (user[i].room === '201') {
            F2[2] = user[i].username;
          }
          if (user[i].room === '202') {
            F2[4] = user[i].username;
          }
          if (user[i].room === '203') {
            F2[6] = user[i].username;
          }
          if (user[i].room === '300') {
            F3[0] = user[i].username;
          }
          if (user[i].room === '301') {
            F3[2] = user[i].username;
          }
          if (user[i].room === '302') {
            F3[4] = user[i].username;
          }
          if (user[i].room === '303') {
            F3[6] = user[i].username;
          }
        }
      }
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  });

  return (
    <>
      <AdminContainer>
        <AdminH1>Room Availability</AdminH1>
        <AdminWrapper>
          <AdminCardComponent
            username={F3[0]}
            roomnumber={F3[1]}
          />
          <AdminCardComponent
            username={F3[2]}
            roomnumber={F3[3]}
          />
          <AdminCardComponent
            username={F3[4]}
            roomnumber={F3[5]}
          />
          <AdminCardComponent
            username={F3[6]}
            roomnumber={F3[7]}
          />
          {/* 200-204 rooms */}
          <AdminCardComponent
            username={F2[0]}
            roomnumber={F2[1]}
          />
          <AdminCardComponent
            username={F2[2]}
            roomnumber={F2[3]}
          />
          <AdminCardComponent
            username={F2[4]}
            roomnumber={F2[5]}
          />
          <AdminCardComponent
            username={F2[6]}
            roomnumber={F2[7]}
          />
          {/* 100-104 rooms */}
          <AdminCardComponent
            username={F1[0]}
            roomnumber={F1[1]}
          />
          <AdminCardComponent
            username={F1[2]}
            roomnumber={F1[3]}
          />
          <AdminCardComponent
            username={F1[4]}
            roomnumber={F1[5]}
          />
          <AdminCardComponent
            username={F1[6]}
            roomnumber={F1[7]}
          />
        </AdminWrapper>
      </AdminContainer>
    </>
  );
};

export default Admin;
