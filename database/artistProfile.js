const mongoose = require('mongoose');

const artistProfileSchema = new mongoose.Schema({
  artistAuth_id: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  introduceText: { type: String, required: true },
  hashTag: [
    new mongoose.Schema({
      tagName: { type: String },
    }),
  ],
});

artistProfileSchema.statics.create = function (payload) {
  const artistProfile = new this(payload);
  return artistProfile.save();
};

artistProfileSchema.statics.findAll = function () {
  return this.find({});
};

artistProfileSchema.statics.findOneByid = function (_id) {
  return this.findOne({ _id });
};

artistProfileSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
  return this.findOne({ artistAuth_id });
};

artistProfileSchema.statics.findOneByNickname = function (nickname) {
  return this.findOne({ nickname });
};

artistProfileSchema.statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};

artistProfileSchema.statics.updateByArtistAuthid = function (
  artistAuth_id,
  payload
) {
  return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

artistProfileSchema.statics.deleteByid = function (_id) {
  return this.deleteOne({ _id });
};

const artistProfile = mongoose.model('artistProfile', artistProfileSchema);

module.exports = artistProfile;
