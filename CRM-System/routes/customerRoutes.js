const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');

const router = express.Router();

router.use(protect);
router.post('/create', createCustomer);
router.get('/', getCustomers);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', deleteCustomer);

module.exports = router;
