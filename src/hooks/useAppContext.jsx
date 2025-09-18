import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [timetables, setTimetables] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  // Load mock data on component mount
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = async () => {
    try {
      // In a real app, these would be API calls
      const mockStudents = await import('../data/students.json');
      const mockFaculty = await import('../data/faculty.json');
      const mockCourses = await import('../data/courses.json');
      const mockTimetables = await import('../data/timetables.json');

      setStudents(mockStudents.default || []);
      setFaculty(mockFaculty.default || []);
      setCourses(mockCourses.default || []);
      setTimetables(mockTimetables.default || {});
    } catch (error) {
      console.log('Loading fallback mock data...');
      // Fallback data if JSON files don't exist yet
      loadFallbackData();
    }
  };

  const loadFallbackData = () => {
    setStudents([
      {
        id: "STU001",
        name: "Alex Chen",
        email: "alex.chen@university.edu",
        program: "Computer Science",
        batch: "CS2024"
      },
      {
        id: "STU002", 
        name: "Sarah Johnson",
        email: "sarah.johnson@university.edu",
        program: "Computer Science",
        batch: "CS2024"
      }
    ]);

    setFaculty([
      {
        id: "FAC001",
        name: "Dr. Sarah Chen",
        email: "sarah.chen@university.edu",
        department: "Computer Science",
        preferences: {
          preferred_times: ["morning"],
          max_consecutive: 2
        }
      }
    ]);

    setCourses([
      {
        id: "CS101",
        code: "CS101",
        title: "Introduction to Programming",
        credits: 3,
        department: "Computer Science"
      }
    ]);

    setTimetables({
      current: {
        admin: [],
        faculty: {},
        students: {}
      },
      generated: {
        admin: [],
        faculty: {},
        students: {}
      }
    });
  };

  const generateTimetable = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock generated timetable
    const newTimetable = {
      admin: [
        {
          id: 'evt1',
          title: 'CS101 - Section A',
          start: '2024-01-15T09:00:00',
          end: '2024-01-15T10:30:00',
          extendedProps: {
            faculty: 'Dr. Sarah Chen',
            room: 'LAB-204',
            students: 45
          },
          backgroundColor: '#3b82f6'
        },
        {
          id: 'evt2', 
          title: 'CS101 - Section B',
          start: '2024-01-15T11:00:00',
          end: '2024-01-15T12:30:00',
          extendedProps: {
            faculty: 'Dr. Sarah Chen',
            room: 'LAB-205',
            students: 42
          },
          backgroundColor: '#3b82f6'
        }
      ]
    };

    setTimetables(prev => ({
      ...prev,
      current: newTimetable,
      generated: newTimetable
    }));

    setIsGenerating(false);
    return newTimetable;
  };

  const value = {
    // Data
    students,
    faculty, 
    courses,
    timetables,
    uploadedData,
    
    // States
    isGenerating,
    
    // Actions
    setStudents,
    setFaculty,
    setCourses,
    setTimetables,
    setUploadedData,
    generateTimetable,
    loadMockData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};