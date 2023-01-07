import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const DatePicker: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  return (
    <div id="date-picker">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date"
            inputFormat="yyyy-MM-dd"
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
