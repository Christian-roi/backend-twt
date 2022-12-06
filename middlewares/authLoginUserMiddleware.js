
require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const cookies = req.cookies[process.env.COOKIE_NAME];
        if(cookies){
            // refresh token
            const token = cookies.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userData = decoded;

            const expires = new Date();
            expires.setDate(expires.getMinutes() + 60);

            const newToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET_KEY);

            res.cookie(process.env.COOKIE_NAME, `Bearer ${newToken}`, {
                expires: expires,
            });

            return res.status(200).send({
                message: "Refresh token successful",
                token: newToken,
            });

        }
        next();
    } catch(err){
        console.trace(err);
        return res.status(400).send({
            errorMessages: "Invalid token",
        });
    }
};
