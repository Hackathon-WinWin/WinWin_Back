const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../../../database/s3");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hackathonwinwin",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        ACL: "public-read",
        key: function (req, file, cb) {
            cb(
                null,
                Math.floor(Math.random() * 1000).toString() +
                    Date.now() +
                    "." +
                    file.originalname.split(".").pop()
            );
        },
    }),
    limits: { fileSize: 1000 * 1000 * 10 },
});

module.exports = upload;
