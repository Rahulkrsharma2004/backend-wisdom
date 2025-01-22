const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API for managing customers.
 */

// Apply middleware to protect all routes
router.use(protect);

/**
 * @swagger
 * /api/customers/create:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               company:
 *                 type: string
 *                 example: ABC Corp
 *     responses:
 *       201:
 *         description: Customer created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Server error.
 */
router.post('/create', createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Filter customers by associated company.
 *     responses:
 *       200:
 *         description: A list of customers.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Server error.
 */
router.get('/', getCustomers);

/**
 * @swagger
 * /api/customers/update/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               phone:
 *                 type: string
 *                 example: "+9876543210"
 *               company:
 *                 type: string
 *                 example: XYZ Inc
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Server error.
 */
router.put('/update/:id', updateCustomer);

/**
 * @swagger
 * /api/customers/delete/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer to delete.
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Server error.
 */
router.delete('/delete/:id', deleteCustomer);

module.exports = router;
