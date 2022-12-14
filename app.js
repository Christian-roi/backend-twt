const express = require("express");
const cors = require("cors");
const app = express();
const { signup, login, post, like, comment, logout } = require('./routes');
const connect = require("./models/index");

connect();

const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", [login, signup, logout, comment, post, like]);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

