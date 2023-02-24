import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { DateValidationError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";
// import type { DateValidationError } from "@mui/x-date-pickers";

interface Props {
  getDate: (dateVal: Date | null) => void;
  getErrorState: (val: boolean) => void;
}

const Date_Picker: React.FC<Props> = ({ getDate, getErrorState }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<DateValidationError | null>(null);
  const [errorDate, setErrorDate] = useState<boolean>(false);

  const handleChange = async (newValue: Date | null) => {
    if (!errorDate) {
      setDate(newValue);
      getDate(newValue);
    }
  };

  return (
    <div id="date-picker" data-testid="date_picker">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <DatePicker
            label="Date"
            inputFormat="MM-dd-yyyy"
            onError={(reason, value) => {
              if (reason) {
                setError(reason);
                setErrorDate(true);
                getErrorState(true);
              } else {
                setError(null);
                setErrorDate(false);
                getErrorState(false);
              }
            }}
            value={date}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errorDate}
                helperText={error ?? error}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default Date_Picker;
