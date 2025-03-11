import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import './ScenarioCard.css';

const ScenarioCard = ({ scenario }) => {
  return (
    <div className="scenario-card">
      <div className="scenario-header">
        <div className="scenario-id">{scenario.scenarioId}</div>
        <div className="scenario-priority">{scenario.priority}</div>
      </div>
      <h3 className="scenario-name">{scenario.scenarioName}</h3>
      <p className="scenario-description">{scenario.description}</p>
      <div className="scenario-meta">
        <div className="creator-info">
          <span className="meta-label">Created by:</span>
          <div className="creator-details">
            <span className="creator-name">{scenario.createdBy.name}</span>
            <span className="creator-email">{scenario.createdBy.email}</span>
          </div>
        </div>
        <div className="timestamp-info">
          <span className="meta-label">Created:</span>
          <span className="timestamp">{formatDate(scenario.createdAt)}</span>
        </div>
      </div>
      <div className="scenario-status">
        <span className={`status-badge status-${scenario.status.toLowerCase()}`}>
          {scenario.status}
        </span>
      </div>
    </div>
  );
};

export default ScenarioCard; 