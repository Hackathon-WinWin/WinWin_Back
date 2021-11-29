const express = require("express");
const profileController = require("../controllers/profileController");
const auth = require("./middlewares/authorization");
const upload = require("./middlewares/multer");

const router = express.Router();

router.use("/", auth.verifyToken);
router.put("/updateArtistProfileImage", upload.single("profileImage"));
router.put("/updateArtistBackgroundImage", upload.single("backgroundImage"));
router.put("/updateHotelProfileImage", upload.single("profileImage"));
router.post("/addHotelImage", upload.single("image"));

//아티스트 프로필 생성
router.post("/createArtistProfile", profileController.createArtistProfile);
//아티스트 프로필 수정
router.put("/updateArtistProfile", profileController.updateArtistProfile);
//아티스트 프로필 이미지 수정
router.put("/updateArtistProfileImage", profileController.updateArtistProfileImage);
//아티스트 배경 이미지 수정
router.put("/updateArtistBackgroundImage", profileController.updateArtistBackgroundImage);
//아티스트 프로필 이미지 삭제
router.delete("/deleteArtistProfileImage", profileController.deleteArtistProfileImage);
//아티스트 배경 이미지 삭제
router.delete("/deleteArtistBackgroundImage", profileController.deleteArtistBackgroundImage);
//아티스트 해시태그 추가
router.post("/addArtistHashTag", profileController.addArtistHashTag);
//아티스트 해시태그 삭제
router.post("/deleteArtistHashTag", profileController.deleteArtistHashTag);
//아티스트 본인 프로필 확인
router.get("/myArtistProfile", profileController.myArtistProfile);
//특정 아티스트 프로필 확인
router.get("/artistProfile/:artistAuth_id", profileController.specificArtistProfile);
//아티스트 본인 프로필 이미지 확인
router.get("/myArtistProfileImage", profileController.myArtistProfileImage);
//아티스트 본인 배경 이미지 확인
router.get("/myArtistBackgroundImage", profileController.myArtistBackgroundImage);
//아티스트 북마크 추가, 삭제
router.post("/setBookMark", profileController.setBookMark);

//호텔 프로필 생성
router.post("/createHotelProfile", profileController.createHotelProfile);
//호텔 프로필 수정
router.put("/updateHotelProfile", profileController.updateHotelProfile);
//호텔 프로필 이미지 수정
router.put("/updateHotelProfileImage", profileController.updateHotelProfileImage);
//호텔 프로필 이미지 삭제
router.delete("/deleteHotelProfileImage", profileController.deleteHotelProfileImage);
//호텔 이미지 추가
router.post("/addHotelImage", profileController.addHotelImage);
//호텔 이미지 삭제
router.delete("/deleteHotelImage", profileController.deleteHotelImage);
//호텔 본인 프로필 확인
router.get("/myHotelProfile", profileController.myHotelProfile);
//특정 호텔 프로필 확인
router.get("/hotelProfile/:hotelAuth_id", profileController.specificHotelProfile);
//호텔 본인 프로필 이미지 확인
router.get("/myHotelProfileImage", profileController.myHotelProfileImage);

module.exports = router;
