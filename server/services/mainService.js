const artistAuth = require("../../database/artistAuth");
const artistProfile = require("../../database/artistProfile");
const portfolio = require("../../database/portfolio");
const hotelAuth = require("../../database/hotelAuth");
const hotelProfile = require("../../database/hotelProfile");
const recruitment = require("../../database/recruitment");

exports.artistMainFirstPage = async (req, res) => {
    try {
        var payload = new Array();
        var index = 0;
        const recruitmentList = await recruitment.findAll();
        for (var i = recruitmentList.length - 1; i >= 0; i--) {
            if (recruitmentList[i]["recruitments"].length == 0) continue;
            var temp = {
                hotelAuth_id: recruitmentList[i]["hotelAuth_id"],
                hotelName: recruitmentList[i]["hotelName"],
                address: recruitmentList[i]["address"],
                bookMark: recruitmentList[i]["bookMark"],
                recruitment:
                    recruitmentList[i]["recruitments"][
                        recruitmentList[i]["recruitments"].length - 1
                    ],
            };
            payload[index] = temp;
            index++;
            if (index == 6) break;
        }
        return { status: 1, result: payload };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.hotelMainFirstPage = async (req, res) => {
    try {
        var payload = new Array();
        var index = 0;
        const portfolioList = await portfolio.findAll();
        for (var i = portfolioList.length - 1; i >= 0; i--) {
            if (portfolioList[i]["portfolios"].length == 0) continue;
            const artist = await artistProfile.findOneByArtistAuthid(
                portfolioList[i]["artistAuth_id"]
            );
            var temp = {
                artistAuth_id: portfolioList[i]["artistAuth_id"],
                nickname: artist["nickname"],
                hashTag: artist["hashTag"],
                portfolio:
                    portfolioList[i]["portfolios"][portfolioList[i]["portfolios"].length - 1],
            };
            payload[index] = temp;
            index++;
            if (index == 6) break;
        }
        return { status: 1, result: payload };
    } catch (e) {
        return { status: 0, result: e };
    }
};
