const express = require("express");
const notificationController = require("../controllers/notificationController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.use("/", auth.verifyToken);

//아티스트 알림 목록
router.get("/artistNotification", notificationController.artistNotification);
//호텔 알림 목록
router.get("/hotelNotification", notificationController.hotelNotification);

module.exports = router;
