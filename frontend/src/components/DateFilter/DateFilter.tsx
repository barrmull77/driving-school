import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { InputAdornment, IconButton } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReactComponent as DateIcon } from '@/assets/icons/date-icon.svg';
import { useDriveStore } from '@/store/store';

const DateFilter: React.FC = () => {
  const setFilterDate = useDriveStore((state) => state.setFilterDate);

  const handleDateChange = (date: Date | null) => {
    setFilterDate(date ? date.toISOString() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          label="Filter by date"
          onChange={(newValue) => {
            handleDateChange(newValue);
          }}
          value={null}
          defaultValue={null}
          slots={{
            openPickerIcon: DateIcon
          }}
          slotProps={{
            inputAdornment: {
              position: 'start',
            },
            textField: {
              InputLabelProps: {
                shrink: true
              }
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateFilter;
