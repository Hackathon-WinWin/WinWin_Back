const mongoose = require("mongoose");

const bookMarkSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    bookMarks: [
        {
            hotelAuth_id: { type: String, required: true, unique: true },
        },
    ],
});

bookMarkSchema.statics.create = function (payload) {
    const bookMark = new this(payload);
    return bookMark.save();
};

bookMarkSchema.statics.findAll = function () {
    return this.find({});
};

bookMarkSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

bookMarkSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

bookMarkSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

bookMarkSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const bookMark = mongoose.model("bookMark", bookMarkSchema);

module.exports = bookMark;
