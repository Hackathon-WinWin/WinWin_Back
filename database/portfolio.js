const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    artistAuth_id: { type: String, required: true, unique: true },
    portfolios: [
        {
            artistAuth_id: { type: String, required: true },
            title: { type: String, required: true },
            introduceText: { type: String, required: true },
            link: { type: String, required: true },
            images: [{ image: String }],
        },
    ],
});

portfolioSchema.statics.create = function (payload) {
    const portfolio = new this(payload);
    return portfolio.save();
};

portfolioSchema.statics.findAll = function () {
    return this.find({});
};

portfolioSchema.statics.findOneByid = function (_id) {
    return this.findOne({ _id });
};

portfolioSchema.statics.findOneByArtistAuthid = function (artistAuth_id) {
    return this.findOne({ artistAuth_id });
};

portfolioSchema.statics.updateByArtistAuthid = function (artistAuth_id, payload) {
    return this.findOneAndUpdate({ artistAuth_id }, payload, { new: true });
};

portfolioSchema.statics.deleteByid = function (_id) {
    return this.deleteOne({ _id });
};

const portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = portfolio;
