const express = require("express");
const mainController = require("../controllers/mainController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.use("/", auth.verifyToken);

//아티스트 메인 첫 화면 공고 목록
router.get("/artistMainFirstPage", mainController.artistMainFirstPage);

//호텔 메인 첫 화면 포트폴리오 목록
router.get("/hotelMainFirstPage", mainController.hotelMainFirstPage);

module.exports = router;
