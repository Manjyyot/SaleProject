// leadsOutcome.controller.js
const LeadProfileModel = require('../models/leadsProfile.model');
const LeadOutcomeModel = require('../models/leadsOutcome.model');
const sendToGPTAssistant = require('../utils/chatGPT').sendToGPTAssistant;

// Fetch user details, send to GPT, and store the output
const processLeadOutcome = async (req, res) => {
    try {
        const { email, phoneNo, id } = req.query;
        let lead;

        // Fetch the user details based on provided identifier
        if (email) {
            lead = await LeadProfileModel.findOne({ email });
        } else if (phoneNo) {
            lead = await LeadProfileModel.findOne({ phoneNo });
        } else if (id) {
            lead = await LeadProfileModel.findById(id);
        }

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        // Send the lead data to GPT assistant
        const gptResponse = await sendToGPTAssistant({
            message: JSON.stringify(lead)
        });

        // Create and save the outcome
        const newOutcome = new LeadOutcomeModel({
            email: lead.email,
            targetRole: gptResponse.targetRole,
            KRA_KPI: gptResponse.KRA_KPI,
            transferrableSkills: gptResponse.transferrableSkills,
            skillsReqToBeDeveloped: gptResponse.skillsReqToBeDeveloped,
            expectedCTCRange: gptResponse.expectedCTCRange,
            potentialCompanies: gptResponse.potentialCompanies,
            whichCourseFromGivenBrochureList: gptResponse.whichCourseFromGivenBrochureList,
            howCourseIsGoingToHelpInAchievingTarget: gptResponse.howCourseIsGoingToHelpInAchievingTarget,
            salesPitchInDetails: gptResponse.salesPitchInDetails
        });

        await newOutcome.save();

        res.status(201).json({ message: 'Lead outcome processed and saved successfully', data: newOutcome });
    } catch (error) {
        console.error('Error processing lead outcome:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


const getLeadOutcomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const outcome = await LeadOutcomeModel.findById(id);
        if (!outcome) {
            return res.status(404).json({ message: 'Lead outcome not found' });
        }
        res.status(200).json({ data: outcome });
    } catch (error) {
        console.error('Error fetching lead outcome by ID:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get lead outcome by email or phone
const getLeadOutcomeByEmailOrPhone = async (req, res) => {
    try {
        const { email, phoneNo } = req.query;
        let outcome;

        if (email) {
            outcome = await LeadOutcomeModel.findOne({ email });
        } else if (phoneNo) {
            outcome = await LeadOutcomeModel.findOne({ phoneNo });
        }

        if (!outcome) {
            return res.status(404).json({ message: 'Lead outcome not found' });
        }
        res.status(200).json({ data: outcome });
    } catch (error) {
        console.error('Error fetching lead outcome by email or phone:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Update lead outcome by ID
const updateLeadOutcomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOutcome = await LeadOutcomeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOutcome) {
            return res.status(404).json({ message: 'Lead outcome not found' });
        }
        res.status(200).json({ message: 'Lead outcome updated successfully', data: updatedOutcome });
    } catch (error) {
        console.error('Error updating lead outcome by ID:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete lead outcome by ID
const deleteLeadOutcomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOutcome = await LeadOutcomeModel.findByIdAndDelete(id);
        if (!deletedOutcome) {
            return res.status(404).json({ message: 'Lead outcome not found' });
        }
        res.status(200).json({ message: 'Lead outcome deleted successfully' });
    } catch (error) {
        console.error('Error deleting lead outcome by ID:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    processLeadOutcome,
    getLeadOutcomeById,
    getLeadOutcomeByEmailOrPhone,
    updateLeadOutcomeById,
    deleteLeadOutcomeById
};