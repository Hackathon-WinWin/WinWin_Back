const artistAuth = require("../../database/artistAuth");
const artistProfile = require("../../database/artistProfile");
const hotelAuth = require("../../database/hotelAuth");
const hotelProfile = require("../../database/hotelProfile");
const recruitment = require("../../database/recruitment");
const artistApplication = require("../../database/artistApplication");
const hotelApplication = require("../../database/hotelApplication");
const artistMatch = require("../../database/artistMatch");
const hotelMatch = require("../../database/hotelMatch");
const firebase = require("../../database/firebase");
const notificationService = require("./notificationService");

exports.artistMakeApplication = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const profile = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        const recruitmentList = await recruitment.findAll();
        var payload = {};
        for (var i = 0; i < recruitmentList.length; i++) {
            for (var j = 0; j < recruitmentList[i]["recruitments"].length; j++) {
                if (recruitmentList[i]["recruitments"][j]["_id"] == req.params.recruitment_id) {
                    console.log(recruitmentList[i]["recruitments"][j]);
                    const hotel = await hotelProfile.findOneByHotelAuthid(
                        recruitmentList[i]["recruitments"][j]["hotelAuth_id"]
                    );
                    payload = {
                        name: profile["name"],
                        birthday: profile["birthday"],
                        address: profile["address"],
                        phoneNumber: profile["phoneNumber"],
                        email: profile["email"],
                        hotelName: hotel["hotelName"],
                        recruitmentTitle: recruitmentList[i]["recruitments"][j]["title"],
                    };
                    return { status: 1, result: payload };
                }
            }
        }
        return -1;
    } catch (e) {
        return e;
    }
};

exports.artistSendApplication = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const artistProfileData = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        const applicationPayload = {
            artistAuth_id: artist["_id"],
            recruitment_id: req.body["recruitment_id"],
            name: req.body["name"],
            birthday: req.body["birthday"],
            address: req.body["address"],
            phoneNumber: req.body["phoneNumber"],
            email: req.body["email"],
            hotelName: req.body["hotelName"],
            recruitmentTitle: req.body["recruitmentTitle"],
            title: req.body["title"],
            message: req.body["message"],
            writtenTime: new Date(),
        };
        await artistApplication.create(applicationPayload);
        const applications = await artistApplication.findAll();
        const artistSentPayload = {
            application_id: applications[applications.length - 1]["_id"],
            recruitment_id: req.body["recruitment_id"],
            hotelName: req.body["hotelName"],
            recruitmentTitle: req.body["recruitmentTitle"],
            checked: false,
        };
        await artistMatch.findOneAndUpdate(
            { artistAuth_id: artist["_id"] },
            { $push: { sent: artistSentPayload } }
        );
        const hotelRecievedPayload = {
            application_id: applications[applications.length - 1]["_id"],
            artistAuth_id: artist["_id"],
            recruitment_id: req.body["recruitment_id"],
            name: artistProfileData["name"],
            recruitmentTitle: req.body["recruitmentTitle"],
            writtenTime: new Date(),
        };
        await hotelMatch.findOneAndUpdate(
            { hotelAuth_id: req.body["hotelAuth_id"] },
            { $push: { recieved: hotelRecievedPayload } }
        );
        const hotelAccountData = await hotelAuth.findOneByid(req.body["hotelAuth_id"]);
        const firebaseData = await firebase.findOneByAccount(hotelAccountData["account"]);
        var firebaseToken = "";
        if (firebaseData != null) firebaseToken = firebaseData["firebaseToken"];
        await notificationService.artistSendApplication(
            req.body["hotelAuth_id"],
            artist["_id"],
            firebaseToken
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.hotelMakeApplication = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const profile = await hotelProfile.findOneByHotelAuthid(hotel["_id"]);
        var payload = {};
        payload = {
            hotelAuth_id: hotel["_id"],
            phoneNumber: profile["phoneNumber"],
            email: profile["email"],
        };
        return { status: 1, result: payload };
    } catch (e) {
        return e;
    }
};

exports.hotelSendApplication = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const profile = await hotelProfile.findOneByHotelAuthid(hotel["_id"]);
        const recruitmentList = await recruitment.findAll();
        for (var i = 0; i < recruitmentList.length; i++) {
            for (var j = 0; j < recruitmentList[i]["recruitments"].length; j++) {
                if (recruitmentList[i]["recruitments"][j]["_id"] == req.body["recruitment_id"]) {
                    const applicationPayload = {
                        hotelAuth_id: hotel["_id"],
                        recruitment_id: req.body["recruitment_id"],
                        phoneNumber: req.body["phoneNumber"],
                        email: req.body["email"],
                        hotelName: profile["hotelName"],
                        recruitmentTitle: recruitmentList[i]["recruitments"][j]["title"],
                        title: req.body["title"],
                        message: req.body["message"],
                        writtenTime: new Date(),
                    };
                    await hotelApplication.create(applicationPayload);

                    //////////////////////////////////////////////////////
                    const artist = await artistProfile.findOneByArtistAuthid(
                        req.body["artistAuth_id"]
                    );
                    const applications = await hotelApplication.findAll();
                    const hotelSentPayload = {
                        application_id: applications[applications.length - 1]["_id"],
                        artistAuth_id: req.body["artistAuth_id"],
                        name: artist["name"],
                        message: req.body["message"],
                        phoneNumber: req.body["phoneNumber"],
                        email: req.body["email"],
                        title: req.body["title"],
                        checked: false,
                    };
                    await hotelMatch.findOneAndUpdate(
                        { hotelAuth_id: hotel["_id"] },
                        { $push: { sent: hotelSentPayload } }
                    );
                    const artistRecievedPayload = {
                        application_id: applications[applications.length - 1]["_id"],
                        hotelName: hotel["hotelName"],
                        message: req.body["message"],
                        phoneNumber: req.body["phoneNumber"],
                        email: req.body["email"],
                        title: req.body["title"],
                        writtenTime: new Date(),
                    };
                    await artistMatch.findOneAndUpdate(
                        { artistAuth_id: req.body["artistAuth_id"] },
                        { $push: { recieved: artistRecievedPayload } }
                    );
                    const artistAuthData = await artistAuth.findOneByid(req.body["artistAuth_id"]);
                    const firebaseData = await firebase.findOneByAccount(artistAuthData["account"]);
                    var firebaseToken = "";
                    if (firebaseData != null) firebaseToken = firebaseData["firebaseToken"];
                    await notificationService.hotelSendApplication(
                        hotel["_id"],
                        req.body["artistAuth_id"],
                        firebaseToken
                    );
                    return 1;
                }
            }
        }
    } catch (e) {
        return e;
    }
};

exports.artistMatch = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const match = await artistMatch.findOneByArtistAuthid(artist["_id"]);
        return { status: 1, result: match };
    } catch (e) {
        return e;
    }
};

exports.hotelMatch = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const match = await hotelMatch.findOneByHotelAuthid(hotel["_id"]);
        return { status: 1, result: match };
    } catch (e) {
        return e;
    }
};

exports.artistReadRecieved = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const applicationList = await hotelApplication.findOneByid(req.body["application_id"]);
        const hotelAuth_id = applicationList["hotelAuth_id"];
        const match = await hotelMatch.findOneByHotelAuthid(hotelAuth_id);
        const hotelAccount = await hotelAuth.findOneByid(hotelAuth_id);
        for (var i = 0; i < match["sent"].length; i++) {
            if (match["sent"][i]["application_id"]) {
                var payload = match["sent"][i];
                await hotelMatch.findOneAndUpdate(
                    { hotelAuth_id: hotelAuth_id },
                    { $pull: { sent: payload } }
                );
                payload = {
                    application_id: match["sent"][i]["application_id"],
                    artistAuth_id: match["sent"][i]["artistAuth_id"],
                    name: match["sent"][i]["name"],
                    message: match["sent"][i]["message"],
                    phoneNumber: match["sent"][i]["phoneNumber"],
                    email: match["sent"][i]["email"],
                    title: match["sent"][i]["title"],
                    checked: true,
                    checkedDate: new Date(),
                };
                await hotelMatch.findOneAndUpdate(
                    { hotelAuth_id: hotelAuth_id },
                    { $push: { sent: payload } }
                );
            }
        }
        const firebaseData = await firebase.findOneByAccount(hotelAccount["account"]);
        var firebaseToken = "";
        if (firebaseData != null) firebaseToken = firebaseData["firebaseToken"];
        await notificationService.artistReadRecieved(hotelAuth_id, artist["_id"], firebaseToken);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.hotelReadRecieved = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const applicationList = await artistApplication.findOneByid(req.body["application_id"]);
        const artistAuth_id = applicationList["artistAuth_id"];
        const match = await artistMatch.findOneByArtistAuthid(artistAuth_id);
        const artistAccount = await artistAuth.findOneByid(artistAuth_id);
        for (var i = 0; i < match["sent"].length; i++) {
            if (match["sent"][i]["application_id"]) {
                var payload = match["sent"][i];
                await artistMatch.findOneAndUpdate(
                    { artistAuth_id: artistAuth_id },
                    { $pull: { sent: payload } }
                );
                payload = {
                    application_id: match["sent"][i]["application_id"],
                    recruitment_id: match["sent"][i]["recruitment_id"],
                    hotelName: match["sent"][i]["hotelName"],
                    recruitmentTitle: match["sent"][i]["recruitmentTitle"],
                    checked: true,
                    checkedDate: new Date(),
                };
                await artistMatch.findOneAndUpdate(
                    { artistAuth_id: artistAuth_id },
                    { $push: { sent: payload } }
                );
            }
        }
        const firebaseData = await firebase.findOneByAccount(artistAccount["account"]);
        var firebaseToken = "";
        if (firebaseData != null) firebaseToken = firebaseData["firebaseToken"];
        await notificationService.hotelReadRecieved(hotel["_id"], artistAuth_id, firebaseToken);
        return 1;
    } catch (e) {
        return e;
    }
};
