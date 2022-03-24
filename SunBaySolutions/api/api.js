const jwt = require('jsonwebtoken');
const authn = require('./authn');
const bcrypt = require("bcrypt");
const { get } = require('http');

exports.setApp = function (app, db_client) {

    // ======================Account Endpoints=========================
    // Register                      v only admin can create reservations!
    app.post("/api/account/create", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        let { username, first_name, last_name, email, phone, role, checkin, checkout, room, password } = req.body;
        phone = phone.replace(/\D/g, '');
        const db = db_client.db();
        const results = await
            // search if username already exists
            db.collection('Accounts').find({
                $or: [
                    { Login: username },
                    { Email: email },
                    { PhoneNumber: phone }
                ]
            }).toArray();
        console.log(results);
        if (results.length > 0) {
            return res.status(400).json(errGen(400, "Username, Email, or Phone Number Taken"));
        } else {
            let setPasswd = "";
            if (password && password.trim() !== "") {
                setPasswd = await hashPassword(password);
            }
            let newUser = {
                AccountType: role ? role : "Guest",
                Login: username,
                // Use plain-text mode to make sure session lifetimes are shortened.
                // As soon as the password is changed, users should re-log.
                Password: setPasswd,
                FirstName: first_name,
                LastName: last_name ? last_name : "",
                Email: email,
                PhoneNumber: phone,
                RoomNumber: room ? room : "",
                CheckInDate: checkin ? checkin : -1,
                CheckOutDate: checkout ? checkout : -1,
                UserID: await getNextSequence(db, "userid")
            };
            let createAction = await db.collection('Accounts').insertOne(newUser);

            // Send SMS to get user to create account.
            if (global.twilio || global.sendgrid) {
                const hotelInfo = await db.collection('Hotel_Detail').find({}).toArray();
                if (setPasswd !== "") {
                    let message = `Hello, ${first_name}! Your account at ${hotelInfo[0].Name} has been created! Visit ${INSTANCE_URL} to get started.`;
                    if (global.twilio) {
                        global.twilio.messages
                            .create({
                                body: message,
                                from: '+14073052775',
                                to: '+1' + phone
                            });
                    }
                    if (global.sendgrid) {
                        let html = `<html><head><style>* {font-family: "Ubuntu", sans-serif}</style></head><body><h1>${hotelInfo[0].Name}</h1><p>${message}</p></body></html>`;
                        const payload = {
                            to: email, // Change to your recipient
                            from: 'noreply@shuga.co', // Change to your verified sender
                            name: first_name + " " + (last_name ? last_name : ""),
                            subject: `Welcome to ${hotelInfo[0].Name}!`,
                            text: message,
                            html: html,
                        }
                        global.sendgrid.send(payload).then((response) => {
                            console.log(response[0].statusCode)
                            console.log(response[0].headers)
                        }).catch((error) => {
                            console.error(error)
                        });
                    }
                } else {
                    const hotelInfo = await db.collection('Hotel_Detail').find({}).toArray();
                    // Create shortlink via Senko
                    let url = `${INSTANCE_URL}/onboarding?username=${username}`;
                    if (process.env.SHORTLINK_KEY) {
                        url = createShortlink(url);
                    }
                    // Send the link
                    let message = `Hello, ${first_name}! You are almost ready to stay at ${hotelInfo[0].Name}! Please visit ${url} to create your account.`;
                    if (global.twilio) {
                        global.twilio.messages
                            .create({
                                body: message,
                                from: '+14073052775',
                                to: '+1' + phone
                            });
                    }
                    if (global.sendgrid) {
                        let html = `<html><head><style>* {font-family: "Ubuntu", sans-serif}</style></head><body><h1>${hotelInfo[0].Name}</h1><p>Hello, ${first_name}!</p><p>You are almost ready to stay at ${hotelInfo[0].Name}!</p><p>Please click <a href="${url}">here</a> to create your account.</p></body></html>`;
                        const payload = {
                            to: email, // Change to your recipient
                            from: process.env.NOREPLY_EMAIL, // Change to your verified sender
                            name: first_name + " " + (last_name ? last_name : ""),
                            subject: `Welcome to ${hotelInfo[0].Name}!`,
                            text: message,
                            html: html,
                        }
                        global.sendgrid.send(payload).then((response) => {
                            console.log(response[0].statusCode)
                            console.log(response[0].headers)
                        }).catch((error) => {
                            console.error(error)
                        });
                    }
                }
            }

            let user_data_api_compliant = accountGen(createAction.ops[0]);
            delete user_data_api_compliant.password;
            return res.status(200).json(user_data_api_compliant);
        }
    })

    // List all accounts.
    app.get("/api/account/all", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        const db = db_client.db();
        const results = await
            db.collection('Accounts').find({}).toArray();
        let formatted = []
        for (let i = 0; i < results.length; i++) {
            formatted[i] = accountGen(results[i]);
            delete formatted[i].password;
        }
        return res.status(200).json(formatted);
    })

    // List all accounts by search term.
    app.post("/api/account/search", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        let { query } = req.body;
        console.log(query)
        const db = db_client.db();
        let regexQuery = new RegExp(`^${query}*`, "i");
        const results = await
            // db.collection('accounts').find({
            //     $expr:{$eq:[/^Jeffrey*/i, {$concat:["FirstName", "LastName"]}]}
            // }).toArray();
            // db.collection('Accounts').find({FirstName: {$regex: "^Jeffrey*"}}).toArray();
            db.collection('Accounts').find({
                $or: [
                    {FirstName: {$regex: regexQuery}},
                    {LastName: {$regex: regexQuery}}
                ]
            }).toArray();
        console.log(results);
        let formatted = []
        for (let i = 0; i < results.length; i++) {
            formatted[i] = accountGen(results[i]);
            delete formatted[i].password;
        }
        return res.status(200).json(formatted);
    })

    // Login
    app.post("/api/account/login", async (req, res, next) => {
        // grab login and password from request
        const { username, password } = req.body;
        let lifetime = 10800000;
        let is_plaintext_mode = false;

        const db = db_client.db();
        // Once createAccount has been implemented, we should instead search for
        //      only the login and verify the password with bcrypt.
        const results = await
            db.collection('Accounts').find({ Login: username }).toArray();

        if (results.length > 0) {
            // Substantially neuter the token lifetime if logging in via "plain-text mode"
            if (results[0].Password !== "$" && results[0].Password.length !== 60) {
                lifetime = 600000;
                is_plaintext_mode = true;
            }

            let acc = results[0].AccountType;
            let id = results[0].UserID;

            if (is_plaintext_mode) {
                // CRY!
                if (results[0].Password === password) {
                    let accountData = accountGen(results[0]);
                    delete accountData['password'];
                    // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
                    const token = jwt.sign({
                        'username': username,
                        'role': acc.toLowerCase(),
                        'id': id,
                        'login-ref': "first_access",
                        'created': Date.now()
                    }, process.env.JWT_SECRET, { expiresIn: lifetime });
                    res.cookie('session', 'Bearer ' + token, { expire: lifetime + Date.now() });
                    accountData['token'] = "Bearer " + token;
                    accountData['notice'] = "Please change your password immediately using PATCH /account/";
                    return res.status(200).json(accountData);

                } else {
                    return res.status(401).json(errGen(401));
                }
            } else {
                bcrypt.compare(password, results[0].Password, (err, result) => {
                    // If hash works, let it through
                    if (result) {
                        let accountData = accountGen(results[0]);
                        delete accountData['password'];
                        const token = jwt.sign({
                            'username': username,
                            'role': acc.toLowerCase(),
                            'id': id,
                            'login-ref': "password",
                            'created': Date.now()
                        }, process.env.JWT_SECRET, { expiresIn: lifetime });
                        res.cookie('session', 'Bearer ' + token, { expire: lifetime + Date.now() });
                        accountData['token'] = "Bearer " + token;
                        return res.status(200).json(accountData);
                    } else {
                        return res.status(401).json(errGen(401));
                    }
                });
            }
        } else return res.status(401).json(errGen(401));
    })

    // Password reset.
    app.get("/api/account/letmein/:phone", async (req, res, next) => {
        // Send SMS to get user to create account.
        if (global.twilio || global.sendgrid) {
            const db = db_client.db();
            const results = await
                db.collection('Accounts').find({ PhoneNumber: req.params.phone.replace(/\D/g, '') }).toArray();

            // If the phone number exists, silently fail.
            if (results.length <= 0)
                return res.status(200).json(errGen(200, "We have sent the phone number on file a password reset request."));
            else
                // If it does work, we NEED to send it at the SAME TIME as the failure, or else a hacker can use this to test for accounts.
                res.status(200).json(errGen(200, "We have sent the phone number on file a password reset request."));

            let accountData = accountGen(results[0]);

            // Create JWT that will last a half-hour.
            let lifetime = 1800000;
            const token = jwt.sign({
                'username': accountData.username,
                'role': accountData.role,
                'id': accountData.user_id,
                'login-ref': "password_reset",
                'created': Date.now()
            }, process.env.JWT_SECRET, { expiresIn: lifetime });

            let url = `${INSTANCE_URL}/letmein?token=${token}`;
            if (process.env.SHORTLINK_KEY) {
                url = createShortlink(url);
            }

            const hotelInfo = await db.collection('Hotel_Detail').find({}).toArray();

            if (global.twilio) {
                // Send the link
                let message = `Hello, ${accountData.first_name}! We have received a password request for your account at ${hotelInfo[0].Name}. `
                    + `Visit ${url} in the next thirty minutes to reset it, or do nothing and your password will not be changed.`;
                global.twilio.messages
                    .create({
                        body: message,
                        from: '+14073052775',
                        to: '+1' + accountData.phone
                    });
            }
            if (global.sendgrid) {
                let msg = `<html><head><style>* {font-family: "Ubuntu", sans-serif}</style></head><body><h1>${hotelInfo[0].Name}</h1><p>Hello ${accountData.first_name},</p><p>We have received a password reset request for your account. Please <a href="${url}">click here</a> in the next thirty minutes to reset it.</p><p>If you did not request a password reset, you can safely ignore this message.</p></body></html>`;
                const payload = {
                    to: accountData.email, // Change to your recipient
                    from: process.env.NOREPLY_EMAIL, // Change to your verified sender
                    name: accountData.first_name + " " + accountData.last_name,
                    subject: `Password Reset at ${hotelInfo[0].Name}`,
                    text: `Hello, ${accountData.first_name}! We have received a password request for your account at ${hotelInfo[0].Name}. `
                        + `Visit ${url} in the next thirty minutes to reset it, or do nothing and your password will not be changed.`,
                    html: msg,
                }
                global.sendgrid.send(payload).then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                }).catch((error) => {
                    console.error(error)
                });
            }
        } else {
            return res.status(501).json("This server is not configured to allow password resets.");
        }
    });



    // Get account data.
    app.get("/api/account/", authn.isAuthorized, async (req, res, next) => {
        const db = db_client.db();
        const results = await
            db.collection('Accounts').find({ Login: req.user.username }).toArray();
        let accountData = accountGen(results[0]);
        // We don't want to return the password lol
        delete accountData.password;
        return res.status(200).json(accountData);
    });

    app.patch("/api/account/", authn.isAuthorized, async (req, res, next) => {
        const db = db_client.db();

        const body = req.body;

        // A user should not change these properties (even if priv'd):
        delete body.user_id;
        delete body.role;
        delete body.checkin;
        delete body.checkout;
        delete body.room;

        if (body.phone)
            body.phone = body.phone.replace(/\D/g, '');

        if (body.password) {
            // Change password.
            body.password = await hashPassword(body.password);
        }

        let databaseIfy = backwardsAccountGen(body);

        // Check if valid.
        const doesItExistAlready = await
            // search if username already exists
            db.collection('Accounts').find({
                $or: [
                    { Login: body.username },
                    { Email: body.email },
                    { PhoneNumber: body.phone }
                ]
            }).toArray();
        if (doesItExistAlready.length > 0) {
            if (
                (body.username && body.username === doesItExistAlready[0].Login)
                || (body.phone && body.phone === doesItExistAlready[0].PhoneNumber)
                || (body.email && body.email === doesItExistAlready[0].Email)
            )
                return res.status(400).json(errGen(400, "Username, Email, or Phone Number Taken"));
        }

        await db_client.db().collection('Accounts').findOneAndUpdate({ Login: req.user.username }, { $set: databaseIfy });
        // Note: this is not as runtime-efficient as the inventory PATCH, just because of the extra DB call.
        // However, it's a lot more readable, so consider the trade-offs there.
        const results = await db.collection('Accounts').find({ Login: req.user.username }).toArray();
        let accountData = accountGen(results[0]);
        // We don't want to return the password lol
        delete accountData.password;
        return res.status(200).json(accountData);
    });
    // ==================End of Account Endpoints======================


    // ======================Admin Endpoints===========================
    // Get room information by room Number
    app.get("/api/room/:room_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        const db = db_client.db();
        const results = await
            // search if room exists
            db.collection('Room').find({ RoomID: req.params.room_id }).toArray();
        console.log(results);
        if (results.length > 0) {
            let roomData = roomGen(results[0]);
            return res.status(200).json(roomData);
        }
        else
            return res.status(404).json(errGen(404, "Room Not Found"));
    })

    // Create room with given room number, if it does not yet exist
    app.post("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        const { floor } = req.body;
        const room_id = req.params.room_id;
        const db = db_client.db();
        const results = await
            // search if room exists
            db.collection('Room').find({ RoomID: room_id }).toArray();
        console.log(results);
        if (results.length > 0) {
            return res.status(400).json(errGen(400, "Room Occupied"));
        }
        else {
            let newRoom = {
                RoomID: room_id,
                Floor: floor,
                Orders: [],
                Occupant: -1
            };
            let createAction = await db.collection('Room').insertOne(newRoom);

            return res.status(200).json(roomGen(createAction.ops[0]));
        }
    })

    // Edit a preexisting room
    app.patch("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        const db = db_client.db();
        const { occupant, orders, floor } = req.body;
        const results = await
            // search if room exists
            db.collection('Room').findOneAndUpdate({ RoomID: req.params.room_id },
                { $set: { Occupant: occupant, Orders: orders, Floor: floor } }, { returnOriginal: false });
        console.log(results);
        let roomData = results.value;
        console.log(roomData);
        if (roomData == null) {
            return res.status(404).json(errGen(404, "Room not Found"));
        }
        else {
            return res.status(200).json(roomGen(roomData));
        }
    })

    // Delete an account
    app.delete("/api/account/:account_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        let accID = Number(req.params.account_id);
        if (isNaN(accID))
            return res.status(400).json(errGen(400, "Invalid account ID"));
        const db = db_client.db();
        const results = await
            // search if account exists
            db.collection('Accounts').find({ UserID: accID }).toArray();
        console.log(results);
        if (results.length > 0) {
            db.collection('Accounts').deleteOne({ UserID: accID });
            return res.status(200).json(errGen(200));
        }
        else
            return res.status(404).json(errGen(404, "Account Not Found"));
    })

    // Delete a room
    app.delete("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        const db = db_client.db();
        const results = await
            // search if room exists
            db.collection('Room').find({ RoomID: req.params.room_id }).toArray();
        console.log(results);
        if (results.length > 0) {
            db.collection('Room').deleteOne({ RoomID: req.params.room_id });

            return res.status(200).json(errGen(200));
        }
        else
            return res.status(404).json(errGen(404, "Room Not Found"));
    })

    // Get all rooms on a given floor
    app.get("/api/floor/:floor_number", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        const db = db_client.db();
        const results = await
            // search if there are rooms located on the floor
            db.collection('Room').find({ Floor: Number(req.params.floor_number) }).toArray();
        console.log(results);
        if (results.length > 0) {
            let floorData = [];
            for (let i = 0; i < results.length; i++)
                floorData[i] = roomGen(results[i]);
            return res.status(200).json(floorData);
        }
        else
            return res.status(404).json(errGen(404, "No Rooms on this Floor"));
    })

    // Get all rooms on all floors.
    app.get("/api/floor/", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        const db = db_client.db();
        const results = await
            // search if there are rooms located on the floor
            db.collection('Room').find({}).toArray();
        if (results.length > 0) {
            let floorData = [];
            for (let i = 0; i < results.length; i++)
                floorData[i] = roomGen(results[i]);
            return res.status(200).json(floorData);
        }
        else
            return res.status(404).json(errGen(404, "No rooms on any floors."));
    })

    // Add Item to Inventory
    app.post("/api/inventory", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        // Admin guard: authn.isAdmin. Requires isAuthorized to be called FIRST; Order matters a lot here!
        // Can be replaced with isStaff to check if an endpoint is available for staff and admin (not guest).

        let { name, description, img, quantity } = req.body;
        if (!name) return res.status(403).json(errGen(403, 'Missing "name" field in request.'));
        if (!description) description = "";
        if (!img) img = "";
        if (!quantity) quantity = -1;

        const db = db_client.db();

        // What will end up in the DB, sans item ID.
        const obj = {
            // The await is VERY important.
            "Item_ID": await getNextSequence(db, "itemid"),
            "Name": name,
            "Description": description,
            "IMG": img,
            "Quantity": quantity
        };

        // Insert, format, and then return.
        db.collection('Inventory').insertOne(obj).then((out) => {
            const results = out.ops[0];
            return res.status(200).json(inventoryGen(results));
        }).catch((err) => {
            return res.status(500).json(errGen(500, err));
        });
    })

    // Delete Item from Inventory
    app.delete("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
        let inventory_id = req.params.inventory_id;
        try {
            inventory_id = Number(inventory_id);
            if (isNaN(inventory_id))
                return res.status(400).json(errGen(400, "Invalid item ID."));
        } catch (err) {
            // If we can't cast a number
            return res.status(400, "Invalid item ID.");
        }
        db_client.db().collection('Inventory').deleteOne({ Item_ID: inventory_id }).then((out) => {
            if (out.deletedCount === 0)
                return res.status(200).json(errGen(200, "No items deleted."));
            return res.status(200).json(errGen(200, "Item successfully deleted."));
        }).catch((err) => {
            return res.status(500).json(errGen(500, err));
        });
    });

    //
    app.patch("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        // Get inventory ID and validate it is, indeed, a number.
        let inventory_id = req.params.inventory_id;
        try {
            inventory_id = Number(inventory_id);
            if (isNaN(inventory_id))
                return res.status(400).json(errGen(400, "Invalid item ID."));
        } catch (err) {
            // If we can't cast a number
            return res.status(400, "Invalid item ID.");
        }

        const { name, quantity, description, img } = req.body;
        let newObj = {}
        // Properties staff AND admin can edit.
        if (quantity) newObj.Quantity = quantity;
        // Properties ONLY admin can edit.
        if (req.user.role === "admin") {
            if (name) newObj.Name = name;
            if (description) newObj.Description = description;
            if (img) newObj.IMG = img;
        }

        // This is a good candidate for refactoring. See PATCH /account/ for a good(???) example.
        db_client.db().collection('Inventory').findOneAndUpdate({ Item_ID: inventory_id }, { $set: newObj })
            .then((out) => {
                // crappy union
                if (newObj.Quantity) out.value.Quantity = newObj.Quantity;
                if (newObj.Name) out.value.Name = newObj.Name;
                if (newObj.Description) out.value.Description = newObj.Description;
                if (newObj.IMG) out.value.IMG = newObj.IMG;

                return res.status(200).json(inventoryGen(out.value));
            })
            .catch((err) => {
                if (err.toString() === "TypeError: Cannot read property 'Item_ID' of null")
                    return res.status(500).json(errGen(500, "Entity does not exist."));
                return res.status(500).json(errGen(500, err.toString()));
            });
    });

    // Get Hotel's metadata
    app.use('/api/hotel', async (req, res, next) => {
        var error = '';

        const db = db_client.db();
        const results = await db.collection('Hotel_Detail').find({}).toArray();

        if (results.length > 0) {
            return res.status(200).json({
                "name": results[0].Name,
                "color": results[0].Color,
                "bkgd": results[0].Background,
                "desc": results[0].Description
            })
        } else {
            return res.status(500).json(errGen(500, "Hotel is AWOL."));
        }
    });
    // ==================End of Admin Endpoints========================


    // ======================Guest Endpoints===========================
    // List all Items from Inventory
    app.get("/api/inventory", authn.isAuthorized, async (req, res, next) => {
        const db = db_client.db();
        const results = await
            db.collection('Inventory').find({}).toArray();
        let formatted = []
        for (let i = 0; i < results.length; i++) {
            formatted[i] = inventoryGen(results[i]);
        }
        return res.status(200).json(formatted);
    })

    // Get Current Room Information
    app.get("/api/room", authn.isAuthorized, async (req, res, next) => {
        let username = req.user.username;
        const db = db_client.db();
        const results = await
            db.collection('Accounts').find({ Login: username }).toArray();
        let formatted = accountGen(results[0]);
        if (formatted.role !== "guest")
            return res.status(405).json(errGen(405, "Feature can be only used as guests"))
        let getRoomNum = formatted.room;
        if (getRoomNum === "")
            return res.status(404).json(errGen(404, "Asset not found"))
        const roomResult = await
            db.collection('Room').find({ RoomID: getRoomNum }).toArray();
        let room = roomGen(roomResult[0]);
        return res.status(200).json(room)
    })

    // Orders an inventory item to a user's room
    app.get("/api/inventory/:inventory_id/:quantity", authn.isAuthorized, async (req, res, next) => {
        let itemID = Number(req.params.inventory_id);
        let quantity = Number(req.params.quantity);
        let staff = -1
        let guest = req.user.id

        // This should
        if (isNaN(itemID) || isNaN(quantity))
            return res.status(400).json(errGen(400, "Invalid ID or quantity given."));

        const db = db_client.db();

        // Get users' room. (Look Ma, no hands!)
        let roomReq = await db.collection('Accounts').find({ UserID: Number(req.user.id) }).toArray();
        let roomID = roomReq[0].RoomNumber;

        // What will end up in the DB, sans order ID.
        const obj = {
            // The await is VERY important.
            "Order_ID": await getNextSequence(db, "orderid"),
            "Item_ID": itemID,
            "Guest": guest,
            "Room_ID": roomID,
            "Staff": staff,
            "Quantity": quantity
        };

        // Insert into users' room.
        let roomUpdate = db.collection('Room').findOneAndUpdate({ RoomID: roomID }, {
            $addToSet: {
                Orders: obj
            }
        });

        // Insert, format, and then return.
        db.collection('Order').insertOne(obj).then((out) => {
            const results = out.ops[0];
            return res.status(200).json(orderGen(results));
        }).catch((err) => {
            // Just an FWI: I know I'm not immune to this, but exposing exact errors like this can give theoretical actors
            // hints about how the system operates and potentially abuse it.
            // However, since this /is/ open-source, this could be done anyways.
            return res.status(500).json(errGen(500, err));
        });
    })

    // Get information on a specific inventory entry
    app.get("/api/inventory/:inventory_id", authn.isAuthorized, async (req, res, next) => {
        let inventory_id = req.params.inventory_id
        try {
            inventory_id = Number(inventory_id);
            if (isNaN(inventory_id))
                return res.status(400).json(errGen(400, "Invalid item ID."));
        } catch (err) {
            // If we can't cast a number
            return res.status(400, "Invalid item ID.");
        }
        const db = db_client.db()
        const results = await
            db.collection('Inventory').find({ Item_ID: inventory_id }).toArray();
        if (results.length > 0) {
            let formatted = inventoryGen(results[0]);
            return res.status(200).json(formatted);
        } else
            return res.status(404).json(errGen(404, "Asset not found"))
    });
    // ==================End of Guest Endpoints========================


    // ======================Staff Endpoints===========================
    // Get Active orders from logged in user's orders
    app.get("/api/orders/my", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        let staff = req.user.id
        const db = db_client.db();
        const results = await
            db.collection('Order').find({ Staff: staff }).toArray();
        if (results.length < 1)
            return res.status(200).json(errGen(200, "No active orders"));
        let formatted = [];
        for (let i = 0; i < results.length; i++) {
            formatted[i] = orderGen(results[i]);
        }
        return res.status(200).json(formatted);
    })
    // Get list of unclaimed orders
    app.get("/api/orders/unclaimed", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        let unclaim = -1;
        const db = db_client.db();
        const results = await
            db.collection('Order').find({ Staff: unclaim }).toArray();
        if (results.length < 1)
            return res.status(200).json(errGen(200, "No unclaimed orders"));
        let formatted = [];
        for (let i = 0; i < results.length; i++) {
            formatted[i] = orderGen(results[i]);
        }
        return res.status(200).json(formatted);
    })
    // Claim an order by its order ID
    app.get("/api/orders/claim/:order_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        try {
            let order_id = Number(req.params.order_id);
            const db = db_client.db();
            let user = Number(req.user.id);
            await db.collection('Order').findOneAndUpdate({ Order_ID: order_id }, { $set: { Staff: user } });
            const results = await db.collection('Order').find({ Order_ID: order_id }).toArray();
            let order = orderGen(results[0]);
            // If the staff member on the order is what is intended (aka success), return.
            if (order.staff === user) {
                // Plop into user's room and then return.
                // Insert into users' room. Something something "non-relational database"
                let roomUpdate = await db.collection('Room').findOneAndUpdate({ RoomID: order.room_id }, {
                    $set: {
                        "Orders.$[element].Staff": user
                    }
                }, { multi: true, arrayFilters: [{ "element.Order_ID": { $eq: order_id } }] });

                return res.status(200).json(order);
            }
            // The order wasn't updated. So panic.
            return res.status(500).json(errGen(500));
        } catch (err) {
            return res.status(404).json(errGen(404, "Order not found."));
        }
    });
    // Fulfill an order by its order ID
    app.delete("/api/orders/fulfill/:order_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
        let order_id = Number(req.params.order_id);
        if (isNaN(order_id))
            return res.status(400).json(errGen(400), "Invalid Order ID")

        const db = db_client.db();
        // Let's save this before we delete it... we need the Room ID from it.
        let before = await db.collection('Order').findOneAndDelete({ Order_ID: order_id });
        const result = await db.collection('Order').find({ Order_ID: order_id }).toArray();

        // Remove from room as well.
        let roomUpdate = await db.collection('Room').findOneAndUpdate({ RoomID: before.value.Room_ID }, {
            $pull: {
                Orders: { "Order_ID": order_id }
            }
        });
        console.log(roomUpdate)

        if (result.length < 1) {
            return res.status(200).json(errGen(200));
        }
        return res.status(500).json(errGen(500));
    });
    // ==================End of Staff Endpoints========================



    // bcrypt hash password function for POST/api/createAcc
    const hashPassword = async (password, saltRounds = 10) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            // hash password
            return await bcrypt.hash(password, salt)
        } catch (err) {
            console.log(err);
        }
        // return null if error
        return null
    }

}
