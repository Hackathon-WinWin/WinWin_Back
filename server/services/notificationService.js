const artistAuth = require("../../database/artistAuth");
const hotelAuth = require("../../database/hotelAuth");
const hotelNotification = require("../../database/hotelNotification");
const artistNotification = require("../../database/artistNotification");
const hotelProfile = require("../../database/hotelProfile");
const artistProfile = require("../../database/artistProfile");
const env = require("../../configs/index");
const admin = require("firebase-admin");
const firebaseapp = require("firebase/app");

const {
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID,
    FB_APP_ID,
    FB_MEASUREMENT_ID,
    FB_KEY_URI,
} = env;

const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID,
    measurementId: FB_MEASUREMENT_ID,
};

const firebase = firebaseapp.initializeApp(firebaseConfig);
const serviceAccount = require(FB_KEY_URI);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.artistNotification = async (res) => {
    try {
        const artist = await artistAuth.findOneByAccount(res.locals.account);
        const notification = await artistNotification.findOneByArtistAuthid(artist["_id"]);
        return { status: 1, result: notification };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.hotelNotification = async (res) => {
    try {
        const hotel = await hotelAuth.findOneByAccount(res.locals.account);
        const notification = await hotelNotification.findOneByHotelAuthid(hotel["_id"]);
        return { status: 1, result: notification };
    } catch (e) {
        return { status: 0, result: e };
    }
};

exports.artistSendApplication = async (hotel, artist, token) => {
    try {
        const artistProfileData = await artistProfile.findOneByArtistAuthid(artist);
        const deviceToken = token;
        const hotelNotificationPayload = {
            artistAuth_id: artist,
            type: "??????",
            text: `${artistProfileData["name"]}?????? ???????????? ????????????.`,
            time: new Date(),
        };
        await hotelNotification.findOneAndUpdate(
            { hotelAuth_id: hotel },
            { $push: { notifications: hotelNotificationPayload } }
        );
        const message = {
            notification: {
                title: "????????? ??????",
                body: `${artistProfileData["name"]}?????? ???????????? ????????????.`,
            },
            token: deviceToken,
        };
        admin
            .messaging()
            .send(message)
            .then((response) => {
                return 1;
            })
            .catch((e) => {
                return e;
            });
    } catch (e) {
        return e;
    }
};

exports.hotelSendApplication = async (hotel, artist, token) => {
    try {
        const hotelProfileData = await hotelProfile.findOneByHotelAuthid(hotel);
        const deviceToken = token;
        const artistNotificationPayload = {
            hotelAuth_id: hotel,
            type: "??????",
            text: `${hotelProfileData["hotelName"]}?????? ???????????? ????????????.`,
            time: new Date(),
        };
        await artistNotification.findOneAndUpdate(
            { artistAuth_id: artist },
            { $push: { notifications: artistNotificationPayload } }
        );
        const message = {
            notification: {
                title: "????????? ??????",
                body: `${hotelProfileData["hotelName"]}?????? ???????????? ????????????.`,
            },
            token: deviceToken,
        };
        admin
            .messaging()
            .send(message)
            .then((response) => {
                return 1;
            })
            .catch((e) => {
                return e;
            });
    } catch (e) {
        return e;
    }
};

exports.artistReadRecieved = async (hotel, artist, token) => {
    try {
        const artistProfileData = await artistProfile.findOneByArtistAuthid(artist);
        const deviceToken = token;
        const hotelNotificationPayload = {
            artistAuth_id: artist,
            type: "??????",
            text: `${artistProfileData["name"]}?????? ???????????? ???????????????.`,
            time: new Date(),
        };
        await hotelNotification.findOneAndUpdate(
            { hotelAuth_id: hotel },
            { $push: { notifications: hotelNotificationPayload } }
        );
        const message = {
            notification: {
                title: "????????? ??????",
                body: `${artistProfileData["name"]}?????? ???????????? ???????????????.`,
            },
            token: deviceToken,
        };
        admin
            .messaging()
            .send(message)
            .then((response) => {
                return 1;
            })
            .catch((e) => {
                return e;
            });
    } catch (e) {
        return e;
    }
};

exports.hotelReadRecieved = async (hotel, artist, token) => {
    try {
        const hotelProfileData = await hotelProfile.findOneByHotelAuthid(hotel);
        const deviceToken = token;
        const artistNotificationPayload = {
            hotelAuth_id: hotel,
            type: "??????",
            text: `${hotelProfileData["hotelName"]}?????? ???????????? ???????????????.`,
            time: new Date(),
        };
        await artistNotification.findOneAndUpdate(
            { artistAuth_id: artist },
            { $push: { notifications: artistNotificationPayload } }
        );
        const message = {
            notification: {
                title: "????????? ??????",
                body: `${hotelProfileData["hotelName"]}?????? ???????????? ???????????????.`,
            },
            token: deviceToken,
        };
        admin
            .messaging()
            .send(message)
            .then((response) => {
                return 1;
            })
            .catch((e) => {
                return e;
            });
    } catch (e) {
        return e;
    }
};
