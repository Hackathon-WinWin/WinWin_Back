const notificationService = require("../services/notificationService");

exports.artistNotification = async (req, res) => {
    const result = await notificationService.artistNotification(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.hotelNotification = async (req, res) => {
    const result = await notificationService.hotelNotification(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};
