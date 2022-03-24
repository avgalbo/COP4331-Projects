// Init
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;
let path = require('path');
let cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));


// const request = require("request");
const async = require("async");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require('axios');
const FormData = require('form-data');
dotenv.config();

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.JWT_SECRET) {
    console.error("[ERROR] Environment variables are not set!");
    console.debug(`[DEBUG] JWT_SECRET=${process.env.DB_USERNAME}`);
    console.debug(`[DEBUG] DB_USERNAME=${process.env.DB_USERNAME}`);
    try {
        console.debug(`[DEBUG] DB_PASSWORD=${(process.env.DB_PASSWORD).substring(0, 3)}**********`);
    } catch(err) {
        console.debug(`[DEBUG] DB_PASSWORD=(null)`);
    }
}
if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
    console.info('[INFO] Loaded Twilio support.');
    global.twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
}
if (process.env.SENDGRID_TOKEN) {
    console.info('[INFO] Loaded SendGrid support.');
    global.sendgrid = require('@sendgrid/mail');
    global.sendgrid.setApiKey(process.env.SENDGRID_TOKEN);
}
// security guard
if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 40) {
    console.error("[WARNING] The JWT secret defined is not secure enough! If the secret is guessable, you might as well not have passwords! Remedy this ASAP.");
}

// DB schema -> API schema converters.
global.accountGen = (dbObj) => {
    return {
        "user_id": dbObj.UserID,
        "role": dbObj.AccountType.toLowerCase(),
        "checkin": dbObj.CheckInDate,
        "checkout": dbObj.CheckOutDate,
        "room": dbObj.RoomNumber,
        "username": dbObj.Login,
        "password": "**********",
        "first_name": dbObj.FirstName,
        "last_name": dbObj.LastName,
        "email": dbObj.Email,
        "phone": dbObj.PhoneNumber
    }
}
global.backwardsAccountGen = (apiObj) => {
    let tmp = {};
    if (apiObj.user_id) tmp.UserID = apiObj.user_id;
    if (apiObj.checkin) tmp.CheckInDate = apiObj.checkin;
    if (apiObj.checkout) tmp.CheckOutDate = apiObj.checkout;
    if (apiObj.room) tmp.RoomNumber = apiObj.room;
    if (apiObj.username) tmp.Login = apiObj.username;
    if (apiObj.password) tmp.Password = apiObj.password;
    if (apiObj.first_name) tmp.FirstName = apiObj.first_name;
    if (apiObj.last_name) tmp.LastName = apiObj.last_name;
    if (apiObj.email) tmp.Email = apiObj.email;
    if (apiObj.phone) tmp.PhoneNumber = apiObj.phone;
    if (apiObj.role) tmp.AccountType = apiObj.role.toLowerCase();
    return tmp;
}
global.inventoryGen = (dbObj) => {
    return {
        "item_id": dbObj.Item_ID,
        "name": dbObj.Name,
        "description": dbObj.Description,
        "img": dbObj.IMG,
        "quantity": dbObj.Quantity
    }
}
global.orderGen = (dbObj) => {
    return {
        "order_id": dbObj.Order_ID ? dbObj.Order_ID : -1,
        "room_id": dbObj.Room_ID ? dbObj.Room_ID : "",
        "staff": dbObj.Staff ? dbObj.Staff : -1,
        "item_id": dbObj.Item_ID ? dbObj.Item_ID : -1,
        "quantity": dbObj.Quantity ? dbObj.Quantity : 1,
        "guest": dbObj.Guest ? dbObj.Guest : -1
    }
}
global.roomGen = (dbObj) => {
    let apiObj = {
        "room_id": dbObj.RoomID,
        "occupant": dbObj.Occupant,
        "floor": dbObj.Floor,
        "orders": []
    }
    if (dbObj.Orders)
        for (let i = 0; i < dbObj.Orders.length; i++) {
            apiObj.orders[i] = orderGen(dbObj.Orders[i]);
        }
    return apiObj;
}

// Create API-compliant error objects.
global.errGen = (errCode, str) => {
    let desc;
    if (!str) {
        if (errCode == 400) desc = "Asset already exists.";
        else if (errCode == 401) desc = "You are not logged in.";
        else if (errCode == 403) desc = "You do not have permission to view this asset.";
        else if (errCode == 404) desc = "Asset not found.";
        else if (errCode >= 400 && errCode < 500) desc = "Malformed request.";
        else if (errCode >= 500 && errCode < 600) desc = "The server is having some issues. Please report this!";
        else if (errCode == 200) desc = "Success!";
        else desc = "Something bad happened."
    } else {
        desc = str;
    }
    return {
        "err_code": errCode,
        "description": desc
    }
}

global.INSTANCE_URL = "https://hospitalityplatform.herokuapp.com";

// Incrementing user IDs.
// Originally from below link but probably doesn't resemble it at all after fixes:
// https://stackoverflow.com/questions/49500551/insert-a-document-while-auto-incrementing-a-sequence-field-in-mongodb
global.getNextSequence = async (db, counterName) => {
    let query = await db.collection('counters').findOneAndUpdate(
        {
            _id: counterName
        },
        {
            "$inc": {seq: 1},
        }
    ).catch(err => {
        console.error(err);
        throw err;
    });
    return query.value.seq;
}

global.createShortlink = (long_url) => {
    const host = "https://o.divi.sh/";
    if (process.env.SHORTLINK_KEY) {
        // Theoretically possible, but statistically unlikely, to be a duplicate.
        let short_url = `hosp_${Buffer.from(String(Math.floor(Math.random() * 999999999))).toString('base64').replace(/=/g, "")}`;

        const formData = new FormData();
        formData.append("long", long_url);
        formData.append("short", short_url);

        axios.post(host + process.env.SHORTLINK_KEY, formData, { headers: formData.getHeaders() }).then(response => {
        }).catch(function (error) {
            console.error(error);
        });

        return `${host}${short_url}`;
    } else {
        return `${host}/undefined`;
    }
}

// Note: make sure you authenticate correctly!
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qaihg.mongodb.net/HotelManagement?retryWrites=true&w=majority`;
const db_client = new MongoClient(uri, { useNewUrlParser: true });
db_client.connect().then((client) => {
    let api = require('./api.js');
    api.setApp( app, db_client );

    app.listen(port);
    console.info("[INFO] MongoDB connected!");
    console.log(`[HospitalityPlatform] Server running on port ${port}`);



    // Web server stuff.
    app.all("*", (req, res) => {
        const options = {
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }
        const file = path.resolve(__dirname, '..', 'build', 'index.html');
        res.sendFile(file);
    })
});
