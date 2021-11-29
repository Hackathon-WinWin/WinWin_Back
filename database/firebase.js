const mongoose = require("mongoose");

const firebaseSchema = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    firebaseToken: { type: String, required: true, unique: true },
});

firebaseSchema.statics.create = function (payload) {
    const firebase = new this(payload);
    return firebase.save();
};

firebaseSchema.statics.findAll = function () {
    return this.find({});
};

firebaseSchema.statics.findOneByAccount = function (account) {
    return this.findOne({ account });
};

firebaseSchema.statics.findOneByFirebaseToken = function (firebaseToken) {
    return this.findOne({ firebaseToken });
};

firebaseSchema.statics.deleteByAccount = function (account) {
    return this.deleteOne({ account });
};

firebaseSchema.statics.deleteByFirebaseToken = function (firebaseToken) {
    return this.deleteOne({ firebaseToken });
};

const firebase = mongoose.model("firebase", firebaseSchema);

module.exports = firebase;
