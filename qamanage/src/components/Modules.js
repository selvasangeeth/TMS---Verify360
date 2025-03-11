import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from './axios';
import AddModuleModal from './AddModuleModal';
import './Modules.css';
import './common.css';

const Modules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('projectId');

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModule, setNewModule] = useState({
    moduleName: '',
    subModuleName: ''
  });

  // const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (projectId) {
      fetchModules(projectId);
    }
  }, [projectId]);

  const fetchModules = async (projectId) => {
    try {
      setLoading(true);
      console.log("Request m,ade");
      console.log("ppp"+projectId);
      // const response = await axios.get(`/getModules/${projectId}`);
      const response = await axios.get(`/getModules/${projectId}`); 
      console.log(response.data.data);
      console.log(response.data.msg);
      if (response.data.msg === "Module Fetched Success") {
        setModules(response.data.data);
      }
      
      console.log("hii");
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setError('Failed to fetch modules');
    } finally {
      setLoading(false);
    }
  };

  const handleModuleClick = (moduleId, projectId) => {
    console.log("project id at clickmod : "+projectId)
    navigate(`/modules/scenarios/${moduleId}/${projectId}`);
  };
  
  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/modules', {
        ...newModule,
        projectId
      });

      if (response.data.success) {
        setModules([response.data.data, ...modules]);
        setShowAddModal(false);
        setNewModule({ moduleName: '', subModuleName: '' });
      }
    } catch (error) {
      console.error('Error adding module:', error);
      setError('Failed to add module');
    }
  };

  const handleModuleAdded = (newModule) => {
    setModules([newModule, ...modules]);
  };

  const filteredModules = modules.filter(module =>
    module.moduleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.moduleId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.subModuleName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading modules...</div>;

  if (!projectId) {
    return <div className="error-message">Please select a project first</div>;
  }

  return (
    <div className="modules-container">
      <div className="actions-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Module
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchModules} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="modules-table">
        <table>
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Submodule Name</th>
              <th>Last Tested</th>
              <th>No of Scenarios</th>
              <th>No of Cases</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.map((module) => (
              <tr 
                key={module._id}
                onClick={() => handleModuleClick(module._id,projectId)}
                className="module-row"
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div>{module.moduleName}</div>
                  <div className="id-text">{module.moduleId}</div>
                </td>
                <td>
                  <div>{module.subModuleName}</div>
                </td>
                <td>
                  <div>{module.lastTestedBy}</div>
                  <div className="date-text">
                    {new Date(module.lastTested).toLocaleDateString()}
                  </div>
                </td>
                <td>{module.scenariosCount || 0}</td>
                <td>{module.casesCount || 0}</td>
                <td>
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                    }}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddModuleModal
          projectId={projectId}
          onClose={() => setShowAddModal(false)}
          onModuleAdded={handleModuleAdded}
        />
      )}
    </div>
  );
};

export default Modules;