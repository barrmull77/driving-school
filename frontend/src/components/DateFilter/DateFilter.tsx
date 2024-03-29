import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReactComponent as DateIcon } from '@/assets/icons/date-icon.svg';
import { useDriveStore } from '@/store/store';

const StyledDatePicker = styled(DatePicker )(({ theme }) => ({
  height: '48px',
  '& .MuiStack-root': {
    paddingTop: '0px',
  }, 
  '& .MuiInputBase-root': {
    height: '48px',
    width: '256px',
  },
  [theme.breakpoints.down('lg')]: {
    '& .MuiInputBase-root': {
      width: '200px',
    }
  }
}));

const DateFilter: React.FC = () => {
  const setFilterDate = useDriveStore((state) => state.setFilterDate);

  const handleDateChange = (date: Date | null) => {
    setFilterDate(date ? date.toISOString() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ marginTop: '-8px'}}>
        <StyledDatePicker 
          label="Filter by date"
          onChange={handleDateChange}
          slots={{
            openPickerIcon: DateIcon
          }}
          slotProps={{
            inputAdornment: {
              position: 'start',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateFilter;
