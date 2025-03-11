import React, { useState } from 'react';
import axios from 'axios';
import './AddScenarioModal.css';

const AddScenarioModal = ({ onClose, onScenarioAdded, moduleName }) => {
  const [scenarioData, setScenarioData] = useState({
    taskId: '',
    subTaskId: '',
    testScenarioName: '',
    description: '',
    numberOfCases: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/scenarios', {
        ...scenarioData,
        moduleName,
        createdBy: 'Surya Prabhu T',
        createdDate: new Date().toISOString()
      });

      console.log('Scenario added:', response.data);
      onScenarioAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding scenario:', error);
      alert('Failed to add scenario');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Test Scenario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task ID</label>
            <input
              type="text"
              value={scenarioData.taskId}
              onChange={(e) => setScenarioData({
                ...scenarioData,
                taskId: e.target.value
              })}
              placeholder="e.g., Task - 232"
              required
            />
          </div>

          <div className="form-group">
            <label>Sub Task ID</label>
            <input
              type="text"
              value={scenarioData.subTaskId}
              onChange={(e) => setScenarioData({
                ...scenarioData,
                subTaskId: e.target.value
              })}
              placeholder="e.g., Task - 232 - Sub - 001"
              required
            />
          </div>

          <div className="form-group">
            <label>Test Scenario Name</label>
            <input
              type="text"
              value={scenarioData.testScenarioName}
              onChange={(e) => setScenarioData({
                ...scenarioData,
                testScenarioName: e.target.value
              })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={scenarioData.description}
              onChange={(e) => setScenarioData({
                ...scenarioData,
                description: e.target.value
              })}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Cases</label>
            <input
              type="number"
              value={scenarioData.numberOfCases}
              onChange={(e) => setScenarioData({
                ...scenarioData,
                numberOfCases: e.target.value
              })}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Scenario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScenarioModal; 