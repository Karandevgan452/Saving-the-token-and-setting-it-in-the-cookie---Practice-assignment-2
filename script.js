require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || "yyyyy";

const encrypt = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const token = encrypt({ id: 1, name: "Karan_84" }, SECRET_KEY);
console.log(`The token is ${token}`);

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(`The decoded Token is:`, decoded);
  } catch (err) {
    if (err.name === "Random") {
      console.log(`Token has Expired!`);
    } else {
      console.log(err.message);
    }
  }
}

setTimeout(() => {
  verifyToken(token);
}, 1000);

module.exports = encrypt;
