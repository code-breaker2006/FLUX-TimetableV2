import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Upload, 
  Play, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

import { useAppContext } from '../../hooks/useAppContext';
import TimetableGenerator from '../TimetableGenerator/TimetableGenerator';
import DataUpload from '../DataUpload/DataUpload';
import TimetableCalendar from '../Calendar/TimetableCalendar';

const AdminDashboard = () => {
  const { 
    students, 
    faculty, 
    courses, 
    timetables, 
    isGenerating, 
    generateTimetable 
  } = useAppContext();

  const [activeTab, setActiveTab] = useState('overview');
  const [showGenerator, setShowGenerator] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // Mock statistics
  const stats = [
    {
      label: 'Total Students',
      value: '3,891',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Active Courses',
      value: '247',
      change: '+8%', 
      icon: BookOpen,
      color: 'green'
    },
    {
      label: 'Faculty Members',
      value: '156',
      change: '+5%',
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Schedule Efficiency',
      value: '96%',
      change: '+3%',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'success',
      message: 'Timetable generated successfully for Fall 2025',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'info', 
      message: 'New batch of 45 students enrolled in CS program',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Room LAB-301 capacity exceeded for CS201',
      time: '3 hours ago'
    },
    {
      id: 4,
      type: 'success',
      message: 'Faculty preferences updated by Dr. Sarah Chen',
      time: '5 hours ago'
    }
  ];

  const handleGenerateTimetable = async () => {
    setShowGenerator(true);
    try {
      toast.info('🚀 Starting AI timetable generation...');
      await generateTimetable();
      toast.success('✅ Timetable generated successfully!');
    } catch (error) {
      toast.error('❌ Failed to generate timetable');
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const StatCard = ({ stat }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200', 
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
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
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
          <div className={`p-3 rounded-xl border ${colorClasses[stat.color]}`}>
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
          <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your university's academic scheduling system</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(true)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Data
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateTimetable}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Timetable'}
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

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <TabButton 
              id="overview" 
              label="Overview" 
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <TabButton 
              id="schedule" 
              label="Current Schedule" 
              active={activeTab === 'schedule'}
              onClick={() => setActiveTab('schedule')}
            />
            <TabButton 
              id="analytics" 
              label="Analytics" 
              active={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="font-medium text-blue-900">View Reports</p>
                    <p className="text-xs text-blue-600 mt-1">System analytics</p>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Download className="w-5 h-5 text-green-600 mb-2" />
                    <p className="font-medium text-green-900">Export Data</p>
                    <p className="text-xs text-green-600 mt-1">Download schedules</p>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Users className="w-5 h-5 text-purple-600 mb-2" />
                    <p className="font-medium text-purple-900">Manage Users</p>
                    <p className="text-xs text-purple-600 mt-1">Add/edit faculty</p>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 text-left bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-orange-600 mb-2" />
                    <p className="font-medium text-orange-900">Course Catalog</p>
                    <p className="text-xs text-orange-600 mt-1">Manage courses</p>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Current Academic Schedule</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Full Schedule →
                </button>
              </div>
              <TimetableCalendar events={timetables?.current?.admin || []} />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Schedule Optimization</h4>
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <p className="text-sm text-gray-600">Efficiency improvement over manual scheduling</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Conflict Resolution</h4>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <p className="text-sm text-gray-600">Scheduling conflicts detected</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showGenerator && (
        <TimetableGenerator 
          isOpen={showGenerator}
          onClose={() => setShowGenerator(false)}
        />
      )}

      {showUpload && (
        <DataUpload
          isOpen={showUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;