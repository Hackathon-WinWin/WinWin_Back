const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const auth = require("./middlewares/authorization");
const upload = require("./middlewares/multer");

const router = express.Router();

router.use("/", auth.verifyToken);
router.post("/addPortfolio", upload.array("images"));

//포트폴리오 생성
router.post("/addPortfolio", portfolioController.addPortfolio);
//내 포트폴리오 목록
router.get("/readMyPortfolio", portfolioController.readMyPortfolio);
//다른 유저 포트폴리오 목록
router.get("/readOtherPortfolio/:artistAuth_id", portfolioController.readOtherPortfolio);
//특정 포트폴리오 확인
router.get(
    "/readSpecificPortfolio/:artistAuth_id/:portfolio_id",
    portfolioController.readSpecificPortfolio
);
//포트폴리오 삭제
router.delete("/deletePortfolio", portfolioController.deletePortfolio);

module.exports = router;
