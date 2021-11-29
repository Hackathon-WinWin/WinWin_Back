const artistAuth = require("../../database/artistAuth");
const artistProfile = require("../../database/artistProfile");
const portfolio = require("../../database/portfolio");
const s3 = require("../../database/s3");

exports.addPortfolio = async (req, res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        req.body["images"] = new Array();
        req.body["artistAuth_id"] = artist["_id"];
        var index = 0;
        for (var i = 0; i < req.files.length; i++) {
            req.body["images"][index] = { image: req.files[i]["location"] };
            index++;
        }
        await portfolio.findOneAndUpdate(
            { artistAuth_id: artist["_id"] },
            { $push: { portfolios: req.body } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};

exports.readMyPortfolio = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const artistPortfolio = await portfolio.findOneByArtistAuthid(artist["_id"]);
        if (artistPortfolio != null) return { status: 1, result: artistPortfolio };
        return { status: -1, result: "포트폴리오 찾을 수 없음" };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.readOtherPortfolio = async (req) => {
    try {
        const artistAuth_id = req.params.artistAuth_id;
        const artistPortfolio = await portfolio.findOneByArtistAuthid(artistAuth_id);
        if (artistPortfolio == null) return { status: -1, result: "포트폴리오 찾을 수 없음" };
        else return { status: 1, result: artistPortfolio };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.readSpecificPortfolio = async (req) => {
    try {
        const artistAuth_id = req.params.artistAuth_id;
        const portfolio_id = req.params.portfolio_id;
        const artistPortfolio = await portfolio.findOneByArtistAuthid(artistAuth_id);
        for (var i = 0; i < artistPortfolio["portfolios"].length; i++) {
            if (portfolio_id == artistPortfolio["portfolios"][i]["_id"].toString())
                return { status: 1, result: artistPortfolio["portfolios"][i] };
        }
        return { status: -1, result: "포트폴리오 찾을 수 없음" };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const portfolio_id = req.body["portfolio_id"];
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const artistPortfolio = await portfolio.findOneByArtistAuthid(artist["_id"]);
        var payload = {};
        if (artistPortfolio["portfolios"].length == 0) return -1;
        for (var i = 0; i < artistPortfolio["portfolios"].length; i++) {
            if (artistPortfolio["portfolios"][i]["_id"] == portfolio_id) {
                payload = artistPortfolio["portfolios"][i];
                break;
            }
            if (i == artistPortfolio["portfolios"].length - 1) return -1;
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
        await portfolio.findOneAndUpdate(
            { artistAuth_id: artist["_id"] },
            { $pull: { portfolios: payload } }
        );
        return 1;
    } catch (e) {
        return e;
    }
};
