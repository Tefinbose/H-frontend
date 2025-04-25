import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import CircleIcon from '@mui/icons-material/Circle';
import { getAllLogApi } from '../services/allApi';

const date1 = new Date();
const initialValue = dayjs(date1);

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !outsideCurrentMonth &&
    highlightedDays.some(highlighted =>
      highlighted.isSame(day, 'day')
    );

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CircleIcon style={{ fontSize: "10px", color: "darkviolet" }} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest({ habit }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [loggedDates, setLoggedDates] = React.useState([])
  const getAllLog = async () => {
    const result = await getAllLogApi()
    if (result.status >= 200 && result.status < 300) {
      let datearray = []
      for (let x of result.data) {
        if(x.habitid == habit.id){
          datearray.push(dayjs(x.date))
        }
        
      }
      setLoggedDates(datearray)
      setHighlightedDays(datearray); // store full dayjs objects
      setIsLoading(false);
    }
  }


  React.useEffect(() => {
    getAllLog();
  }, [loggedDates]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disableFuture
        defaultValue={initialValue}
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}