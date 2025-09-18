import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

// View Components  
import AdminDashboard from './components/AdminView/AdminDashboard';
import FacultyDashboard from './components/FacultyView/FacultyDashboard';
import StudentDashboard from './components/StudentView/StudentDashboard';
import Login from './components/Layout/Login';

// Data Context
import { AppProvider } from './hooks/useAppContext';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Demo login function
  const handleLogin = (role) => {
    const userData = {
      admin: { 
        id: 'admin001', 
        name: 'Dr. John Admin', 
        role: 'admin',
        email: 'admin@university.edu' 
      },
      faculty: { 
        id: 'fac001', 
        name: 'Prof. Sarah Chen', 
        role: 'faculty',
        email: 'sarah.chen@university.edu',
        department: 'Computer Science'
      },
      student: { 
        id: 'stu001', 
        name: 'Alex Johnson', 
        role: 'student',
        email: 'alex.johnson@university.edu',
        batch: 'CS2024',
        program: 'Computer Science'
      }
    };
    setUser(userData[role]);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin-slow mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">EduSmart Scheduler</h2>
          <p className="text-gray-600">Loading AI-Powered Scheduling System...</p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <div className="flex">
                <Sidebar userRole={user.role} />
                <main className="flex-1 p-6 ml-64">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        user.role === 'admin' ? <AdminDashboard /> :
                        user.role === 'faculty' ? <FacultyDashboard user={user} /> :
                        <StudentDashboard user={user} />
                      } 
                    />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </>
          )}
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;