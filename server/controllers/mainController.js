const mainService = require("../services/mainService");

exports.artistMainFirstPage = async (req, res) => {
    const result = await mainService.artistMainFirstPage(req, res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.hotelMainFirstPage = async (req, res) => {
    const result = await mainService.hotelMainFirstPage(req, res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};
