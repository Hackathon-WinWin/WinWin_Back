const mongoose = require("mongoose");

const hotelProfileSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true, unique: true },
    hotelName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    introduceText: { type: String, required: true },
    images: [
        new mongoose.Schema({
            image: { type: String },
        }),
    ],
    bookMark: { type: Number, required: true },
});

hotelProfileSchema.statics.create = function (payload) {
    const hotelProfile = new this(payload);
    return hotelProfile.save();
};

hotelProfileSchema.statics.findAll = function () {
    return this.find({});
};

hotelProfileSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

hotelProfileSchema.statics.findOneByHotelAuthid = function (hotelAuth_id) {
    return this.findOne({ hotelAuth_id });
};

hotelProfileSchema.statics.findOneByPhoneNumber = function (phoneNumber) {
    return this.findOne({ phoneNumber });
};

hotelProfileSchema.statics.findOneByEmail = function (email) {
    return this.findOne({ email });
};

hotelProfileSchema.statics.updateByHotelAuthid = function (hotelAuth_id, payload) {
    return this.findOneAndUpdate({ hotelAuth_id }, payload, { new: true });
};

hotelProfileSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const hotelProfile = mongoose.model("hotelProfile", hotelProfileSchema);

module.exports = hotelProfile;
