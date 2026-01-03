import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Live validation
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    // Clear success message when user types
    if (success) {
      setSuccess(false);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      !errors.name &&
      !errors.email &&
      !errors.phone
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'message') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/contacts`, formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});

        // Notify parent component to refresh list
        if (onContactAdded) {
          onContactAdded();
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create contact. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'error' : ''}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'error' : ''}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? 'error' : ''}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Additional notes..."
          />
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        {success && (
          <div className="success-message">
            ✓ Contact added successfully!
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid() || loading}
        >
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

