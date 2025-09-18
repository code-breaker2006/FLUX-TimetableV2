import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, UserCheck, BookOpen, Calendar, TrendingUp } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      icon: UserCheck,
      description: 'Full system access, manage users, generate timetables',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'faculty',
      title: 'Faculty Member', 
      icon: GraduationCap,
      description: 'View schedules, set preferences, manage classes',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'student',
      title: 'Student',
      icon: BookOpen,
      description: 'View personal timetable, track courses, notifications',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Users', value: '15,247' },
    { icon: Calendar, label: 'Classes Scheduled', value: '3,891' },
    { icon: TrendingUp, label: 'Efficiency Gain', value: '89%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Side - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col justify-center px-12 lg:px-24"
      >
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">EduSmart</h1>
              <p className="text-sm text-gray-600">Scheduler</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Academic Scheduling</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Transform your university's scheduling process with intelligent automation. 
            From weeks to minutes - let AI optimize your academic timetables.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex flex-col justify-center px-12 lg:px-24"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Demo Access
            </h3>
            <p className="text-gray-600 mb-8 text-center">
              Select your role to explore the platform
            </p>

            <div className="space-y-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                      <role.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-semibold text-gray-900">{role.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedRole}
              onClick={() => selectedRole && onLogin(selectedRole)}
              className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                selectedRole
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedRole ? `Enter as ${roles.find(r => r.id === selectedRole)?.title}` : 'Select a Role'}
            </motion.button>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This is a prototype demo. No real authentication required.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;