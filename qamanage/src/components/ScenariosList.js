import React from 'react';
import ScenarioCard from './ScenarioCard';
import './ScenariosList.css';

const ScenariosList = ({ scenarios }) => {
  return (
    <div className="scenarios-list">
      {scenarios.length === 0 ? (
        <div className="no-scenarios">
          <p>No scenarios found</p>
        </div>
      ) : (
        scenarios.map((scenario) => (
          <ScenarioCard key={scenario._id} scenario={scenario} />
        ))
      )}
    </div>
  );
};

export default ScenariosList; 