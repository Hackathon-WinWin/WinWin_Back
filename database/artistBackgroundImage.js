const mongoose = require("mongoose");

const artistBackgroundImageSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    backgroundImage: { type: String, required: true },
});

artistBackgroundImageSchema.statics.create = function (payload) {
    const artistBackgroundImage = new this(payload);
    return artistBackgroundImage.save();
};

artistBackgroundImageSchema.statics.findAll = function () {
    return this.find({});
};

artistBackgroundImageSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

artistBackgroundImageSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

artistBackgroundImageSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

artistBackgroundImageSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const artistBackgroundImage = mongoose.model("artistBackgroundImage", artistBackgroundImageSchema);

module.exports = artistBackgroundImage;
