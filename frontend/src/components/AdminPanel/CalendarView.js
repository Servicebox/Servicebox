import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = ({ bookings }) => {
  const events = bookings.map(booking => ({
    title: `${booking.userName} - ${booking.serviceName}`,
    start: new Date(`${booking.bookingDate}T${booking.bookingTime}:00`),
    end: new Date(`${booking.bookingDate}T${parseInt(booking.bookingTime) + 1}:00`),
    allDay: false,
    resource: booking
  }));

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={event => console.log(event.resource)}
      />
    </div>
  );
};