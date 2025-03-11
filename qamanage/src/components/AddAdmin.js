import React, { useState } from 'react';
import axios from 'axios';
import './AddAdmin.css';

const AddAdmin = ({ onClose, onAdminAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/create', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onAdminAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div className="add-admin-container">
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admin Name</label>
          <input
            type="text"
            placeholder="Enter the admin name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Admin Email</label>
          <input
            type="email"
            placeholder="Enter the admin email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Admin Position</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
          >
            <option value="">Select position</option>
            <option value="QA Manager">QA Manager</option>
            <option value="QA Lead">QA Lead</option>
            <option value="QA Assistant Manager">QA Assistant Manager</option>
          </select>
        </div>

        <div className="form-group">
          <label>Admin Password</label>
          <input
            type="password"
            placeholder="Enter the admin password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button type="submit" className="add-admin-btn">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;