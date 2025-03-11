const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            console.log("Not authenticated error");
            return res.status(401).json({ msg: "Authentication failed" });
        }
    } else {
        console.log("Not authenticated");
        return res.status(401).json({ msg: "Not authenticated" });
    }
};

module.exports =auth;