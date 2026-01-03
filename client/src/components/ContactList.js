import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactList = ({ refreshTrigger }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/contacts?sort=${sortBy}`);
      
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch contacts. Please try again.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contacts on component mount and when sortBy or refreshTrigger changes
  useEffect(() => {
    fetchContacts();
  }, [sortBy, refreshTrigger]);

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await axios.delete(`${API_URL}/contacts/${id}`);
      
      if (response.data.success) {
        // Remove contact from list immediately (optimistic update)
        setContacts(prev => prev.filter(contact => contact._id !== id));
      }
    } catch (err) {
      setError('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', err);
      // Refresh list on error
      fetchContacts();
    } finally {
      setDeletingId(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="contact-list-container">
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="contact-list-container">
      <div className="list-header">
        <h2>Contacts ({contacts.length})</h2>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={fetchContacts}>Retry</button>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts yet. Add your first contact!</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map(contact => (
            <div key={contact._id} className="contact-card">
              <div className="contact-header">
                <h3>{contact.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact._id)}
                  disabled={deletingId === contact._id}
                  title="Delete contact"
                >
                  {deletingId === contact._id ? '...' : '×'}
                </button>
              </div>
              
              <div className="contact-info">
                <div className="info-item">
                  <span className="label">Email:</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
                
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
                
                {contact.message && (
                  <div className="info-item message">
                    <span className="label">Message:</span>
                    <p>{contact.message}</p>
                  </div>
                )}
                
                <div className="contact-date">
                  Added: {formatDate(contact.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;

