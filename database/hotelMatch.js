const mongoose = require("mongoose");

const hotelMatchSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true, unique: true },
    sent: [
        new mongoose.Schema({
            application_id: { type: String, required: true },
            artistAuth_id: { type: String, required: true },
            name: { type: String, required: true },
            message: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            email: { type: String, required: true },
            title: { type: String, required: true },
            checked: { type: Boolean, required: true },
            checkedDate: { type: Date },
        }),
    ],
    recieved: [
        new mongoose.Schema({
            application_id: { type: String, required: true },
            artistAuth_id: { type: String, required: true },
            recruitment_id: { type: String, required: true },
            name: { type: String, required: true },
            recruitmentTitle: { type: String, required: true },
            writtenTime: { type: Date, required: true },
        }),
    ],
});

hotelMatchSchema.statics.create = function (payload) {
    const hotelMatch = new this(payload);
    return hotelMatch.save();
};

hotelMatchSchema.statics.findAll = function () {
    return this.find({});
};

hotelMatchSchema.statics.findOneByHotelAuthid = function (hotelAuth_id) {
    return this.findOne({ hotelAuth_id });
};

hotelMatchSchema.statics.updateByHotelAuthid = function (hotelAuth_id, payload) {
    return this.findOneAndUpdate({ hotelAuth_id }, payload, { new: true });
};

hotelMatchSchema.statics.deleteByHotelAuthid = function (hotelAuth_id) {
    return this.deleteOne({ hotelAuth_id });
};

const hotelMatch = mongoose.model("hotelMatch", hotelMatchSchema);

module.exports = hotelMatch;
