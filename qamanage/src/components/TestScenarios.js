import React, { useState } from 'react';
import AddScenarioModal from './AddScenarioModal';
import './TestScenarios.css';

const TestScenarios = ({ moduleName, onBack }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [scenarios, setScenarios] = useState([
    {
      taskId: 'Task - 232',
      subTaskId: 'Task - 232 - Sub - 001',
      testScenario: 'SpanPeople_SS_TS_01',
      description: 'Verify the user able to request the Timeoff on Past and Future saturdays.',
      createdBy: 'Surya Prabhu T',
      createdDate: 'March 05 2025',
      noCases: '50'
    }
  ]);

  const handleScenarioAdded = (newScenario) => {
    setScenarios([...scenarios, newScenario]);
  };

  return (
    <div className="scenarios-container">
      <div className="scenarios-header">
        <div className="breadcrumb">
          Project name 1 / {moduleName} / Scenarios
        </div>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search By Test Scenario ID"
            className="search-input"
          />
          <select className="module-select">
            <option>Module name 1</option>
          </select>
          <button 
            className="add-scenario-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add Scenario
          </button>
        </div>
      </div>

      <table className="scenarios-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Sub Task ID</th>
            <th>Test Scenario</th>
            <th>Created By</th>
            <th>No of Cases</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario, index) => (
            <tr key={index}>
              <td>{scenario.taskId}</td>
              <td>{scenario.subTaskId}</td>
              <td className="scenario-cell">
                <div className="scenario-info">
                  <div className="scenario-name">{scenario.testScenario}</div>
                  <div className="scenario-desc">{scenario.description}</div>
                </div>
              </td>
              <td>
                <div className="creator-info">
                  <div>{scenario.createdBy}</div>
                  <div className="created-date">{scenario.createdDate}</div>
                </div>
              </td>
              <td>{scenario.noCases}</td>
              <td>
                <button className="action-btn">✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddScenarioModal
          onClose={() => setShowAddModal(false)}
          onScenarioAdded={handleScenarioAdded}
          moduleName={moduleName}
        />
      )}
    </div>
  );
};

export default TestScenarios; 