import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LogList.css'; // Import the CSS file

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [label, setLabel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [label, startDate, endDate]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/logs', {
        params: { label, startDate, endDate }
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.logMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="log-list-container">
      <h1>Logs</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Log ID / Log Message / Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filters">
        <label>
          Label:
          <select value={label} onChange={(e) => setLabel(e.target.value)}>
            <option value="">All</option>
            <option value="Case">Case</option>
            <option value="Scenario">Scenario</option>
            <option value="Module">Module</option>
            <option value="Project">Project</option>
            <option value="Run">Run</option>
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div className="table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Label</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Log message</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log._id} className="log-item">
                <td>{log._id}</td>
                <td>
                  <span className={`label label-${log.label.toLowerCase()}`}>
                    {log.label}
                  </span>
                </td>
                <td>{log.location}</td>
                <td>{new Date(log.date).toLocaleString()}</td>
                <td>{log.logMessage}</td>
                <td>{log.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogList;