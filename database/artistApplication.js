const mongoose = require("mongoose");

const artistApplicationSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true },
    recruitment_id: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hotelName: { type: String, required: true },
    recruitmentTitle: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    writtenTime: { type: Date, required: true },
});

artistApplicationSchema.statics.create = function (payload) {
    const artistApplication = new this(payload);
    return artistApplication.save();
};

artistApplicationSchema.statics.findAll = function () {
    return this.find({});
};

artistApplicationSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

artistApplicationSchema.statics.updateByid = function (_id, payload) {
    return this.findOneAndUpdate({ _id }, payload, { new: true });
};

artistApplicationSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const artistApplication = mongoose.model("artistApplication", artistApplicationSchema);

module.exports = artistApplication;
