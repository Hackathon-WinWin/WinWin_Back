const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true, unique: true },
    hotelName: { type: String, required: true },
    address: { type: String, required: true },
    bookMark: { type: Number, required: true },
    recruitments: [
        {
            hotelAuth_id: { type: String, required: true },
            exhibitionStartDate: { type: Date, required: true },
            exhibitionEndDate: { type: Date, required: true },
            applicationStartDate: { type: Date, required: true },
            applicationEndDate: { type: Date, required: true },
            area: { type: Number, required: true },
            recruitNumber: { type: Number, required: true },
            concept: { type: String, required: true },
            images: [{ image: String }],
            title: { type: String, required: true },
            introduceText: { type: String, required: true },
        },
    ],
});

recruitmentSchema.statics.create = function (payload) {
    const recruitment = new this(payload);
    return recruitment.save();
};

recruitmentSchema.statics.findAll = function () {
    return this.find({});
};

recruitmentSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

recruitmentSchema.statics.findOneByHotelAuthid = function (hotelAuth_id) {
    return this.findOne({ hotelAuth_id });
};

recruitmentSchema.statics.updateByHotelAuthid = function (hotelAuth_id, payload) {
    return this.findOneAndUpdate({ hotelAuth_id }, payload, { new: true });
};

recruitmentSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const recruitment = mongoose.model("recruitment", recruitmentSchema);

module.exports = recruitment;
