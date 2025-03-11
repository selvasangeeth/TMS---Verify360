import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TestCases.css';
import './common.css';

const TestCases = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([]);
  const [scenarioDetails, setScenarioDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTestCase, setNewTestCase] = useState({
    testCaseName: '',
    description: '',
    expectedResult: '',
    priority: 'Medium',
    status: 'Active'
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (scenarioId) {
      fetchScenarioDetails();
      fetchTestCases();
    }
  }, [scenarioId]);

  const fetchScenarioDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scenarios/detail/${scenarioId}`);
      if (response.data.success) {
        setScenarioDetails(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching scenario details:', error);
    }
  };

  const fetchTestCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/testcases/${scenarioId}`);
      
      if (response.data.success) {
        setTestCases(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching test cases:', error);
      setError('Error fetching test cases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestCase = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const testCaseData = {
        scenarioId,
        ...newTestCase
      };

      console.log('Sending test case data:', testCaseData);

      const response = await axios.post(`${API_BASE_URL}/testcases`, testCaseData);

      if (response.data.success) {
        setTestCases([response.data.data, ...testCases]);
        setShowAddModal(false);
        setNewTestCase({
          testCaseName: '',
          description: '',
          expectedResult: '',
          priority: 'Medium',
          status: 'Active'
        });
      }
    } catch (error) {
      console.error('Error adding test case:', error);
      setError(error.response?.data?.message || 'Error adding test case. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Goes back to scenarios
  };

  const filteredTestCases = testCases.filter(testCase =>
    testCase.testCaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testCase.testCaseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testCase.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading test cases...</div>;
  }

  return (
    <div className="testcases-container">
      <div className="actions-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search test cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Test Case
          </button>
        </div>
      </div>

      {scenarioDetails && (
        <div className="scenario-info">
          <h2>Test Cases for Scenario: {scenarioDetails.scenarioName}</h2>
          <p className="scenario-id">Scenario ID: {scenarioDetails.scenarioId}</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="testcases-table">
        <table>
          <thead>
            <tr>
              <th>Test Case ID</th>
              <th>Test Case Name</th>
              <th>Description</th>
              <th>Expected Result</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTestCases.map((testCase) => (
              <tr key={testCase._id} className="testcase-row">
                <td>{testCase.testCaseId}</td>
                <td>{testCase.testCaseName}</td>
                <td>
                  <div className="description-text">{testCase.description}</div>
                </td>
                <td>
                  <div className="description-text">{testCase.expectedResult}</div>
                </td>
                <td>
                  <span className={`priority-badge ${testCase.priority.toLowerCase()}`}>
                    {testCase.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${testCase.status.toLowerCase()}`}>
                    {testCase.status}
                  </span>
                </td>
                <td>
                  <div className="date-text">
                    {new Date(testCase.createdAt).toLocaleDateString()}
                  </div>
                </td>
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
            <h2>Add New Test Case</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAddTestCase}>
              <div className="form-group">
                <label>Test Case Name</label>
                <input
                  type="text"
                  value={newTestCase.testCaseName}
                  onChange={(e) => setNewTestCase({
                    ...newTestCase,
                    testCaseName: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTestCase.description}
                  onChange={(e) => setNewTestCase({
                    ...newTestCase,
                    description: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Result</label>
                <textarea
                  value={newTestCase.expectedResult}
                  onChange={(e) => setNewTestCase({
                    ...newTestCase,
                    expectedResult: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTestCase.priority}
                  onChange={(e) => setNewTestCase({
                    ...newTestCase,
                    priority: e.target.value
                  })}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newTestCase.status}
                  onChange={(e) => setNewTestCase({
                    ...newTestCase,
                    status: e.target.value
                  })}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Completed">Completed</option>
                </select>
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
                  Add Test Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCases; 