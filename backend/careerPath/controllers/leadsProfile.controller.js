const LeadProfileModel = require('../models/leadsProfile.model');

// Add a new lead profile
const addLeadProfile = async (req, res) => {
    try {
        console.log(req.body)
        const newLead = new LeadProfileModel(req.body);
        await newLead.save();
        res.status(201).json({ message: 'Lead profile added successfully', data: newLead });
    } catch (error) {
        res.status(500).json({ message: 'Error adding lead profile', error });
    }
};

// Get all lead profiles
const getAllLeadProfile = async (req, res) => {
    try {
        const leads = await LeadProfileModel.find();
        res.status(200).json({ data: leads });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead profiles', error });
    }
};

// Get a lead profile by ID
const getLeadProfileById = async (req, res) => {
    try {
        const lead = await LeadProfileModel.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead profile not found' });
        }
        res.status(200).json({ data: lead });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead profile', error });
    }
};

// Edit a lead profile by ID
const editLeadProfileById = async (req, res) => {
    try {
        const updatedLead = await LeadProfileModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLead) {
            return res.status(404).json({ message: 'Lead profile not found' });
        }
        res.status(200).json({ message: 'Lead profile updated successfully', data: updatedLead });
    } catch (error) {
        res.status(500).json({ message: 'Error updating lead profile', error });
    }
};

// Delete a lead profile by ID
const deleteLeadProfileById = async (req, res) => {
    try {
        const deletedLead = await LeadProfileModel.findByIdAndDelete(req.params.id);
        if (!deletedLead) {
            return res.status(404).json({ message: 'Lead profile not found' });
        }
        res.status(200).json({ message: 'Lead profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lead profile', error });
    }
};

const getLeadProfileByEmailOrPhone = async (req, res) => {
    try {
        const { email, phoneNo } = req.query;
        if (!email && !phoneNo) {
            return res.status(400).json({ message: 'Please provide an email or phone number for the search' });
        }

        const query = {};
        if (email) query.email = email;
        if (phoneNo) query.phoneNo = phoneNo;
        console.log('query: ',query)

        const lead = await LeadProfileModel.findOne(query);
        
        if (!lead) {
            return res.status(404).json({ message: 'Lead profile not found' });
        }
        res.status(200).json({ data: lead });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead profile by email or phone', error });
    }
};


module.exports = {
    addLeadProfile,
    getAllLeadProfile,
    getLeadProfileById,
    editLeadProfileById,
    deleteLeadProfileById,
    getLeadProfileByEmailOrPhone
};