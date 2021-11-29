const express = require("express");
const matchController = require("../controllers/matchController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.use("/", auth.verifyToken);

//아티스트 지원서 작성 화면
router.get("/artistMakeApplication/:recruitment_id", matchController.artistMakeApplication);
//아티스트가 호텔 공고에 지원하기
router.post("/artistSendApplication", matchController.artistSendApplication);
//호텔 제안서 작성 화면
router.get("/hotelMakeApplication", matchController.hotelMakeApplication);
//호텔이 아티스트에게 제안 보내기
router.post("/hotelSendApplication", matchController.hotelSendApplication);
//아티스트 보낸 신청, 받은 제안
router.get("/artistMatch", matchController.artistMatch);
//호텔 보낸 제안, 받은 신청
router.get("/hotelMatch", matchController.hotelMatch);
//아티스트 받은 제안 열람
router.post("/artistReadRecieved", matchController.artistReadRecieved);
//호텔 받은 신청 열람
router.post("/hotelReadRecieved", matchController.hotelReadRecieved);

module.exports = router;
