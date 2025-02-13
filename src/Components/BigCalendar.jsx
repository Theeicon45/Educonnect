import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import timetableData from '../Utils/Timetabble';
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from 'react';
const localizer = momentLocalizer(moment)

const BigCalendar = () => {
const [view ,setView]=useState(Views.WORK_WEEK)

const handleOnChangeView=(selectedView) =>{
    setView(selectedView)
}

  return (
    <Calendar
      localizer={localizer}
      events={timetableData}
      startAccessor="start"
      endAccessor="end"
      views={['work_week','day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleOnChangeView}
      min={new Date(2025,1,1,8,0,0)}
      max={new Date(2025,1,1,18,0,0)}
    />
 
)
};
export default BigCalendar;