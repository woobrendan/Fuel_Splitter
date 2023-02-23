import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface Props {
  getDate: (dateVal: Date | null) => void;
}

const DatePicker: React.FC<Props> = ({ getDate }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
    getDate(newValue);
  };

  return (
    <div id="date-picker" data-testid="date_picker">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM-dd-yyyy"
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
