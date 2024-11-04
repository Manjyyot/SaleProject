const express = require('express');
const router = express.Router();
const {
    addLeadProfile,
    getAllLeadProfile,
    getLeadProfileById,
    editLeadProfileById,
    deleteLeadProfileById,
    getLeadProfileByEmailOrPhone
} = require('../controllers/leadsProfile.controller');

// Define routes
router.post('/add', addLeadProfile);
router.get('/', getAllLeadProfile);
router.get('/search', getLeadProfileByEmailOrPhone);
router.get('/:id', getLeadProfileById);
router.put('/edit/:id', editLeadProfileById);
router.delete('/delete/:id', deleteLeadProfileById);


module.exports = router;
