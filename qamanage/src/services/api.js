import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const scenarioService = {
  getScenarios: (moduleId) => api.get(`/scenarios/${moduleId}`),
  createScenario: (scenarioData) => api.post('/scenarios', scenarioData),
  updateScenario: (id, data) => api.put(`/scenarios/${id}`, data),
  deleteScenario: (id) => api.delete(`/scenarios/${id}`)
};

export default api; 