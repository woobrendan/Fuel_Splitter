import * as React from 'react';
import {Stack, TextField} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function DatePicker(props) {

  const [date, setDate] = React.useState(props.today);

  const handleChange = (newValue) => {
    const newDate = newValue.toISOString().split('T')[0]
    setDate(newDate)
    props.getValue('date', newDate)
  };

  return (
    <div id="date-picker">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date"
            inputFormat="yyyy-MM-dd"
            name='date'
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}