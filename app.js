const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const env = require("./configs/index.js");

const { PORT, ORIGIN_URI, MONGO_URI } = env;

const app = express();

//미들웨어
app.use(cors({ origin: ORIGIN_URI, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터

mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
    console.log("서버 시작");
});
