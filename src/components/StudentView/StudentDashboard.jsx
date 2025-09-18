import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  MapPin, 
  User,
  Bell,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

import TimetableCalendar from '../Calendar/TimetableCalendar';

const StudentDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('schedule');

  // Mock student schedule data
  const studentSchedule = [
    {
      id: '1',
      title: 'CS101 - Introduction to Programming',
      start: '2024-01-15T09:00:00',
      end: '2024-01-15T10:30:00',
      extendedProps: {
        faculty: 'Dr. Sarah Chen',
        room: 'LAB-204',
        type: 'lecture'
      },
      backgroundColor: '#3b82f6'
    },
    {
      id: '2',
      title: 'MATH201 - Calculus II',
      start: '2024-01-15T11:00:00',
      end: '2024-01-15T12:30:00',
      extendedProps: {
        faculty: 'Prof. Michael Brown',
        room: 'ROOM-301',
        type: 'lecture'
      },
      backgroundColor: '#10b981'
    },
    {
      id: '3',
      title: 'PHY101 - Physics Lab',
      start: '2024-01-15T14:00:00',
      end: '2024-01-15T17:00:00',
      extendedProps: {
        faculty: 'Dr. Emily Davis',
        room: 'PHY-LAB-1',
        type: 'lab'
      },
      backgroundColor: '#f59e0b'
    },
    {
      id: '4',
      title: 'CS101 - Introduction to Programming',
      start: '2024-01-16T09:00:00',
      end: '2024-01-16T10:30:00',
      extendedProps: {
        faculty: 'Dr. Sarah Chen',
        room: 'LAB-204',
        type: 'lecture'
      },
      backgroundColor: '#3b82f6'
    }
  ];

  const stats = [
    {
      label: 'Enrolled Courses',
      value: '6',
      icon: BookOpen,
      color: 'blue'
    },
    {
      label: 'Total Credits',
      value: '18',
      icon: Star,
      color: 'green'
    },
    {
      label: 'Classes This Week',
      value: '15',
      icon: Calendar,
      color: 'purple'
    },
    {
      label: 'Current GPA',
      value: '3.85',
      icon: CheckCircle,
      color: 'orange'
    }
  ];

  const enrolledCourses = [
    {
      code: 'CS101',
      name: 'Introduction to Programming',
      credits: 3,
      faculty: 'Dr. Sarah Chen',
      schedule: 'Mon, Wed, Fri 9:00 AM',
      grade: 'A-'
    },
    {
      code: 'MATH201',
      name: 'Calculus II',
      credits: 4,
      faculty: 'Prof. Michael Brown',
      schedule: 'Tue, Thu 11:00 AM',
      grade: 'A'
    },
    {
      code: 'PHY101',
      name: 'Physics I',
      credits: 3,
      faculty: 'Dr. Emily Davis',
      schedule: 'Mon, Wed 2:00 PM',
      grade: 'B+'
    },
    {
      code: 'ENG102',
      name: 'Technical Writing',
      credits: 2,
      faculty: 'Prof. Lisa Wilson',
      schedule: 'Fri 1:00 PM',
      grade: 'A'
    },
    {
      code: 'CS201',
      name: 'Data Structures',
      credits: 3,
      faculty: 'Dr. Robert Kim',
      schedule: 'Tue, Thu 2:00 PM',
      grade: 'A-'
    },
    {
      code: 'MATH301',
      name: 'Linear Algebra',
      credits: 3,
      faculty: 'Dr. Jennifer Lee',
      schedule: 'Mon, Wed, Fri 11:00 AM',
      grade: 'B+'
    }
  ];

  const upcomingClasses = [
    {
      course: 'CS101 - Introduction to Programming',
      time: 'Today, 2:00 PM',
      room: 'LAB-204',
      faculty: 'Dr. Sarah Chen',
      type: 'lecture'
    },
    {
      course: 'MATH201 - Calculus II',
      time: 'Tomorrow, 9:00 AM', 
      room: 'ROOM-301',
      faculty: 'Prof. Michael Brown',
      type: 'lecture'
    },
    {
      course: 'PHY101 - Physics Lab',
      time: 'Tomorrow, 2:00 PM',
      room: 'PHY-LAB-1',
      faculty: 'Dr. Emily Davis',
      type: 'lab'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'CS101 class moved to LAB-205 for today',
      time: '30 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      message: 'Assignment deadline for MATH201 is tomorrow',
      time: '2 hours ago', 
      read: false
    },
    {
      id: 3,
      type: 'success',
      message: 'Your grade for PHY101 midterm has been posted',
      time: '1 day ago',
      read: true
    }
  ];

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

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-50';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-50';
    if (grade.includes('C')) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user.name} • {user.program} • {user.batch}</p>
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
              id="courses" 
              label="My Courses" 
              active={activeTab === 'courses'}
              onClick={() => setActiveTab('courses')}
            />
            <TabButton 
              id="upcoming" 
              label="Upcoming" 
              active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            />
            <TabButton 
              id="notifications" 
              label="Notifications" 
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'schedule' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    Computer Science
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    Mathematics
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                    Physics
                  </div>
                </div>
              </div>
              <TimetableCalendar events={studentSchedule} />
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{course.code}</h4>
                        <p className="text-sm text-gray-600">{course.name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {course.faculty}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {course.schedule}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        {course.credits} credits
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
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
                      <p className="text-sm text-gray-600 mt-1">
                        {classItem.time} • {classItem.faculty}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {classItem.room}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                        classItem.type === 'lecture' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {classItem.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start space-x-3 p-4 rounded-lg border ${
                      notification.read 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;