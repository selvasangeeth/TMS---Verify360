import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className="project-status">{project.status}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-meta">
        <div className="creator-info">
          <span className="creator-label">Created by:</span>
          <span className="creator-name">{project.createdBy.name}</span>
        </div>
        <div className="timestamp-info">
          <span className="timestamp-label">Created:</span>
          <span className="timestamp">{formatDate(project.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 