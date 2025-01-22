const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCustomer, getCustomers } = require('../controllers/customerController');

const router = express.Router();

router.use(protect);
router.post('/', createCustomer);
router.get('/', getCustomers);

module.exports = router;
