const hotelAuth = require("../../database/hotelAuth");
const hotelProfile = require("../../database/hotelProfile");
const recruitment = require("../../database/recruitment");
const s3 = require("../../database/s3");

exports.addRecruitment = async (req, res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        req.body["hotelAuth_id"] = hotel["_id"];
        req.body["images"] = new Array();
        var index = 0;
        for (var i = 0; i < req.files.length; i++) {
            req.body["images"][index] = { image: req.files[i]["location"] };
            index++;
        }
        await recruitment.findOneAndUpdate(
            { hotelAuth_id: hotel["_id"] },
            { $push: { recruitments: req.body } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.readMyRecruitment = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const hotelRecruitment = await recruitment.findOneByHotelAuthid(hotel["_id"]);
        if (hotelRecruitment != null) return { status: 1, result: hotelRecruitment };
        return { status: -1, result: "공고 찾을 수 없음" };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.readHotelRecruitment = async (req) => {
    try {
        const hotelRecruitment = await recruitment.findOneByHotelAuthid(req.params.hotelAuth_id);
        if (hotelRecruitment != null) return { status: 1, result: hotelRecruitment };
        return { status: -1, result: "공고 찾을 수 없음" };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.readSpecificRecruitment = async (req) => {
    try {
        const hotelRecruitment = await recruitment.findOneByHotelAuthid(req.params.hotelAuth_id);
        console.log(hotelRecruitment);
        for (var i = 0; i < hotelRecruitment["recruitments"].length; i++) {
            if (
                hotelRecruitment["recruitments"][i]["_id"].toString() == req.params.recruitment_id
            ) {
                const payload = {
                    hotelAuth_id: hotelRecruitment["hotelAuth_id"],
                    hotelName: hotelRecruitment["hotelName"],
                    address: hotelRecruitment["address"],
                    bookMark: hotelRecruitment["bookMark"],
                    recruitment: hotelRecruitment["recruitments"][i],
                };
                return { status: 1, result: payload };
            }
        }
        return { status: -1, result: "공고 찾을 수 없음" };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.deleteRecruitment = async (req, res) => {
    try {
        const recruitment_id = req.body["recruitment_id"];
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const hotelRecruitment = await recruitment.findOneByHotelAuthid(hotel["_id"]);
        var payload = {};
        if (hotelRecruitment["recruitments"].length == 0) return -1;
        for (var i = 0; i < hotelRecruitment["recruitments"].length; i++) {
            if (hotelRecruitment["recruitments"][i]["_id"] == recruitment_id) {
                payload = hotelRecruitment["recruitments"][i];
                break;
            }
            if (i == hotelRecruitment["recruitments"].length - 1) return -1;
        }
        for (var i = 0; i < payload["images"].length; i++) {
            s3.deleteObject(
                {
                    Bucket: "hackathonwinwin",
                    Key: payload["images"][i]["image"].substring(
                        56,
                        payload["images"][i]["image"].length
                    ),
                },
                function (err, data) {}
            );
        }
        await recruitment.findOneAndUpdate(
            { hotelAuth_id: hotel["_id"] },
            { $pull: { recruitments: payload } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};
