const Customer = require("../models/Customer");

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required." });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      company,
      user: req.user.id,
    });

    await customer.save();
    res
      .status(201)
      .json({ message: "Customer created successfully.", data: customer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create customer.", error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const { name, email, phone, company } = req.query;
    const filters = { user: req.user.id };

    if (name) filters.name = new RegExp(name, "i");
    if (email) filters.email = new RegExp(email, "i");
    if (phone) filters.phone = phone;
    if (company) filters.company = company;

    const customers = await Customer.find(filters);
    res
      .status(200)
      .json({ message: "Customers retrieved successfully.", data: customers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve customers.", error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const customer = await Customer.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not authorized to update." });
    }

    res
      .status(200)
      .json({ message: "Customer updated successfully.", data: customer });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update customer.", error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not authorized to delete." });
    }

    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete customer.", error: error.message });
  }
};
