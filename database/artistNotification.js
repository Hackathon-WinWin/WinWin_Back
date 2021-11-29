const mongoose = require("mongoose");

const artistNotificationSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    notifications: [
        new mongoose.Schema({
            hotelAuth_id: { type: String, required: true },
            type: { type: String, required: true },
            text: { type: String, required: true },
            time: { type: Date, required: true },
        }),
    ],
});

artistNotificationSchema.statics.create = function (payload) {
    const artistNotification = new this(payload);
    return artistNotification.save();
};

artistNotificationSchema.statics.findAll = function () {
    return this.find({});
};

artistNotificationSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

artistNotificationSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

artistNotificationSchema.statics.deleteByArtistAuthid = function (artistAuth_id) {
    return this.deleteOne({ artistAuth_id });
};

const artistNotification = mongoose.model("artistNotification", artistNotificationSchema);

module.exports = artistNotification;
