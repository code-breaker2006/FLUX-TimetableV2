import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Users,
  BookOpen,
  Calendar,
  MapPin
} from 'lucide-react';

import { useAppContext } from '../../hooks/useAppContext';

const DataUpload = ({ isOpen, onClose }) => {
  const { setStudents, setFaculty, setCourses, setUploadedData } = useAppContext();
  const [activeTab, setActiveTab] = useState('students');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [processingData, setProcessingData] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Mock CSV data for different entity types
  const mockData = {
    students: [
      { id: 'STU001', name: 'Alex Chen', email: 'alex.chen@university.edu', program: 'Computer Science', batch: 'CS2024' },
      { id: 'STU002', name: 'Sarah Johnson', email: 'sarah.j@university.edu', program: 'Computer Science', batch: 'CS2024' },
      { id: 'STU003', name: 'Michael Brown', email: 'michael.b@university.edu', program: 'Mathematics', batch: 'MATH2024' },
      { id: 'STU004', name: 'Emily Davis', email: 'emily.d@university.edu', program: 'Physics', batch: 'PHY2024' },
      { id: 'STU005', name: 'David Wilson', email: 'david.w@university.edu', program: 'Computer Science', batch: 'CS2023' }
    ],
    faculty: [
      { id: 'FAC001', name: 'Dr. Sarah Chen', email: 'sarah.chen@university.edu', department: 'Computer Science' },
      { id: 'FAC002', name: 'Prof. Michael Brown', email: 'michael.brown@university.edu', department: 'Mathematics' },
      { id: 'FAC003', name: 'Dr. Emily Davis', email: 'emily.davis@university.edu', department: 'Physics' },
      { id: 'FAC004', name: 'Prof. Lisa Wilson', email: 'lisa.wilson@university.edu', department: 'English' }
    ],
    courses: [
      { id: 'CS101', code: 'CS101', title: 'Introduction to Programming', credits: 3, department: 'Computer Science' },
      { id: 'CS201', code: 'CS201', title: 'Data Structures', credits: 3, department: 'Computer Science' },
      { id: 'MATH201', code: 'MATH201', title: 'Calculus II', credits: 4, department: 'Mathematics' },
      { id: 'PHY101', code: 'PHY101', title: 'Physics I', credits: 3, department: 'Physics' },
      { id: 'ENG102', code: 'ENG102', title: 'Technical Writing', credits: 2, department: 'English' }
    ],
    classrooms: [
      { id: 'ROOM001', code: 'LAB-204', capacity: 50, type: 'laboratory', equipment: 'Computers, Projector' },
      { id: 'ROOM002', code: 'HALL-A', capacity: 120, type: 'lecture_hall', equipment: 'Projector, Audio System' },
      { id: 'ROOM003', code: 'ROOM-301', capacity: 40, type: 'classroom', equipment: 'Whiteboard, Projector' },
      { id: 'ROOM004', code: 'PHY-LAB-1', capacity: 30, type: 'laboratory', equipment: 'Lab Equipment, Safety Gear' }
    ]
  };

  const dataTypes = [
    { 
      id: 'students', 
      label: 'Students', 
      icon: Users, 
      description: 'Student enrollment and program information',
      color: 'blue',
      sampleHeaders: 'ID, Name, Email, Program, Batch'
    },
    { 
      id: 'faculty', 
      label: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and department assignments',
      color: 'green',
      sampleHeaders: 'ID, Name, Email, Department'
    },
    { 
      id: 'courses', 
      label: 'Courses', 
      icon: BookOpen, 
      description: 'Course catalog and academic offerings',
      color: 'purple',
      sampleHeaders: 'Code, Title, Credits, Department'
    },
    { 
      id: 'classrooms', 
      label: 'Classrooms', 
      icon: MapPin, 
      description: 'Classroom capacity and facilities',
      color: 'orange',
      sampleHeaders: 'Code, Capacity, Type, Equipment'
    }
  ];

  const handleFileUpload = useCallback(async (event, dataType) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    setProcessingData(true);
    setUploadStatus(null);

    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Use mock data instead of parsing actual file
      const data = mockData[dataType] || [];
      
      // Update the respective data in context
      switch(dataType) {
        case 'students':
          setStudents(data);
          break;
        case 'faculty':
          setFaculty(data);
          break;
        case 'courses':
          setCourses(data);
          break;
        default:
          break;
      }

      setUploadedFiles(prev => ({
        ...prev,
        [dataType]: { name: file.name, count: data.length, data }
      }));

      setUploadStatus({
        type: 'success',
        message: `Successfully processed ${data.length} ${dataType} records`,
        data: data.slice(0, 5) // Show first 5 records as preview
      });

      toast.success(`✅ ${file.name} uploaded successfully!`);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to process file. Please check the format and try again.'
      });
      toast.error('❌ Upload failed');
    } finally {
      setProcessingData(false);
    }
  }, [setStudents, setFaculty, setCourses]);

  const downloadTemplate = (dataType) => {
    const templates = {
      students: 'ID,Name,Email,Program,Batch\nSTU001,John Doe,john.doe@university.edu,Computer Science,CS2024',
      faculty: 'ID,Name,Email,Department\nFAC001,Dr. Jane Smith,jane.smith@university.edu,Computer Science',
      courses: 'Code,Title,Credits,Department\nCS101,Introduction to Programming,3,Computer Science',
      classrooms: 'Code,Capacity,Type,Equipment\nLAB-204,50,laboratory,"Computers, Projector"'
    };

    const content = templates[dataType] || '';
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataType}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.info(`📥 ${dataType} template downloaded`);
  };

  const TabButton = ({ dataType, active, onClick }) => {
    const type = dataTypes.find(t => t.id === dataType);
    const Icon = type.icon;
    const colorClasses = {
      blue: active ? 'bg-blue-100 text-blue-700 border-blue-300' : 'hover:bg-blue-50',
      green: active ? 'bg-green-100 text-green-700 border-green-300' : 'hover:bg-green-50',
      purple: active ? 'bg-purple-100 text-purple-700 border-purple-300' : 'hover:bg-purple-50',
      orange: active ? 'bg-orange-100 text-orange-700 border-orange-300' : 'hover:bg-orange-50'
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center px-4 py-3 border rounded-lg transition-all duration-200 ${
          active 
            ? `${colorClasses[type.color]} border-2`
            : `border-gray-200 text-gray-700 ${colorClasses[type.color]}`
        }`}
      >
        <Icon className="w-5 h-5 mr-2" />
        <div className="text-left">
          <p className="font-medium">{type.label}</p>
          {uploadedFiles[dataType] && (
            <p className="text-xs opacity-75">{uploadedFiles[dataType].count} records</p>
          )}
        </div>
      </motion.button>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Data Management</h2>
              <p className="text-gray-600 mt-1">Upload and manage university data</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Data Type Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {dataTypes.map(type => (
                <TabButton
                  key={type.id}
                  dataType={type.id}
                  active={activeTab === type.id}
                  onClick={() => setActiveTab(type.id)}
                />
              ))}
            </div>

            {/* Active Data Type Content */}
            <div className="space-y-6">
              {dataTypes.filter(type => type.id === activeTab).map(type => (
                <div key={type.id} className="border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <type.icon className="w-5 h-5 mr-2" />
                        {type.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                    <button
                      onClick={() => downloadTemplate(type.id)}
                      className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Template
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="relative">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, type.id)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={processingData}
                    />
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      processingData 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}>
                      {processingData ? (
                        <div className="space-y-3">
                          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                          <p className="text-blue-600 font-medium">Processing {type.label}...</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-900">Upload {type.label} Data</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Drag and drop your CSV/Excel file or click to browse
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Expected format: {type.sampleHeaders}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Status */}
                  {uploadStatus && activeTab === type.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg ${
                        uploadStatus.type === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {uploadStatus.type === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        )}
                        <p className={`font-medium ${
                          uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {uploadStatus.message}
                        </p>
                      </div>

                      {/* Data Preview */}
                      {uploadStatus.data && uploadStatus.data.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-green-700 mb-2">Preview (first 5 records):</p>
                          <div className="bg-white rounded border overflow-hidden">
                            <div className="max-h-40 overflow-y-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {Object.keys(uploadStatus.data[0] || {}).map(key => (
                                      <th key={key} className="px-3 py-2 text-left font-medium text-gray-700 border-b">
                                        {key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {uploadStatus.data.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                      {Object.values(row).map((value, cellIndex) => (
                                        <td key={cellIndex} className="px-3 py-2 text-gray-600">
                                          {String(value)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            {Object.keys(uploadedFiles).length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Upload Summary</h4>
                <div className="space-y-1">
                  {Object.entries(uploadedFiles).map(([type, file]) => (
                    <p key={type} className="text-sm text-blue-700">
                      {type}: {file.count} records from {file.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DataUpload;