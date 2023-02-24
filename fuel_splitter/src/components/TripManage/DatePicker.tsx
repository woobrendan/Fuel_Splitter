import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import type { DateValidationError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";
import type { DateValidationError } from '@mui/x-date-pickers';

interface Props {
  getDate: (dateVal: Date | null) => void;
}

const Date_Picker: React.FC<Props> = ({ getDate }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const handleChange = async (newValue: Date | null) => {
    const element = document.querySelectorAll('[aria-invalid="true"]');
    console.log("element", element);

    if (element.length === 0) {
      console.log("we good");
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
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            } as DatePickerProps['slotProps'],
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default Date_Picker;
