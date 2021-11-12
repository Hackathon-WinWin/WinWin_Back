const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const envs = {
    PORT: env.PORT,
    ORIGIN_URI: env.ORIGIN_URI,
    MONGO_URI: env.MONGO_URI,
    REDIS_PORT: env.REDIS_PORT,
    REDIS_URI: env.REDIS_URI,
    SECRET_KEY: env.SECRET_KEY,
    SMS_EXPIRE_TIME: env.SMS_EXPIRE_TIME,
    EXPIRE_TIME: env.EXPIRE_TIME,
    NCP_ACCESS_KEY: env.NCP_ACCESS_KEY,
    NCP_SECRET_KEY: env.NCP_SECRET_KEY,
    NCP_SERVICE_ID: env.NCP_SERVICE_ID,
    MY_NUMBER: env.MY_NUMBER,
    FB_API_KEY: env.FB_API_KEY,
    FB_AUTH_DOMAIN: env.FB_AUTH_DOMAIN,
    FB_PROJECT_ID: env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: env.FB_APP_ID,
    FB_MEASUREMENT_ID: env.FB_MEASUREMENT_ID,
    FB_KEY_URI: env.FB_KEY_URI,
};

module.exports = envs;
