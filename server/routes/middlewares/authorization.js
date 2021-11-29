const redis = require("../../../database/redis");
const env = require("../../../configs/index");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = env;

exports.verifyToken = async (req, res, next) => {
    try {
        var token = req.headers.cookie;
        token = token.substring(11, token.length);
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded) {
            const check = await redis.getByKey(decoded.account);
            if (check == token) {
                res.locals.account = decoded.account;
                next();
            } else {
                res.status(411).send("loginToken 만료");
            }
        } else {
            res.status(412).send("loginToken decode 실패");
        }
    } catch (e) {
        res.status(501).send(e.toString());
    }
};
