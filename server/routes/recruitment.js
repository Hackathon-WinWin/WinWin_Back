const express = require("express");
const recruitmentController = require("../controllers/recruitmentController");
const auth = require("./middlewares/authorization");
const upload = require("./middlewares/multer");

const router = express.Router();

router.use("/", auth.verifyToken);
router.post("/addRecruitment", upload.array("images"));

//공고 생성
router.post("/addRecruitment", recruitmentController.addRecruitment);
//내 공고 목록
router.get("/readMyRecruitment", recruitmentController.readMyRecruitment);
//특정 호텔 공고 목록
router.get("/readHotelRecruitment/:hotelAuth_id", recruitmentController.readHotelRecruitment);
//특정 공고 확인
router.get(
    "/readSpecificRecruitment/:hotelAuth_id/:recruitment_id",
    recruitmentController.readSpecificRecruitment
);
//공고 삭제
router.delete("/deleteRecruitment", recruitmentController.deleteRecruitment);

module.exports = router;
