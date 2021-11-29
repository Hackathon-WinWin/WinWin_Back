const env = require("../configs/index");
const redis = require("redis");

const { REDIS_PORT, REDIS_URI, SMS_EXPIRE_TIME, EXPIRE_TIME } = env;

const client = redis.createClient(REDIS_PORT, REDIS_URI);

exports.create = (key, value) => {
    client.set(key, value, "EX", EXPIRE_TIME);
};

exports.sms = (key, value) => {
    client.set(key, value, "EX", SMS_EXPIRE_TIME);
};

exports.getByKey = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    });
};

exports.deleteByKey = (key) => {
    client.del(key);
};
