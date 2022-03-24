import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  GuestContainer,
  GuestH1,
  GuestWrapper,
  GuestCard,
  GuestH2,
  GuestH3,
  GuestP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
  Button,
  GuestEmptyWarn,
  RockerButtons,
  RockerMid
} from "./GuestElements";

const Guest = () => {

  //States
  const [message, setMessage] = useState(null);
  const [messageO, setMessageO] = useState(null);
  const [FirstName, setFName] = useState(null);
  const [LastName, setLName] = useState(null);
  const [Room, setRoom] = useState(null);
  const [Inv, setInv] = useState([]);
  const [check, setcheck] = useState(null);
  const [Ord, setOrd] = useState([]);
  const [OrdErr, setOrdErr] = useState(null);
  const [WOrd, setWOrd] = useState([]);
  var ItemArray =[];

  //Variables
  var Token = Storage.retrieveToken()
  var bp = require("../Path.js");

  //GET ACCOUNT INFO
  var config = {
    method: "get",
    url: bp.buildPath("api/account"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  //GET INVENTORY ITEMS
  var configI = {
    method: "get",
    url: bp.buildPath("api/inventory"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };

  const GuestCardComponentInv = (props) => {
    const [value, setValue] = useState(0);
    const decIvn = async event => {
      setValue(value - 1);
      if (value === 0) {
        setValue(0);
      }
    }
    const incIvn = async event => {
      setValue(value + 1);
    }
    const AddToOrder = async event => {
      if (value !== 0) {
        setOrd(item => [...item, props.items + "#" + props.des + "#" + props.img + "#" + props.id + '#' + value]);
      }
      else {
        setOrdErr('You can\'t order anything');
      }

    }
    return (
        <GuestCard style={{ backgroundImage: `url(${props.img})`, backgroundPosition: "center" }}>
          <GuestH2>{props.items}</GuestH2>
          <GuestP>{props.des}</GuestP>
          <RockerButtons style={{ borderRadius: "8px 8px 0 0", marginTop: "5px" }} onClick={incIvn}>▲</RockerButtons><RockerMid>{value}</RockerMid><RockerButtons style={{ borderRadius: "0 0 8px 8px"}} onClick={decIvn}>▼</RockerButtons>
          <Button onClick={AddToOrder}> Add to Cart</Button>
        </GuestCard>
    );
  };

  //ORDERS CART FOR THIS ROOM
  const GuestCardComponentOrd = (props) => {
    return (
        <GuestCard style={{ backgroundImage: `url(${props.img})` }}>
          <GuestH2>{props.items}</GuestH2>
          <GuestP>{props.des}</GuestP>
        </GuestCard>
    );
  };

  //Get All the Room OrDERS
  var configO = {
    method: "get",
    url: bp.buildPath("api/room"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };

  const GuestCardComponentWOrd = (props) => {
    return (
        <GuestCard style={{ backgroundImage: `url(${props.img})`}}>
          <GuestH2>{props.qun} {props.id}</GuestH2>
        </GuestCard>
    );
  };

  //Method TO ORDER
  const sendOrder = async event => {
    for (let i = 0; i < Ord.length; i++) {
      //Config
      var configSO = {
        method: "get",
        url: bp.buildPath("api/inventory/" + Ord[i].split('#')[3] + "/" + Ord[i].split('#')[4]),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        }
      }

      axios(configSO).then(function (response) {
        var O = response.data;
        if (O.err_code) {
          setMessage(' ' + O.description);
          i = Ord.length;
        } else {
          Ord[i].split('#')[1] = "ORDERED";
          setMessageO("All Things Ordered");
          window.location.reload();
        }
      }).catch(function (error) {
        setMessage(' ' + error);
      });
    }
  }

  //Methoid TO Clear order
  const delOrder = async event => {
    setOrd([]);
  }


  useEffect(async () => {
    // #1
    //Get user info everytime we lode the page
    axios(config).then(function (response) {

      var ud = response.data;

      //Getting info needed for this page
      setFName(ud.first_name);
      setLName(ud.last_name);
      setRoom(ud.room);
    }).catch(function (error) {
      setMessage(' ' + error);
    });
    // #2
    setInv([]);
    //Get user info everytime we lode the page
    axios(configI).then(function (response) {

      var ud = response.data;
      for (var i = 0; i < ud.length; i++) {
        ItemArray[i] = ud[i].name + "#" + ud[i].description + "#" + ud[i].img + "#" + ud[i].item_id;
        setInv(item => [...item, ud[i].name + "#" + ud[i].description + "#" + ud[i].img + "#" + ud[i].item_id]);
      }
    }).catch(function (error) {
      setMessage(' ' + error);
    });
    // 3
    setWOrd([]);
    axios(configO).then(function (response) {
      if (response.data.err_code) {
        setMessage(' ' + response.data.description);
      }
      else {
        var ud = response.data.orders;
        if (ud.length > 0) {
          for (var i = 0; i < ud.length; i++) {
            for(let j = 0; j < ItemArray.length; j++){
              if(ud[i].item_id.toString() === ItemArray[j].split('#')[3]){
                setWOrd(item => [...item, ItemArray[j].split('#')[0] + '#' + ud[i].quantity + '#' + ItemArray[j].split('#')[2]]);
              }
            }
          }
        }

      }
    }).catch(function (error) {
      setMessage(' ' + error);
    })
  }, []);

  //Main Return
  return (
    <GuestContainer id="Guest">
      <FormWrap>
        <FormContent>
          <Form>
            <FormLittle action="#">
              <GuestH3>Room<br/>{Room}</GuestH3>
            </FormLittle>
            <GuestH3>{FirstName} {LastName}</GuestH3>
          </Form>
        </FormContent>
      </FormWrap>
      <GuestH1>Pending Orders</GuestH1>
      <GuestP>{message}</GuestP>
      { (WOrd.length === 0) ? <GuestEmptyWarn>No Pending Orders!</GuestEmptyWarn> : null }
      <GuestWrapper>
        {
          WOrd.map(itm =>
            <GuestCardComponentWOrd id={itm.split('#')[0]} qun={itm.split('#')[1]} img={itm.split('#')[2]}/>
          )
        }
      </GuestWrapper>
      <GuestH1>Your Cart</GuestH1>
      <GuestP>{messageO}</GuestP>
      <Button onClick={sendOrder}>Order</Button>
      <Button onClick={delOrder}>Clear All Orders</Button>
      <GuestWrapper>
        {
          Ord.map(itm =>
            <GuestCardComponentOrd items={itm.split('#')[4] + ' ' + itm.split("#")[0]} des={itm.split("#")[1]} img={itm.split("#")[2]} id={itm.split('#')[3]} />
          )
        }
      </GuestWrapper>

      <GuestH1>Services</GuestH1>
      <GuestP>{OrdErr}</GuestP>
      { (Inv.length === 0) ? <GuestEmptyWarn>No services are available.</GuestEmptyWarn> : null }
      <GuestWrapper>
        {
          Inv.map(itm =>
            <GuestCardComponentInv items={itm.split("#")[0]} des={itm.split("#")[1]} img={itm.split("#")[2]} id={itm.split('#')[3]} />
          )
        }
      </GuestWrapper>

    </GuestContainer>
  );
};

export default Guest;
