const { mongoose } = require('../utils/conn');

const leadProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    expInYears: Number,
    currentSkill: String,
    currentCTC: String,
    currentCompany: String,
    currentJobRole: String,
    targetRole: String
});

const LeadProfileModel = mongoose.model('leadProfile', leadProfileSchema)
module.exports = LeadProfileModel;