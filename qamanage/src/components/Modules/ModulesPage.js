import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModulesPage.css';

const ModulesPage = ({ projectId }) => {
  const [modules, setModules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchModules();
    }
  }, [projectId]);

  const fetchModules = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/modules`);
      setModules(response.data.modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <div className="modules-page">
      <div className="modules-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search By Module Name / Module ID / Submodule Name / Submodule ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-module-btn" onClick={() => setShowAddModal(true)}>
          Add Module
        </button>
      </div>

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
            {modules.map((module) => (
              <tr key={module._id}>
                <td>{module.name}</td>
                <td>{module.submoduleName}</td>
                <td>{module.lastTested}</td>
                <td>{module.scenariosCount}</td>
                <td>{module.casesCount}</td>
                <td>
                  <button className="action-btn">⋮</button>
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
          onModuleAdded={fetchModules}
        />
      )}
    </div>
  );
};

export default ModulesPage; 