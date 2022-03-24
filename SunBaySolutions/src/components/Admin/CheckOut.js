import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import { confirm } from "react-confirm-box";
import {
    AdminContainer,
    AdminP,
    AdminH1,
    AdminH1_5,
    AdminH1_75,
    AdminH2,
    AdminWrapper,
    AdminWrapperDeux,
    CheckoutCard
} from "./AdminElements";
import {
    Form,
    FormH1,
    FormLabel,
    FormInput,
    CapInput,
    FormButton,
    Button,
    CapButton
} from "./AdminAddInventoryElements";
import { AdminCard, FormButtonDelete } from "./AdminAddInventoryElements";
import {GuestEmptyWarn} from "../Guest/GuestElements";
import Guest from "../Guest";

const phoneNumberIfy = (str) => {
    let num = str.replaceAll(/\D/g, "");
    if (num.length === 10)
        return `(${num.substring(0,3)}) ${num.substring(3,6)}-${num.substring(6)}`;
    else
        return str;
}

const CheckOut = () => {
    var Search = '';
    const [message, setMessage] = useState(null);
    const [messageR, setMessageR] = useState(null);
    var Users = [];
    const [SR, setSR] = useState([]);

    //Variables
    var Token = Storage.retrieveToken();

    //required files
    var bp = require("../Path.js");

    const revert = async => {
        // document.getElementById("formBox").style.display = "grid";
        // document.getElementById("searchResults").style.display = "none";
    }

    const doSearch = async => {
        if (Search.value === '') {
            setMessage("Input guest's name above.");
            setSR([]);
        }
        else {
            setMessage('Loading...');
            // Do the Web request.
            //Get all user data
            var config = {
                method: "post",
                url: bp.buildPath("api/account/search"),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": Token
                },
                data: JSON.stringify({
                    "query": Search.value
                })
            };
            axios(config).then(function (response) {
                var ud = response.data;
                if (ud.err_code) {
                    setMessage(ud.description);
                } else {
                    // We got the data. Set SR with correct user information
                    setMessage("");
                    setSR([]);
                    for (let i = 0; i < ud.length; i++) {
                        if (ud[i].role === "guest") {
                            let dateI = new Date(ud[i].checkin * 1000);
                            let dateO = new Date(ud[i].checkout * 1000);
                            setSR(item => [...item,
                                {
                                    "name": `${ud[i].first_name} ${ud[i].last_name}`,
                                    "room": ud[i].room,
                                    "username": ud[i].username,
                                    "email": ud[i].email,
                                    "phone": ud[i].phone,
                                    "cIn": dateI.toLocaleDateString(),
                                    "cOut": dateO.toLocaleDateString(),
                                    "id": ud[i].user_id
                                }
                            ])
                        }
                    }
                }
            }).catch(function (error) {
                setMessage(' ' + error);
            });

            // if (SR.length < 1){
            //     setMessage("Room is Empty");
            // } else {
            //     setMessage("");
            //     // document.getElementById("formBox").style.display = "none";
            //     // document.getElementById("searchResults").style.display = "block";
            // }
        }
    }

    //Hoe the Searched guest looks
    const AdminCardComponent = (props) => {

        const coGuest = async event => {
            const result = await confirm(`Are you sure you would like to check out user ${props.name}?`, {labels: {
                    confirmable: "Check Out",
                    cancellable: "Cancel"
                }});
            if (result) {

                var configA = {
                    method: "delete",
                    url: bp.buildPath("api/account/" + props.id),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": Token
                    }
                };

                axios(configA).then(function (response) {
                    var ud = response.data;
                    if (ud.err_code) {
                        setMessage(ud.description);
                        setSR([]);
                    }
                }).catch(function (error) {
                    setMessage(' ' + error);
                });

                console.log("You click yes!");
                return;
            }
        }
        return (
            <CheckoutCard>
                <AdminH1_75>{props.name}</AdminH1_75>
                <AdminH2>Username: {props.username}</AdminH2>
                <AdminH2>Room {props.room}</AdminH2>
                <AdminP>📧&#xFE0E; {props.email} | 📞&#xFE0E; {phoneNumberIfy(props.phone)}</AdminP>
                <AdminP>Staying {props.checkin} - {props.checkout}</AdminP>
                <FormButtonDelete class="button" onClick={coGuest}>
                    Check Out
                </FormButtonDelete>
            </CheckoutCard>
        );
    };

    return (
        <AdminContainer>
            <AdminH1_5 style={{marginTop: "45px"}}>Check Out Guest</AdminH1_5>
            <div style={{textAlign: "center", display: "block", margin: "12px auto"}}>
                <CapInput placeholder="Enter name..." type="name" ref={(c) => Search = c} />
                <CapButton onClick={doSearch}>🔍&#xFE0E;</CapButton>
            </div>
            { (message) ? <GuestEmptyWarn>{message}</GuestEmptyWarn> : (SR.length === 0) ? <GuestEmptyWarn>No results (yet!)</GuestEmptyWarn> : null }
            <div id="searchResults">
                <AdminWrapperDeux>
                    {
                        SR.map(itm =>
                                <AdminCardComponent name={itm.name} room={itm.room} username={itm.username} email={itm.email} phone={itm.phone} checkin={itm.cIn} checkout={itm.cOut} id={itm.id} />
                            // <AdminCardComponent name={itm.split('#')[0]} room={itm.split('#')[4]} username={itm.split('#')[3]} email={itm.split('#')[1]} phone={itm.split('#')[2]} checkin={itm.split('#')[6]} checkout={itm.split('#')[7]} id={itm.split('#')[5]} />
                        )
                    }
                </AdminWrapperDeux>
            </div>
        </AdminContainer>
    );
};

export default CheckOut;
