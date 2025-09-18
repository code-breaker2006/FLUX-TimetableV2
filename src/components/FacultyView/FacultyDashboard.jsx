import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Clock, 
  Settings, 
  Bell,
  CheckCircle,
  PlusCircle,
  Edit3
} from 'lucide-react';

import TimetableCalendar from '../Calendar/TimetableCalendar';

const FacultyDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [preferences, setPreferences] = useState({
    preferredTimes: ['morning'],
    maxConsecutive: 2,
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    blackoutTimes: []
  });

  // Mock faculty schedule data
  const facultySchedule = [
    {
      id: '1',
      title: 'CS101 - Introduction to Programming',
      start: '2024-01-15T09:00:00',
      end: '2024-01-15T10:30:00',
      extendedProps: {
        room: 'LAB-204',
        students: 45,
        type: 'lecture'
      },
      backgroundColor: '#3b82f6'
    },
    {
      id: '2', 
      title: 'CS201 - Data Structures',
      start: '2024-01-15T11:00:00',
      end: '2024-01-15T12:30:00',
      extendedProps: {
        room: 'LAB-205',
        students: 38,
        type: 'lab'
      },
      backgroundColor: '#10b981'
    },
    {
      id: '3',
      title: 'CS101 - Introduction to Programming',
      start: '2024-01-16T09:00:00', 
      end: '2024-01-16T10:30:00',
      extendedProps: {
        room: 'LAB-204',
        students: 42,
        type: 'lecture'
      },
      backgroundColor: '#3b82f6'
    }
  ];

  const stats = [
    {
      label: 'Classes This Week',
      value: '12',
      icon: Calendar,
      color: 'blue'
    },
    {
      label: 'Total Students',
      value: '286',
      icon: Users,
      color: 'green'
    },
    {
      label: 'Active Courses',
      value: '4',
      icon: BookOpen,
      color: 'purple'
    },
    {
      label: 'Teaching Hours',
      value: '18h',
      icon: Clock,
      color: 'orange'
    }
  ];

  const upcomingClasses = [
    {
      course: 'CS101 - Intro to Programming',
      time: 'Today, 2:00 PM',
      room: 'LAB-204',
      students: 45
    },
    {
      course: 'CS201 - Data Structures',
      time: 'Tomorrow, 9:00 AM',
      room: 'LAB-205', 
      students: 38
    },
    {
      course: 'CS301 - Algorithms',
      time: 'Tomorrow, 11:00 AM',
      room: 'HALL-A',
      students: 52
    }
  ];

  const handlePreferencesSubmit = () => {
    toast.success('✅ Teaching preferences updated successfully!');
  };

  const handleRequestClass = () => {
    toast.info('📝 Class request submitted for admin approval');
  };

  const StatCard = ({ stat }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[stat.color]}`}>
            <stat.icon className="w-6 h-6" />
          </div>
        </div>
      </motion.div>
    );
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRequestClass}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Request Class
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard stat={stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <TabButton 
              id="schedule" 
              label="My Schedule" 
              active={activeTab === 'schedule'}
              onClick={() => setActiveTab('schedule')}
            />
            <TabButton 
              id="classes" 
              label="Upcoming Classes" 
              active={activeTab === 'classes'}
              onClick={() => setActiveTab('classes')}
            />
            <TabButton 
              id="preferences" 
              label="Preferences" 
              active={activeTab === 'preferences'}
              onClick={() => setActiveTab('preferences')}
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'schedule' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    Lectures
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    Labs
                  </div>
                </div>
              </div>
              <TimetableCalendar events={facultySchedule} />
            </div>
          )}

          {activeTab === 'classes' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Classes</h3>
              <div className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{classItem.course}</h4>
                      <p className="text-sm text-gray-600">{classItem.time} • {classItem.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{classItem.students} students</p>
                      <div className="flex items-center mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">Ready</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Preferences</h3>
              
              <div className="space-y-6">
                {/* Preferred Times */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Teaching Times
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['morning', 'afternoon', 'evening'].map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setPreferences(prev => ({
                            ...prev,
                            preferredTimes: prev.preferredTimes.includes(time)
                              ? prev.preferredTimes.filter(t => t !== time)
                              : [...prev.preferredTimes, time]
                          }));
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          preferences.preferredTimes.includes(time)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Consecutive Classes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Maximum Consecutive Classes
                  </label>
                  <select
                    value={preferences.maxConsecutive}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      maxConsecutive: parseInt(e.target.value)
                    }))}
                    className="input-field max-w-xs"
                  >
                    <option value={1}>1 class</option>
                    <option value={2}>2 classes</option>
                    <option value={3}>3 classes</option>
                    <option value={4}>4 classes</option>
                  </select>
                </div>

                {/* Preferred Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Teaching Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                      <button
                        key={day}
                        onClick={() => {
                          setPreferences(prev => ({
                            ...prev,
                            preferredDays: prev.preferredDays.includes(day)
                              ? prev.preferredDays.filter(d => d !== day)
                              : [...prev.preferredDays, day]
                          }));
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          preferences.preferredDays.includes(day)
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePreferencesSubmit}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Update Preferences
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;