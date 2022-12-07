const express = require("express");
const router = express.Router();
require("dotenv").config();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/logout", authMiddleware, async (req, res) => {
    try {
        res.clearCookie(process.env.COOKIE_NAME);
        return res.status(200).send({
            message: "Logout successful"
        });
    } catch (err) {
        return res.status(400).send({
            errorMessages: "Error",
        });
    }
})

module.exports = router;