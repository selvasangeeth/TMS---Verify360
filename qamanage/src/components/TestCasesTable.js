import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import './TestCasesTable.css';

const TestCasesTable = ({ testCases }) => {
  return (
    <table className="test-cases-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created By</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {testCases.map((testCase) => (
          <tr key={testCase._id}>
            <td>{testCase.testCaseId}</td>
            <td>{testCase.name}</td>
            <td>{testCase.description}</td>
            <td>
              <div className="creator-info-cell">
                <span>{testCase.createdBy.name}</span>
                <span className="creator-email">{testCase.createdBy.email}</span>
              </div>
            </td>
            <td>{formatDate(testCase.createdAt)}</td>
            <td>
              <span className={`status-badge status-${testCase.status.toLowerCase()}`}>
                {testCase.status}
              </span>
            </td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestCasesTable; 