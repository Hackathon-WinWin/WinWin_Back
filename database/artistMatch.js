const mongoose = require("mongoose");

const artistMatchSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    sent: [
        new mongoose.Schema({
            application_id: { type: String, required: true },
            recruitment_id: { type: String, required: true },
            hotelName: { type: String, required: true },
            recruitmentTitle: { type: String, required: true },
            checked: { type: Boolean, required: true },
            checkedDate: { type: Date },
        }),
    ],
    recieved: [
        new mongoose.Schema({
            application_id: { type: String, required: true },
            hotelName: { type: String, required: true },
            message: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            email: { type: String, required: true },
            title: { type: String, required: true },
            writtenTime: { type: Date, required: true },
        }),
    ],
});

artistMatchSchema.statics.create = function (payload) {
    const artistMatch = new this(payload);
    return artistMatch.save();
};

artistMatchSchema.statics.findAll = function () {
    return this.find({});
};

artistMatchSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

artistMatchSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

artistMatchSchema.statics.deleteByArtistAuthid = function (artistAuth_id) {
    return this.deleteOne({ artistAuth_id });
};

const artistMatch = mongoose.model("artistMatch", artistMatchSchema);

module.exports = artistMatch;
