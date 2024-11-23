import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Marketplace from './pages/Marketplace';
import InvestorDashboard from './pages/dashboard/InvestorDashboard';
import ProjectDashboard from './pages/dashboard/ProjectDashboard';
import PublicPage from './pages/dashboard/project/PublicPage';
import NFTCollections from './pages/dashboard/project/NFTCollections';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, checkSession, isLoading } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Navigate to={`/dashboard/${user.role}`} replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/dashboard/investor"
              element={
                <PrivateRoute role="investor">
                  <InvestorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/project"
              element={
                <PrivateRoute role="project">
                  <ProjectDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/project/public"
              element={
                <PrivateRoute role="project">
                  <PublicPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/project/nft"
              element={
                <PrivateRoute role="project">
                  <NFTCollections />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;