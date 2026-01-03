const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact
} = require('../controllers/contactController');

// POST /api/contacts - Create a new contact
router.post('/', createContact);

// GET /api/contacts - Get all contacts
router.get('/', getContacts);

// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', deleteContact);

module.exports = router;

