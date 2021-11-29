const artistAuth = require("../../database/artistAuth");
const hotelAuth = require("../../database/hotelAuth");
const artistProfile = require("../../database/artistProfile");
const artistProfileImage = require("../../database/artistProfileImage");
const artistBackgroundImage = require("../../database/artistBackgroundImage");
const artistProfileHashTag = require("../../database/artistProfileHashTag");
const hotelProfile = require("../../database/hotelProfile");
const hotelProfileImage = require("../../database/hotelProfileImage");
const portfolio = require("../../database/portfolio");
const recruitment = require("../../database/recruitment");
const bookMark = require("../../database/bookMark");
const artistMatch = require("../../database/artistMatch");
const hotelMatch = require("../../database/hotelMatch");
const artistNotification = require("../../database/artistNotification");
const hotelNotification = require("../../database/hotelNotification");
const s3 = require("../../database/s3");
const env = require("../../configs/index");

const { ARTIST_PROFILE_IMAGE_URI, ARTIST_BACKGROUND_IMAGE_URI, HOTEL_PROFILE_IMAGE_URI } = env;

exports.createArtistProfile = async (req, res) => {
    try {
        const nickname = req.body["nickname"];
        const email = req.body["email"];
        const introduceText = req.body["introduceText"];
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        req.body["artistAuth_id"] = artist["_id"].toString();
        req.body["phoneNumber"] = artist["phoneNumber"];
        const checkNickname = await artistProfile.findOneByNickname(nickname);
        if (checkNickname != null) return -1;
        const checkEmail = await artistProfile.findOneByEmail(email);
        if (checkEmail != null) return -2;
        if (introduceText.length > 40) return -3;
        await artistProfile.create(req.body);
        const profileImagePayload = {
            artistAuth_id: artist["_id"],
            profileImage: ARTIST_PROFILE_IMAGE_URI,
        };
        const backgroundImagePayload = {
            artistAuth_id: artist["_id"],
            backgroundImage: ARTIST_BACKGROUND_IMAGE_URI,
        };
        const portfolioPayload = {
            artistAuth_id: artist["_id"],
        };
        const bookMarkPayload = {
            artistAuth_id: artist["_id"],
            bookMarks: [],
        };
        const artistMatchPayload = {
            artistAuth_id: artist["_id"],
            sent: [],
            recieved: [],
        };
        const artistNotificationPayload = {
            artistAuth_id: artist["_id"],
            notifications: [],
        };
        await artistProfileImage.create(profileImagePayload);
        await artistBackgroundImage.create(backgroundImagePayload);
        await portfolio.create(portfolioPayload);
        await bookMark.create(bookMarkPayload);
        await artistMatch.create(artistMatchPayload);
        await artistNotification.create(artistNotificationPayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.updateArtistProfile = async (req, res) => {
    try {
        const nickname = req.body["nickname"];
        const email = req.body["email"];
        const introduceText = req.body["introduceText"];
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        req.body["artistAuth_id"] = artist["_id"].toString();
        req.body["phoneNumber"] = artist["phoneNumber"];
        const checkNickname = await artistProfile.findOneByNickname(nickname);
        const checkProfile = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        if (checkNickname != null && checkNickname.toString() != checkProfile.toString()) return -1;
        const checkEmail = await artistProfile.findOneByEmail(email);
        if (checkEmail != null && checkEmail.toString() != checkProfile.toString()) return -2;
        if (introduceText.length > 40) return -3;
        await artistProfile.updateByArtistAuthid(artist["_id"], req.body);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.updateArtistProfileImage = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistProfileImage.findOneByArtistAuthid(artist["_id"]);
        if (image["profileImage"] != ARTIST_PROFILE_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["profileImage"].substring(56, image["profileImage"].length),
                },
                function (err, data) {}
            );
        }
        const profileImagePayload = {
            artistAuth_id: artist["_id"],
            profileImage: req.file.location,
        };
        await artistProfileImage.updateByArtistAuthid(artist["_id"], profileImagePayload);
        return req.file.location;
    } catch (e) {
        return e;
    }
};

exports.updateArtistBackgroundImage = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistBackgroundImage.findOneByArtistAuthid(artist["_id"]);
        if (image["backgroundImage"] != ARTIST_BACKGROUND_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["backgroundImage"].substring(56, image["backgroundImage"].length),
                },
                function (err, data) {}
            );
        }
        const backgroundImagePayload = {
            artistAuth_id: artist["_id"],
            backgroundImage: req.file.location,
        };
        await artistBackgroundImage.updateByArtistAuthid(artist["_id"], backgroundImagePayload);
        return req.file.location;
    } catch (e) {
        return e;
    }
};

exports.deleteArtistProfileImage = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistProfileImage.findOneByArtistAuthid(artist["_id"]);
        if (image["profileImage"] != ARTIST_PROFILE_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["profileImage"].substring(56, image["profileImage"].length),
                },
                function (err, data) {}
            );
        }
        const profileImagePayload = {
            artistAuth_id: artist["_id"],
            profileImage: ARTIST_PROFILE_IMAGE_URI,
        };
        await artistProfileImage.updateByArtistAuthid(artist["_id"], profileImagePayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.deleteArtistBackgroundImage = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistBackgroundImage.findOneByArtistAuthid(artist["_id"]);
        if (image["backgroundImage"] != ARTIST_BACKGROUND_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["backgroundImage"].substring(56, image["backgroundImage"].length),
                },
                function (err, data) {}
            );
        }
        const backgroundImagePayload = {
            artistAuth_id: artist["_id"],
            backgroundImage: ARTIST_BACKGROUND_IMAGE_URI,
        };
        await artistBackgroundImage.updateByArtistAuthid(artist["_id"], backgroundImagePayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.addArtistHashTag = async (req, res) => {
    try {
        const tag = req.body["tagName"];
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const artistProfileModel = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        const payload = { artistProfile: artistProfileModel["_id"].toString() };
        const tagModel = await artistProfileHashTag.findOneByTagName(tag);
        if (tagModel == null) {
            req.body["artistProfile_id"] = payload;
            artistProfileHashTag.create(req.body);
        } else {
            for (var i = 0; i < tagModel["artistProfile_id"].length; i++) {
                const check = await artistProfile.findOneByid(
                    tagModel["artistProfile_id"][i]["artistProfile"]
                );
                if (check["artistAuth_id"] == artist["_id"]) return -1;
            }
            await artistProfileHashTag.findOneAndUpdate(
                { tagName: tag },
                { $push: { artistProfile_id: payload } }
            );
        }
        await artistProfile.findOneAndUpdate(
            { artistAuth_id: artist["_id"] },
            { $push: { hashTag: { tagName: tag } } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.deleteArtistHashTag = async (req, res) => {
    try {
        const tag = req.body["tagName"];
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const artistProfileModel = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        const payload = { artistProfile: artistProfileModel["_id"].toString() };
        await artistProfileHashTag.findOneAndUpdate(
            { tagName: tag },
            { $pull: { artistProfile_id: payload } }
        );
        const hashTag = await artistProfileHashTag.findOneByTagName(tag);
        if (hashTag["artistProfile_id"].length == 0) {
            await artistProfileHashTag.deleteByTagName(tag);
        }
        await artistProfile.findOneAndUpdate(
            { artistAuth_id: artist["_id"] },
            { $pull: { hashTag: { tagName: tag } } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.myArtistProfile = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const profile = await artistProfile.findOneByArtistAuthid(artist["_id"]);
        return { status: 1, result: profile };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.specificArtistProfile = async (req) => {
    try {
        const profile = await artistProfile.findOneByArtistAuthid(req.params.artistAuth_id);
        const profileImage = await artistProfileImage.findOneByArtistAuthid(
            req.params.artistAuth_id
        );
        const backgroundImage = await artistBackgroundImage.findOneByArtistAuthid(
            req.params.artistAuth_id
        );
        const payload = {
            profileImageURL: profileImage["profileImage"],
            backgroundImageURL: backgroundImage["backgroundImage"],
            profile: profile,
        };
        return { status: 1, result: payload };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.myArtistProfileImage = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistProfileImage.findOneByArtistAuthid(artist["_id"]);
        if (image == null) return -1;
        return { status: 1, result: image };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.myArtistBackgroundImage = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const image = await artistBackgroundImage.findOneByArtistAuthid(artist["_id"]);
        if (image == null) return -1;
        return { status: 1, result: image };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.setBookMark = async (req, res) => {
    try {
        //호텔프로필 bookMark 숫자 반영
        //artistAuth당 bookMark 반영
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const hotel = await hotelProfile.findOneByHotelAuthid(req.body["hotelAuth_id"]);
        const bookMarkList = await bookMark.findOneByArtistAuthid(artist["_id"]);
        const payload = { hotelAuth_id: req.body["hotelAuth_id"] };
        if (req.body["bookMark"] == true) {
            await bookMark.findOneAndUpdate(
                { artistAuth_id: artist["_id"] },
                { $push: { bookMarks: payload } }
            );
            await hotelProfile.findOneAndUpdate(
                { hotelAuth_id: req.body["hotelAuth_id"] },
                { bookMark: hotel["bookMark"] + 1 }
            );
        } else {
            await bookMark.findOneAndUpdate(
                { artistAuth_id: artist["_id"] },
                { $pull: { bookMarks: payload } }
            );
            await hotelProfile.findOneAndUpdate(
                { hotelAuth_id: req.body["hotelAuth_id"] },
                { bookMark: hotel["bookMark"] - 1 }
            );
        }
        return 1;
    } catch (e) {
        return e;
    }
};

exports.createHotelProfile = async (req, res) => {
    try {
        const phoneNumber = req.body["phoneNumber"];
        const email = req.body["email"];
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        req.body["hotelAuth_id"] = hotel["_id"];
        const checkPhoneNumber = await hotelProfile.findOneByPhoneNumber(phoneNumber);
        if (checkPhoneNumber != null) return -1;
        const checkEmail = await hotelProfile.findOneByEmail(email);
        if (checkEmail != null) return -2;
        req.body["bookMark"] = 0;
        await hotelProfile.create(req.body);
        const profileImagePayload = {
            hotelAuth_id: hotel["_id"],
            profileImage: HOTEL_PROFILE_IMAGE_URI,
        };
        const recruitmentPayload = {
            hotelAuth_id: hotel["_id"],
            hotelName: req.body["hotelName"],
            address: req.body["address"],
            bookMark: req.body["bookMark"],
            recruitments: [],
        };
        const hotelMatchPayload = {
            hotelAuth_id: hotel["_id"],
            sent: [],
            recieved: [],
        };
        const hotelNotificationPayload = {
            hotelAuth_id: hotel["_id"],
            notifications: [],
        };
        await hotelProfileImage.create(profileImagePayload);
        await recruitment.create(recruitmentPayload);
        await hotelMatch.create(hotelMatchPayload);
        await hotelNotification.create(hotelNotificationPayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.updateHotelProfile = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        req.body["hotelAuth_id"] = hotel["_id"];
        const recruitmentPayload = {
            hotelAuth_id: hotel["_id"],
            hotelName: req.body["hotelName"],
            address: req.body["address"],
            bookMark: req.body["bookMark"],
            recruitments: [],
        };
        await hotelProfile.updateByHotelAuthid(hotel["_id"], req.body);
        await recruitment.updateByHotelAuthid(hotel["_id"], recruitmentPayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.updateHotelProfileImage = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const image = await hotelProfileImage.findOneByHotelAuthid(hotel["_id"]);
        if (image["profileImage"] != HOTEL_PROFILE_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["profileImage"].substring(56, image["profileImage"].length),
                },
                function (err, data) {}
            );
        }
        const profileImagePayload = {
            hotelAuth_id: hotel["_id"],
            profileImage: req.file.location,
        };
        await hotelProfileImage.updateByHotelAuthid(hotel["_id"], profileImagePayload);
        return req.file.location;
    } catch (e) {
        return e;
    }
};

exports.deleteHotelProfileImage = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const image = await hotelProfileImage.findOneByHotelAuthid(hotel["_id"]);
        if (image["profileImage"] != HOTEL_PROFILE_IMAGE_URI) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: image["profileImage"].substring(56, image["profileImage"].length),
                },
                function (err, data) {}
            );
        }
        const profileImagePayload = {
            hotelAuth_id: hotel["_id"],
            profileImage: HOTEL_PROFILE_IMAGE_URI,
        };
        await hotelProfileImage.updateByHotelAuthid(hotel["_id"], profileImagePayload);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.addHotelImage = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const imagePayload = {
            image: req.file.location,
        };
        await hotelProfile.findOneAndUpdate(
            { hotelAuth_id: hotel["_id"] },
            { $push: { images: imagePayload } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.deleteHotelImage = async (req, res) => {
    const hotel = await hotelAuth.findOneByAccount(res.locals.account);
    const imagePayload = {
        image: req.body["image"],
    };
    await hotelProfile.findOneAndUpdate(
        { hotelAuth_id: hotel["_id"] },
        { $pull: { images: imagePayload } }
    );
    s3.deleteObject(
        {
            Bucket: "hackathonwinwin",
            Key: req.body["image"].substring(56, req.body["image"].length),
        },
        function (err, data) {}
    );
    try {
        return 1;
    } catch (e) {
        return e;
    }
};

exports.myHotelProfile = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const profile = await hotelProfile.findOneByHotelAuthid(hotel["_id"]);
        return { status: 1, result: profile };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.specificHotelProfile = async (req, res) => {
    try {
        const profile = await hotelProfile.findOneByHotelAuthid(req.params.hotelAuth_id);
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const bookmark = await bookMark.findOneByArtistAuthid(artist["_id"]);
        const hotelProImg = await hotelProfileImage.findOneByHotelAuthid(req.params.hotelAuth_id);
        var flag = false;
        for (var i = 0; i < bookmark["bookMarks"].length; i++) {
            if (bookmark["bookMarks"][i]["hotelAuth_id"] == profile["hotelAuth_id"]) {
                flag = true;
                break;
            }
        }
        const payload = {
            profileImageURL: hotelProImg["profileImage"],
            bookMarked: flag,
            profile: profile,
        };
        return { status: 1, result: payload };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.myHotelProfileImage = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const image = await hotelProfileImage.findOneByHotelAuthid(hotel["_id"]);
        if (image == null) return -1;
        return { status: 1, result: image };
    } catch (e) {
        return { status: 0, result: e };
    }
};
