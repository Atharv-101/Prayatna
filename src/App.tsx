import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import VesselList from './components/VesselList';
import RouteOptimizer from './components/RouteOptimizer';
import WeatherDashboard from './components/WeatherDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AlertsPanel from './components/AlertsPanel';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<MapView />} />
                    <Route path="/vessels" element={<VesselList />} />
                    <Route path="/routes" element={<RouteOptimizer />} />
                    <Route path="/routes/optimize/:vesselId" element={<RouteOptimizer />} />
                    <Route path="/weather" element={<WeatherDashboard />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/alerts" element={<AlertsPanel />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;