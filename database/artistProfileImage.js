const mongoose = require("mongoose");

const artistProfileImageSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    profileImage: { type: String, required: true },
});

artistProfileImageSchema.statics.create = function (payload) {
    const artistProfileImage = new this(payload);
    return artistProfileImage.save();
};

artistProfileImageSchema.statics.findAll = function () {
    return this.find({});
};

artistProfileImageSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

artistProfileImageSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

artistProfileImageSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

artistProfileImageSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const artistProfileImage = mongoose.model("artistProfileImage", artistProfileImageSchema);

module.exports = artistProfileImage;
