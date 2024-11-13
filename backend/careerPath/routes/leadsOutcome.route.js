const express = require('express');
const router = express.Router();
const { 
    processLeadOutcome,
    getLeadOutcomeById,
    getLeadOutcomeByEmailOrPhone,
    updateLeadOutcomeById,
    deleteLeadOutcomeById,
    getTotalLeadOutcomes
} = require('../controllers/leadsOutcome.controller');

// Define routes for lead outcomes
router.get('/process', processLeadOutcome);
router.get('/search', getLeadOutcomeByEmailOrPhone);
router.get('/total', getTotalLeadOutcomes)
router.get('/:id', getLeadOutcomeById);
router.put('/update/:id', updateLeadOutcomeById);
router.delete('/delete/:id', deleteLeadOutcomeById);

module.exports = router;