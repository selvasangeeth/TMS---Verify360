import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectDropdown.css';

const ProjectDropdown = ({ onProjectSelect }) => {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProject = () => {
    // Open add project modal
    setIsOpen(true);
  };

  return (
    <div className="project-dropdown">
      <div className="dropdown-header">
        <select onChange={(e) => onProjectSelect(e.target.value)}>
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        <button className="add-project-btn" onClick={handleAddProject}>
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDropdown; 