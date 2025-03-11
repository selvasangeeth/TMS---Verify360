import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './AddTestCaseModal.css';

const AddTestCaseModal = ({ scenarioId, onClose, onTestCaseAdded }) => {
  const [formData, setFormData] = useState({
    testCaseName: '',
    description: '',
    expectedResult: '',
    priority: 'Medium',
    status: 'Active'
  });

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/testcases', {
        ...formData,
        scenarioId,
        userId: user._id,
        userName: user.name,
        userEmail: user.email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        onTestCaseAdded(response.data.data);
        onClose();
      }
    } catch (error) {
      console.error('Error adding test case:', error);
      // Handle error (show error message to user)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Test Case</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Test Case Name:</label>
            <input
              type="text"
              name="testCaseName"
              value={formData.testCaseName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expected Result:</label>
            <textarea
              name="expectedResult"
              value={formData.expectedResult}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Test Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestCaseModal; 