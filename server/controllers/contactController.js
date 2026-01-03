const Contact = require('../models/Contact');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required fields'
      });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message: message || ''
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating contact',
      error: error.message
    });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const { sort = 'latest' } = req.query;
    
    let sortOption = {};
    if (sort === 'latest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'name') {
      sortOption = { name: 1 };
    }

    const contacts = await Contact.find().sort(sortOption);

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

