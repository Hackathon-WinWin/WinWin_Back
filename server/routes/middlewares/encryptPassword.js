const crypto = require("crypto");

exports.createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString("base64"));
        });
    });

exports.createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await this.createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString("base64"), salt });
        });
    });

exports.makeHashedPassword = (plainPassword, salt) =>
    new Promise((resolve, reject) => {
        crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString("base64"), salt });
        });
    });
