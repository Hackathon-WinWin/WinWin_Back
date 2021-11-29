const recruitmentService = require("../services/recruitmentService");

exports.addRecruitment = async (req, res) => {
    const result = await recruitmentService.addRecruitment(req, res);
    if (result == 1) return res.status(200).send("공고 추가 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.readMyRecruitment = async (req, res) => {
    const result = await recruitmentService.readMyRecruitment(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.readHotelRecruitment = async (req, res) => {
    const result = await recruitmentService.readHotelRecruitment(req);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.readSpecificRecruitment = async (req, res) => {
    const result = await recruitmentService.readSpecificRecruitment(req);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result.status == -1) return res.status(400).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.deleteRecruitment = async (req, res) => {
    const result = await recruitmentService.deleteRecruitment(req, res);
    if (result == 1) return res.status(200).send("공고 삭제 성공");
    else if (result == -1) return res.status(400).send("공고 존재하지 않음");
    else {
        return res.status(500).send(result.toString());
    }
};
