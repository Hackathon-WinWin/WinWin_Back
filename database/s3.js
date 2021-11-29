const aws = require("aws-sdk");
const env = require("../configs/index");

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = env;

const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: "ap-northeast-2",
});

module.exports = s3;
