const mongoose = require("mongoose");

const hotelApplicationSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true },
    recruitment_id: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hotelName: { type: String, required: true },
    recruitmentTitle: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    writtenTime: { type: Date, required: true },
});

hotelApplicationSchema.statics.create = function (payload) {
    const hotelApplication = new this(payload);
    return hotelApplication.save();
};

hotelApplicationSchema.statics.findAll = function () {
    return this.find({});
};

hotelApplicationSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

hotelApplicationSchema.statics.updateByid = function (_id, payload) {
    return this.findOneAndUpdate({ _id }, payload, { new: true });
};

hotelApplicationSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const hotelApplication = mongoose.model("hotelApplication", hotelApplicationSchema);

module.exports = hotelApplication;
