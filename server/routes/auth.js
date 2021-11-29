const express = require("express");
const authController = require("../controllers/authController");
const auth = require("./middlewares/authorization");

const router = express.Router();

router.post("/checkLoggedIn", auth.verifyToken);
router.post("/logout", auth.verifyToken);

//로그인 확인
router.post("/checkLoggedIn", authController.checkLoggedIn);
//아이디양식, 중복확인
router.post("/checkAccount", authController.checkAccount);
//로그인
router.post("/login", authController.login);
//로그아웃
router.post("/logout", authController.logout);

//전화 인증번호 요청
router.post("/sms", authController.sms);
//전화 인증번호 확인
router.post("/smsCheck", authController.smsCheck);
//아티스트 회원가입
router.post("/createArtist", authController.createArtist);

//사업자번호 인증
router.post("/business", authController.business);
//호텔 회원가입
router.post("/createHotel", authController.createHotel);

module.exports = router;
