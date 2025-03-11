import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import './Scenarios.css';
import './common.css';

const Scenarios = () => {
  const { moduleId, projectId } = useParams();
  console.log('Module ID:', moduleId);
  console.log('Project ID:', projectId);
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [moduleDetails, setModuleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScenario, setNewScenario] = useState({
    scenarioIdstr: '',
    description: '',
    taskId: '',
    subTaskId: '',
    projectId: projectId
  });

  useEffect(() => {
    console.log('Current moduleId:', moduleId);
  }, [moduleId]);

  useEffect(() => {
    if (moduleId) {
      fetchModuleDetails();
      fetchScenarios();
    }
  }, [moduleId]);

  const fetchModuleDetails = async () => {
    try {
      const response = await axios.get(`/getModules/${moduleId}`);
      setModuleDetails(response.data.sc);
    } catch (error) {
      console.error('Error fetching module details:', error);
    }
  };

  const fetchScenarios = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching scenarios for moduleId:', moduleId);

      const response = await axios.get(`/getScenario/${moduleId}`);
      console.log(response.data);
      console.log('Scenarios response:', response.data);

      if (response.data.msg === "Success Scenario Fetch") {
        setScenarios(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      setError('Error fetching scenarios. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddScenario = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const scenarioData = {
        moduleId,
        ...newScenario,
      };
      console.log("ModuleId  : " + moduleId);

      console.log('Sending scenario data:', scenarioData);

      const response = await axios.post('/createScenario', scenarioData);
      console.log('Add scenario response:', response.data);

      if (response.data.success) {
        setScenarios([response.data.data, ...scenarios]);
        setShowAddModal(false);
        setNewScenario({
          scenarioIdstr: '',
          description: '',
          taskId: '',
          subTaskId: '',
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error adding scenario:', error.response?.data || error);
      setError(error.response?.data?.message || 'Error adding scenario. Please try again.');
    }
  };

  const handleScenarioClick = (scenarioId,projectId,moduleId) => {
    console.log(scenarioId);
    console.log("sdewfewf : "+moduleId);
    navigate(`/modules/scenarios/testcases/${scenarioId}/${projectId}/${moduleId}`);
  };
  // navigate(`/modules/scenarios/${moduleId}/${projectId}`);

  const handleBackClick = () => {
    navigate('/modules');
  };

  const filteredScenarios = scenarios.filter(scenario =>
    scenario.scenarioIdstr.includes(searchTerm) ||
    scenario.description.includes(searchTerm) ||
    scenario.taskId.includes(searchTerm) ||
    scenario.subTaskId.includes(searchTerm)
  );

  if (loading) {
    return <div className="loading">Loading scenarios...</div>;
  }

  return (
    <div className="scenarios-container">
      <div className="scenarios-header">
        <button 
          className="back-button"
          onClick={handleBackClick}
        >
          ← Back to Modules
        </button>
        {moduleDetails && (
          <div className="module-info">
            <h2>{moduleDetails.moduleName}</h2>
            <p className="submodule-name">{moduleDetails.subModuleName}</p>
          </div>
        )}
      </div>

      <div className="actions-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search scenarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Scenario
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="scenarios-table">
        <table>
          <thead>
            <tr>
              <th>Scenario ID</th>
              <th>Task ID</th>
              <th>Sub Task ID</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Cases Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScenarios.map((scenario) => (
              <tr key={scenario._id} className="scenario-row">
                <td>
                  <span 
                    className="clickable-id"
                    onClick={() => handleScenarioClick(scenario._id,projectId,moduleId)}
                  >
                    {scenario.scenarioIdstr}
                  </span>
                </td>
                <td>{scenario.taskId}</td>
                <td>{scenario.subTaskId}</td>
                <td>
                  <div className="description-text">{scenario.scenarioDescription}</div>
                </td>
                <td>
                  <div className="date-text">
                    {new Date(scenario.timestamp).toLocaleDateString()}
                  </div>
                </td>
                <td>{scenario.casesCount}</td>
                <td>
                  <button className="action-btn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Scenario</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAddScenario}>
              <div className="form-group">
                <label>Scenario ID</label>
                <input
                  type="text"
                  value={newScenario.scenarioIdstr}
                  onChange={(e) => setNewScenario({
                    ...newScenario,
                    scenarioIdstr: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Task ID</label>
                <input
                  type="text"
                  value={newScenario.taskId}
                  onChange={(e) => setNewScenario({
                    ...newScenario,
                    taskId: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Sub Task ID</label>
                <input
                  type="text"
                  value={newScenario.subTaskId}
                  onChange={(e) => setNewScenario({
                    ...newScenario,
                    subTaskId: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newScenario.description}
                  onChange={(e) => setNewScenario({
                    ...newScenario,
                    description: e.target.value
                  })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Scenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scenarios;
