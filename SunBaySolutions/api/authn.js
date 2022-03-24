// References:
// https://stackoverflow.com/questions/47515991/how-to-setup-an-authentication-middleware-in-express-js#47516387
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const jwt = require('jsonwebtoken');

module.exports.isAuthorized  = (req, res, next) => {
    let token;
    // Cookie stuffs
    let cookieJar = {}
    if (req.headers.cookie) {
        let cookieArr = req.headers.cookie.split(";");
        for (let i in cookieArr) {
            cookieArr[i] = cookieArr[i].trim();
            let splitter = cookieArr[i].split("=");
            cookieJar[splitter[0]] = splitter[1];
        }
    }

    let bearer;
    if (req.headers.authorization) {
        bearer = req.headers.authorization.replace("Bearer ", "");
    } else if (cookieJar.session) {
        bearer = cookieJar.session.replace("%20", " ").replace("Bearer ", "");
    }

    if (!bearer) return res.status(401).json(errGen(401));

    jwt.verify(bearer, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json(errGen(403, "Session expired."));
        req.user = user;
        if (user.created && (user['login-ref'] === "renewal" || user['login-ref'] === "password") && user.created - Date.now() >= 600000) {
            // Re-generate JWT in cookies automatically (if qualified for a renewal).
            const token = jwt.sign({
                'username': username,
                'role': acc.toLowerCase(),
                'id': id,
                'login-ref': "renewal",
                'created': Date.now()
            }, process.env.JWT_SECRET, {expiresIn: lifetime});
            res.cookie('session', 'Bearer ' + token, {expire: lifetime + Date.now()});
        }
        return next();
    });
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.user) return res.status(500).json(errGen(500, "Middleware call in wrong order."));
    if (req.user.role !== "admin") return res.status(403).json(errGen(403, "Endpoint restricted to Admin."));
    return next();
}

module.exports.isStaff = (req, res, next) => {
    if (!req.user) return res.status(500).json(errGen(500, "Middleware call in wrong order."));
    if (req.user.role === "employee" || req.user.role === "admin") return next();
    return res.status(403).json(errGen(403, "Endpoint restricted to Staff."));
}
