const portfolioService = require("../services/portfolioService");

exports.addPortfolio = async (req, res) => {
    const result = await portfolioService.addPortfolio(req, res);
    if (result == 1) return res.status(200).send("포트폴리오 추가 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.readMyPortfolio = async (req, res) => {
    const result = await portfolioService.readMyPortfolio(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.readOtherPortfolio = async (req, res) => {
    const result = await portfolioService.readOtherPortfolio(req);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.readSpecificPortfolio = async (req, res) => {
    const result = await portfolioService.readSpecificPortfolio(req);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.deletePortfolio = async (req, res) => {
    const result = await portfolioService.deletePortfolio(req, res);
    if (result == 1) return res.status(200).send("포트폴리오 삭제 성공");
    else if (result == -1) return res.status(400).send("포트폴리오 존재하지 않음");
    else {
        return res.status(500).send(result.toString());
    }
};
