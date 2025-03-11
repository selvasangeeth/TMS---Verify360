import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import './ModuleCard.css';

const ModuleCard = ({ module }) => {
  return (
    <div className="module-card">
      <div className="module-header">
        <h3>{module.name}</h3>
      </div>
      <div className="module-meta">
        <div className="creator-info">
          <span className="creator-label">Created by:</span>
          <span className="creator-name">{module.createdBy.name}</span>
        </div>
        <div className="timestamp-info">
          <span className="timestamp-label">Created:</span>
          <span className="timestamp">{formatDate(module.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard; 