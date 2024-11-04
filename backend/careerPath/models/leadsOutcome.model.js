const { mongoose } = require('../utils/conn');

const leadOutcomeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    targetRole: {
        type: String,
        required: true,
        trim: true
    },
    KRA_KPI: {
        type: String,
        required: true,
        trim: true
    },
    transferrableSkills: {
        type: [String], // Array of strings for multiple skills
        required: true
    },
    skillsReqToBeDeveloped: {
        type: [String], // Array of strings for multiple skills
        required: true
    },
    expectedCTCRange: {
        type: String,
        required: true,
        trim: true
    },
    potentialCompanies: {
        type: [String], // Array of strings for multiple companies
        required: true
    },
    whichCourseFromGivenBrochureList: {
        type: String,
        required: true,
        trim: true
    },
    howCourseIsGoingToHelpInAchievingTarget: {
        type: String,
        required: true,
        trim: true
    },
    salesPitchInDetails: {
        type: String,
        required: true,
        trim: true
    }
});

const LeadOutcomeModel = mongoose.model('LeadOutcome', leadOutcomeSchema);
module.exports = LeadOutcomeModel;
