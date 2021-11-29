const mongoose = require("mongoose");

const artistAuthSchema = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
});

artistAuthSchema.statics.create = function (payload) {
    const artistAuth = new this(payload);
    return artistAuth.save();
};

artistAuthSchema.statics.findAll = function () {
    return this.find({});
};

artistAuthSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

artistAuthSchema.statics.findOneByAccount = function (account) {
    return this.findOne({ account });
};

artistAuthSchema.statics.findOneByPhoneNumber = function (phoneNumber) {
    return this.findOne({ phoneNumber });
};

artistAuthSchema.statics.updateByid = function (_id, payload) {
    return this.findOneAndUpdate({ _id }, payload, { new: true });
};

artistAuthSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const artistAuth = mongoose.model("artistAuth", artistAuthSchema);

module.exports = artistAuth;
