const profileService = require("../services/profileService");

exports.createArtistProfile = async (req, res) => {
    const result = await profileService.createArtistProfile(req, res);
    if (result == 1) return res.status(200).send("아티스트 프로필 생성 성공");
    else if (result == -1) return res.status(400).send("이미 사용중인 닉네임");
    else if (result == -2) return res.status(401).send("이미 사용중인 이메일");
    else if (result == -3) return res.status(402).send("소개글 최대 길이: 40");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.updateArtistProfile = async (req, res) => {
    const result = await profileService.updateArtistProfile(req, res);
    if (result == 1) return res.status(200).send("아티스트 프로필 수정 성공");
    else if (result == -1) return res.status(400).send("이미 사용중인 닉네임");
    else if (result == -2) return res.status(401).send("이미 사용중인 이메일");
    else if (result == -3) return res.status(402).send("소개글 최대 길이: 40");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.updateArtistProfileImage = async (req, res) => {
    const result = await profileService.updateArtistProfileImage(req, res);
    if (result != 0) return res.status(200).send(result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.updateArtistBackgroundImage = async (req, res) => {
    const result = await profileService.updateArtistBackgroundImage(req, res);
    if (result != 0) return res.status(200).send(result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.deleteArtistProfileImage = async (req, res) => {
    const result = await profileService.deleteArtistProfileImage(req, res);
    if (result == 1) return res.status(200).send("아티스트 프로필 이미지 삭제 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.deleteArtistBackgroundImage = async (req, res) => {
    const result = await profileService.deleteArtistBackgroundImage(req, res);
    if (result == 1) return res.status(200).send("아티스트 배경 이미지 삭제 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.addArtistHashTag = async (req, res) => {
    const result = await profileService.addArtistHashTag(req, res);
    if (result == 1) return res.status(200).send("아티스트 해시태그 저장 성공");
    else if (result == -1) return res.status(400).send("이미 저장된 해시태그");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.deleteArtistHashTag = async (req, res) => {
    const result = await profileService.deleteArtistHashTag(req, res);
    if (result == 1) return res.status(200).send("아티스트 해시태그 삭제 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.myArtistProfile = async (req, res) => {
    const result = await profileService.myArtistProfile(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.specificArtistProfile = async (req, res) => {
    const result = await profileService.specificArtistProfile(req);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.myArtistProfileImage = async (req, res) => {
    const result = await profileService.myArtistProfileImage(res);
    if (result == -1) return res.status(400).send("존재하지 않음");
    else if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.myArtistBackgroundImage = async (req, res) => {
    const result = await profileService.myArtistBackgroundImage(res);
    if (result == -1) return res.status(400).send("존재하지 않음");
    else if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.setBookMark = async (req, res) => {
    const result = await profileService.setBookMark(req, res);
    if (result == 1) return res.status(200).send("성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.createHotelProfile = async (req, res) => {
    const result = await profileService.createHotelProfile(req, res);
    if (result == 1) return res.status(200).send("호텔 프로필 생성 성공");
    else if (result == -1) return res.status(400).send("이미 사용중인 전화번호");
    else if (result == -2) return res.status(401).send("이미 사용중인 이메일");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.updateHotelProfile = async (req, res) => {
    const result = await profileService.updateHotelProfile(req, res);
    if (result == 1) return res.status(200).send("호텔 프로필 수정 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.updateHotelProfileImage = async (req, res) => {
    const result = await profileService.updateHotelProfileImage(req, res);
    if (result != 0) return res.status(200).send(result);
    else {
        return res.status(500).send(result.toString());
    }
};

exports.deleteHotelProfileImage = async (req, res) => {
    const result = await profileService.deleteHotelProfileImage(req, res);
    if (result == 1) return res.status(200).send("호텔 프로필 이미지 삭제 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.addHotelImage = async (req, res) => {
    const result = await profileService.addHotelImage(req, res);
    if (result == 1) return res.status(200).send("호텔 이미지 추가 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.deleteHotelImage = async (req, res) => {
    const result = await profileService.deleteHotelImage(req, res);
    if (result == 1) return res.status(200).send("호텔 이미지 삭제 성공");
    else {
        return res.status(500).send(result.toString());
    }
};

exports.myHotelProfile = async (req, res) => {
    const result = await profileService.myHotelProfile(res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.specificHotelProfile = async (req, res) => {
    const result = await profileService.specificHotelProfile(req, res);
    if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};

exports.myHotelProfileImage = async (req, res) => {
    const result = await profileService.myHotelProfileImage(res);
    if (result == -1) return res.status(400).send("존재하지 않음");
    else if (result.status == 1) return res.status(200).send(result.result);
    else {
        return res.status(500).send(result.result.toString());
    }
};
