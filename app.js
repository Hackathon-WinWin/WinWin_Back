const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const env = require("./configs/index");
const auth = require("./server/routes/auth");
const profile = require("./server/routes/profile");
const portfolio = require("./server/routes/portfolio");
const recruitment = require("./server/routes/recruitment");
const main = require("./server/routes/main");
const match = require("./server/routes/match");
const notification = require("./server/routes/notification");

const { PORT, ORIGIN_URI, MONGO_URI } = env;

const app = express();

//미들웨어
app.use(cors({ origin: ORIGIN_URI, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/portfolio", portfolio);
app.use("/api/recruitment", recruitment);
app.use("/api/main", main);
app.use("/api/match", match);
app.use("/api/notification", notification);

mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
    console.log("서버 시작");
});
