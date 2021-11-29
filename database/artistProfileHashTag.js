const mongoose = require("mongoose");

const artistProfileHashTagSchema = new mongoose.Schema({
    tagName: { type: String, required: true, unique: true },
    artistProfile_id: [
        new mongoose.Schema({
            artistProfile: { type: String, required: true, unique: true },
        }),
    ],
});

artistProfileHashTagSchema.statics.create = function (payload) {
    const artistProfileHashTag = new this(payload);
    return artistProfileHashTag.save();
};

artistProfileHashTagSchema.statics.findAll = function () {
    return this.find({});
};

artistProfileHashTagSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

artistProfileHashTagSchema.statics.findOneByTagName = function (tagName) {
    return this.findOne({ tagName });
};

artistProfileHashTagSchema.statics.deleteByTagName = function (tagName) {
    return this.deleteOne({ tagName });
};

const artistProfileHashTag = mongoose.model("artistProfileHashTag", artistProfileHashTagSchema);

module.exports = artistProfileHashTag;
