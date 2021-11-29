const authService = require("../services/authService");

exports.checkLoggedIn = async (req, res) => {
    const result = await authService.checkLoggedIn(req, res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.sms = async (req, res) => {
    const result = await authService.sms(req);
    if (result == 1) return res.status(200).send("전화 인증번호 요청 성공");
    else if (result == -1) return res.status(501).send("네이버 SENS API 에러");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.smsCheck = async (req, res) => {
    const result = await authService.smsCheck(req);
    if (result == 1) return res.status(200).send("인증 성공");
    else if (result == -1) return res.status(400).send("인증번호 불일치");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.business = async (req, res) => {
    const result = await authService.business(req);
    if (result == 1) return res.status(200).send("인증 성공");
    else if (result == -1) return res.status(400).send("인증 실패");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.checkAccount = async (req, res) => {
    const result = await authService.checkAccount(req);
    if (result == 1) return res.status(200).send("이상 없음");
    else if (result == -1) return res.status(400).send("아이디 양식 불일치");
    else if (result == -2) return res.status(401).send("아이디 중복");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.login = async (req, res) => {
    const result = await authService.login(req);
    if (typeof result == "string")
        return res.status(200).cookie("loginToken", result).send("로그인 성공");
    else if (result == -1) return res.status(400).send("가입하지 않은 아이디");
    else if (result == -2) return res.status(401).send("비밀번호 불일치");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.logout = async (req, res) => {
    const result = await authService.logout(res);
    if (result == 1) return res.status(200).send("로그아웃 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.createArtist = async (req, res) => {
    const result = await authService.createArtist(req);
    if (result == 1) return res.status(200).send("회원가입 성공");
    else if (result == -1) return res.status(400).send("이미 가입한 전화번호");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.createHotel = async (req, res) => {
    const result = await authService.createHotel(req);
    if (result == 1) return res.status(200).send("회원가입 성공");
    else if (result == -1) return res.status(400).send("이미 가입한 사업자번호");
    else {
        return res.status(500).send(result.toString());
    }
};
