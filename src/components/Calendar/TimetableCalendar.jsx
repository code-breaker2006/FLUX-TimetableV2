import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MapPin, User, Users, Clock } from 'lucide-react';

const TimetableCalendar = ({ events = [] }) => {
  const calendarRef = useRef(null);

  // Custom event render function
  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const { extendedProps } = event;

    return (
      <div className="p-1 h-full">
        <div className="font-medium text-xs leading-tight mb-1">
          {event.title}
        </div>
        {extendedProps && (
          <div className="text-xs opacity-90 space-y-0.5">
            {extendedProps.room && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{extendedProps.room}</span>
              </div>
            )}
            {extendedProps.faculty && (
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{extendedProps.faculty}</span>
              </div>
            )}
            {extendedProps.students && (
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>{extendedProps.students}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Handle event click
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const props = event.extendedProps;
    
    // Create a simple modal-like alert with event details
    const details = [
      `Course: ${event.title}`,
      `Time: ${event.start.toLocaleTimeString()} - ${event.end?.toLocaleTimeString()}`,
      props.room ? `Room: ${props.room}` : '',
      props.faculty ? `Faculty: ${props.faculty}` : '',
      props.students ? `Students: ${props.students}` : '',
      props.type ? `Type: ${props.type}` : ''
    ].filter(Boolean).join('\n');

    alert(details);
  };

  // Handle date click for demo purposes
  const handleDateClick = (selectInfo) => {
    console.log('Date clicked:', selectInfo.dateStr);
    // In a real app, this could open an "add event" modal
  };

  // Default events if none provided
  const defaultEvents = events.length > 0 ? events : [
    {
      id: 'demo1',
      title: 'CS101 - Introduction to Programming',
      start: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T09:00:00',
      end: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T10:30:00',
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      extendedProps: {
        faculty: 'Dr. Sarah Chen',
        room: 'LAB-204',
        students: 45,
        type: 'lecture'
      }
    },
    {
      id: 'demo2',
      title: 'MATH201 - Calculus II', 
      start: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T11:00:00',
      end: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T12:30:00',
      backgroundColor: '#10b981',
      borderColor: '#059669',
      extendedProps: {
        faculty: 'Prof. Michael Brown',
        room: 'ROOM-301',
        students: 38,
        type: 'lecture'
      }
    },
    {
      id: 'demo3',
      title: 'PHY101 - Physics Lab',
      start: new Date(Date.now() + 172800000).toISOString().split('T')[0] + 'T14:00:00',
      end: new Date(Date.now() + 172800000).toISOString().split('T')[0] + 'T17:00:00',
      backgroundColor: '#f59e0b',
      borderColor: '#d97706',
      extendedProps: {
        faculty: 'Dr. Emily Davis',
        room: 'PHY-LAB-1',
        students: 30,
        type: 'lab'
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={defaultEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={false}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        height="auto"
        eventDisplay="block"
        eventTextColor="white"
        eventBorderRadius="6px"
        eventBackgroundColor="#3b82f6"
        eventBorderColor="#2563eb"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
          startTime: '08:00',
          endTime: '18:00'
        }}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        nowIndicator={true}
        scrollTime="08:00:00"
        contentHeight={600}
        eventMinHeight={70}
        dayHeaderFormat={{
          weekday: 'short',
          month: 'numeric',
          day: 'numeric'
        }}
        titleFormat={{
          month: 'long',
          year: 'numeric'
        }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week', 
          day: 'Day'
        }}
        firstDay={1} // Monday
        weekNumbers={false}
        editable={true}
        droppable={true}
        eventResizableFromStart={false}
        eventDurationEditable={true}
        eventStartEditable={true}
        snapDuration="00:30:00"
        slotDuration="00:30:00"
        slotEventOverlap={false}
        eventOverlap={false}
        selectConstraint="businessHours"
        eventConstraint="businessHours"
      />
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-600">Computer Science</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-gray-600">Mathematics</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-gray-600">Physics</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
          <span className="text-gray-600">Other Courses</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-center text-xs text-gray-500">
        Click on events to view details • Drag to move • Resize by dragging edges
      </div>
    </div>
  );
};

export default TimetableCalendar;