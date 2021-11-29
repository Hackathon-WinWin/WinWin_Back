const mongoose = require("mongoose");

const hotelProfileImageSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true, unique: true },
    profileImage: { type: String, required: true },
});

hotelProfileImageSchema.statics.create = function (payload) {
    const hotelProfileImage = new this(payload);
    return hotelProfileImage.save();
};

hotelProfileImageSchema.statics.findAll = function () {
    return this.find({});
};

hotelProfileImageSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

hotelProfileImageSchema.statics.findOneByHotelAuthid = function (hotelAuth_id) {
    return this.findOne({ hotelAuth_id });
};

hotelProfileImageSchema.statics.updateByHotelAuthid = function (hotelAuth_id, payload) {
    return this.findOneAndUpdate({ hotelAuth_id }, payload, { new: true });
};

hotelProfileImageSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const hotelProfileImage = mongoose.model("hotelProfileImage", hotelProfileImageSchema);

module.exports = hotelProfileImage;
