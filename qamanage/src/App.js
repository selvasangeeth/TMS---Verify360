import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AddAdmin from './components/AddAdmin';
import './App.css';
import Scenarios from './components/Scenarios';
import TestCases from './components/TestCases';
import Modules from './components/Modules';
import LogList from './components/LogList'; // Import LogList

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/modules" element={<Dashboard><Modules /></Dashboard>} />
          <Route path="/modules/scenarios/:moduleId/:projectId" element={<Dashboard><Scenarios /></Dashboard>} />
          <Route path="/modules/scenarios/testcases/:scenarioId/:projectId/:moduleId" element={<Dashboard><TestCases /></Dashboard>} />
          <Route
            path="/add-admin"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <AddAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/activity" element={<Dashboard><LogList /></Dashboard>} /> {/* Add LogList route */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;