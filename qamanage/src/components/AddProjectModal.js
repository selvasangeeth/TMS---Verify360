import React, { useState } from 'react';
import axios from 'axios';
import './AddProjectModal.css';

const AddProjectModal = ({ onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [projectLogo, setProjectLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', projectName);
      formData.append('logo', projectLogo);

      const response = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onAddProject(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleLogoAttach = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectLogo(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Enter the project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Project Logo</label>
            <div className="logo-input">
              <input
                type="text"
                placeholder="Attach the logo"
                readOnly
                value={projectLogo ? projectLogo.name : ''}
              />
              <label className="attach-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoAttach}
                  hidden
                />
                📎
              </label>
            </div>
          </div>

          <button type="submit" className="add-project-button">
            <span className="plus-icon">+</span> Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;