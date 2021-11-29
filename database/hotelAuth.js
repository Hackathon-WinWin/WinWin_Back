const mongoose = require("mongoose");

const hotelAuthSchema = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessNumber: { type: String, required: true, unique: true },
    hostName: { type: String, required: true },
    openDate: { type: Date, required: true },
    salt: { type: String, required: true },
});

hotelAuthSchema.statics.create = function (payload) {
    const hotelAuth = new this(payload);
    return hotelAuth.save();
};

hotelAuthSchema.statics.findAll = function () {
    return this.find({});
};

hotelAuthSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

hotelAuthSchema.statics.findOneByAccount = function (account) {
    return this.findOne({ account });
};

hotelAuthSchema.statics.findOneByBusinessNumber = function (businessNumber) {
    return this.findOne({ businessNumber });
};

hotelAuthSchema.statics.updateByid = function (_id, payload) {
    return this.findOneAndUpdate({ _id }, payload, { new: true });
};

hotelAuthSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const hotelAuth = mongoose.model("hotelAuth", hotelAuthSchema);

module.exports = hotelAuth;
