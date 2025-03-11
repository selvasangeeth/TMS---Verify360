import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddScenarioModal from './AddScenarioModal';
import './ScenariosPage.css';

const ScenariosPage = ({ moduleName }) => {
  const [scenarios, setScenarios] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (moduleName) {
      fetchScenarios();
    }
  }, [moduleName]);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/scenarios/${moduleName}`);
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const handleScenarioAdded = (newScenario) => {
    setScenarios([newScenario, ...scenarios]);
  };

  return (
    <div className="scenarios-container">
      <div className="header-section">
        <h2>{moduleName} - Test Scenarios</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Scenario
        </button>
      </div>

      <table className="scenarios-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Sub Task ID</th>
            <th>Test Scenario Name</th>
            <th>Description</th>
            <th>No of Cases</th>
            <th>Created By</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario._id}>
              <td>{scenario.taskId}</td>
              <td>{scenario.subTaskId}</td>
              <td>{scenario.testScenarioName}</td>
              <td>{scenario.description}</td>
              <td>{scenario.numberOfCases}</td>
              <td>{scenario.createdBy}</td>
              <td>{new Date(scenario.createdDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddScenarioModal
          onClose={() => setShowAddModal(false)}
          onScenarioAdded={(newScenario) => {
            handleScenarioAdded(newScenario);
            fetchScenarios(); // Refresh the list after adding
          }}
          moduleName={moduleName}
        />
      )}
    </div>
  );
};

export default ScenariosPage; 