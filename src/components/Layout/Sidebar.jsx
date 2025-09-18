import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BookOpen, 
  Settings, 
  FileText, 
  Upload,
  Clock,
  CheckSquare,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const getMenuItems = (role) => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', active: true },
      { icon: Calendar, label: 'Schedule View' },
    ];

    switch(role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: Upload, label: 'Data Management' },
          { icon: Users, label: 'Users & Faculty' },
          { icon: BookOpen, label: 'Courses & Rooms' },
          { icon: BarChart3, label: 'Analytics' },
          { icon: CheckSquare, label: 'Approvals' },
          { icon: Settings, label: 'System Settings' }
        ];
      
      case 'faculty':
        return [
          ...commonItems,
          { icon: Clock, label: 'My Classes' },
          { icon: FileText, label: 'Preferences' },
          { icon: CheckSquare, label: 'Requests' },
          { icon: Users, label: 'My Students' }
        ];
        
      case 'student':
        return [
          ...commonItems,
          { icon: BookOpen, label: 'My Courses' },
          { icon: FileText, label: 'Notifications' },
          { icon: CheckSquare, label: 'Requests' }
        ];
        
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto"
    >
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              href="#"
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                item.active 
                  ? 'text-blue-500' 
                  : 'text-gray-400 group-hover:text-gray-500'
              }`} />
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Stats</h3>
          <div className="space-y-2">
            {userRole === 'admin' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Classes</span>
                  <span className="font-semibold text-blue-600">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-semibold text-blue-600">3,891</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Efficiency</span>
                  <span className="font-semibold text-green-600">96%</span>
                </div>
              </>
            )}
            
            {userRole === 'faculty' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">My Classes</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold text-blue-600">286</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold text-green-600">18h</span>
                </div>
              </>
            )}
            
            {userRole === 'student' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrolled</span>
                  <span className="font-semibold text-blue-600">6 courses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-semibold text-blue-600">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GPA</span>
                  <span className="font-semibold text-green-600">3.85</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <span className="font-semibold">Demo Mode:</span> This is a prototype showcasing AI-powered scheduling capabilities.
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;