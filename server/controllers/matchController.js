const matchService = require("../services/matchService");

exports.artistMakeApplication = async (req, res) => {
    const result = await matchService.artistMakeApplication(req, res);
    if (result.status == 1) return res.status(200).send(result.result);
    else if (result == -1) return res.status(400).send("recruitment_id로 recruitment 찾을 수 없음");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.artistSendApplication = async (req, res) => {
    const result = await matchService.artistSendApplication(req, res);
    if (result == 1) return res.status(200).send("아티스트 지원 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.hotelMakeApplication = async (req, res) => {
    const result = await matchService.hotelMakeApplication(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.hotelSendApplication = async (req, res) => {
    const result = await matchService.hotelSendApplication(req, res);
    if (result == 1) return res.status(200).send("호텔 제안 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.artistMatch = async (req, res) => {
    const result = await matchService.artistMatch(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.hotelMatch = async (req, res) => {
    const result = await matchService.hotelMatch(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.artistReadRecieved = async (req, res) => {
    const result = await matchService.artistReadRecieved(req, res);
    if (result == 1) return res.status(200).send("아티스트 열람");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.hotelReadRecieved = async (req, res) => {
    const result = await matchService.hotelReadRecieved(req, res);
    if (result == 1) return res.status(200).send("호텔 열람");
    else {
        return res.status(500).send(result.toString());
    }
};
