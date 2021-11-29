const artistAuth = require("../../database/artistAuth");
const hotelAuth = require("../../database/hotelAuth");
const artistProfile = require("../../database/artistProfile");
const hotelProfile = require("../../database/hotelProfile");
const firebase = require("../../database/firebase");
const redis = require("../../database/redis");
const CryptoJS = require("crypto-js");
const encrypt = require("../routes/middlewares/encryptPassword");
const axios = require("axios");
const env = require("../../configs/index");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, BUSINESS_KEY, NCP_ACCESS_KEY, NCP_SECRET_KEY, NCP_SERVICE_ID, MY_NUMBER } = env;

exports.checkLoggedIn = async (req, res) => {
    try {
        const account = res.locals.account;
        const token = req.body["firebaseToken"];
        const check = await firebase.findOneByFirebaseToken(token);
        const payload = { account: account, firebaseToken: token };
        if (check == null) {
            await firebase.create(payload);
        } else if (check["account"] != account) {
            await firebase.deleteByFirebaseToken(token);
            await firebase.create(payload);
        }
        const artist = await artistAuth.findOneByAccount(account);
        const hotel = await hotelAuth.findOneByAccount(account);
        var flag = false;
        if (artist == null && hotel != null) {
            const profile = await hotelProfile.findOneByHotelAuthid(hotel["_id"]);
            if (profile == null) flag = false;
            else flag = true;
            return { status: 1, result: { isArtist: false, hasProfile: flag } };
        } else {
            const profile = await artistProfile.findOneByArtistAuthid(artist["_id"]);
            if (profile == null) flag = false;
            else flag = true;
            return { status: 1, result: { isArtist: true, hasProfile: flag } };
        }
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.sms = async (req) => {
    try {
        var valid_number = "";
        for (var i = 0; i < 6; i++) {
            valid_number += Math.floor(Math.random() * 10);
        }
        const user_phone_number = req.body["phoneNumber"];

        const date = Date.now().toString();
        const uri = NCP_SERVICE_ID;
        const secretKey = NCP_SECRET_KEY;
        const accessKey = NCP_ACCESS_KEY;
        const my_number = MY_NUMBER;
        const method = "POST";
        const space = " ";
        const newLine = "\n";
        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
        const url2 = `/sms/v2/services/${uri}/messages`;
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(accessKey);
        const hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);
        axios({
            method: method,
            url: url,
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
            data: {
                type: "SMS",
                countryCode: "82",
                from: my_number,
                content: `[WinWin 본인확인] 인증번호\n[${valid_number}]를 입력해 주세요.`,
                messages: [{ to: `${user_phone_number}` }],
            },
        })
            .then((res) => {})
            .catch((e) => {
                return -1;
            });
        const check = await redis.getByKey(user_phone_number);
        if (check == null) redis.sms(user_phone_number, valid_number);
        else {
            redis.deleteByKey(user_phone_number);
            redis.sms(user_phone_number, valid_number);
        }
        return 1;
    } catch (e) {
        return e;
    }
};

exports.smsCheck = async (req) => {
    try {
        const user_phone_number = req.body["phoneNumber"];
        const certification = req.body["certification"];
        const check = await redis.getByKey(user_phone_number);
        if (check == certification) return 1;
        else return -1;
    } catch (e) {
        return e;
    }
};

exports.business = async (req) => {
    try {
        var result = "";
        const businessNumber = req.body["businessNumber"];
        const openDate = req.body["openDate"];
        const hostName = req.body["hostName"];
        await axios
            .post(
                `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${BUSINESS_KEY}`,
                {
                    businesses: [
                        {
                            b_no: businessNumber,
                            start_dt: openDate,
                            p_nm: hostName,
                            p_nm2: "",
                            b_nm: "",
                            corp_no: "",
                            b_sector: "",
                            b_type: "",
                        },
                    ],
                }
            )
            .then((res) => {
                result = res.data["data"][0]["valid"];
            });
        if (result == "01") return 1;
        else return -1;
    } catch (e) {
        return e;
    }
};

exports.checkAccount = async (req) => {
    try {
        const account = req.body["account"];
        const type = /^[A-Za-z0-9+]*$/;
        if (!type.test(account) || account.length < 8) return -1;
        const artist = await artistAuth.findOneByAccount(account);
        const hotel = await hotelAuth.findOneByAccount(account);
        if (artist != null || hotel != null) return -2;
        return 1;
    } catch (e) {
        return e;
    }
};

exports.login = async (req) => {
    try {
        const account = req.body["account"];
        const passwd = req.body["password"];
        var check = await artistAuth.findOneByAccount(account);
        if (check == null) {
            check = await hotelAuth.findOneByAccount(account);
            if (check == null) return -1;
        }
        const password = await encrypt.makeHashedPassword(passwd, check["salt"]);
        if (check["password"] != password["password"]) return -2;
        const token = jwt.sign({ account: account }, SECRET_KEY, {
            expiresIn: "365d",
        });
        redis.create(account, token);
        return token;
    } catch (e) {
        return e;
    }
};

exports.logout = async (res) => {
    try {
        const account = res.locals.account;
        redis.deleteByKey(account);
        await firebase.deleteByAccount(account);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.createArtist = async (req) => {
    try {
        const passwd = req.body["password"];
        const phoneNumber = req.body["phoneNumber"];
        const check = await artistAuth.findOneByPhoneNumber(phoneNumber);
        if (check != null) return -1;
        const { password, salt } = await encrypt.createHashedPassword(passwd);
        req.body["password"] = password;
        req.body["salt"] = salt;
        await artistAuth.create(req.body);
        return 1;
    } catch (e) {
        return e;
    }
};

exports.createHotel = async (req) => {
    try {
        const passwd = req.body["password"];
        const businessNumber = req.body["businessNumber"];
        const check = await hotelAuth.findOneByBusinessNumber(businessNumber);
        if (check != null) return -1;
        const { password, salt } = await encrypt.createHashedPassword(passwd);
        req.body["password"] = password;
        req.body["salt"] = salt;
        await hotelAuth.create(req.body);
        return 1;
    } catch (e) {
        return e;
    }
};
