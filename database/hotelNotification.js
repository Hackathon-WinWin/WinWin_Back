const mongoose = require("mongoose");

const hotelNotificationSchema = new mongoose.Schema({
    hotelAuth_id: { type: String, required: true, unique: true },
    notifications: [
        new mongoose.Schema({
            artistAuth_id: { type: String, required: true },
            type: { type: String, required: true },
            text: { type: String, required: true },
            time: { type: Date, required: true },
        }),
    ],
});

hotelNotificationSchema.statics.create = function (payload) {
    const hotelNotification = new this(payload);
    return hotelNotification.save();
};

hotelNotificationSchema.statics.findAll = function () {
    return this.find({});
};

hotelNotificationSchema.statics.findOneByHotelAuthid = function (hotelAuth_id) {
    return this.findOne({ hotelAuth_id });
};

hotelNotificationSchema.statics.updateByHotelAuthid = function (hotelAuth_id, payload) {
    return this.findOneAndUpdate({ hotelAuth_id }, payload, { new: true });
};

hotelNotificationSchema.statics.deleteByHotelAuthid = function (hotelAuth_id) {
    return this.deleteOne({ hotelAuth_id });
};

const hotelNotification = mongoose.model("hotelNotification", hotelNotificationSchema);

module.exports = hotelNotification;
