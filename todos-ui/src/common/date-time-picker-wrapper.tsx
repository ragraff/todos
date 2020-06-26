import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';

interface DateTimePickerProps {
  label: string;
  selectedDate: Date;
  handleDateTimeChange: (date: Date | null) => void;
}

export const DateTimePickerWrapper: FC<DateTimePickerProps> = ({
  label,
  selectedDate,
  handleDateTimeChange,
}: DateTimePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <DateTimePicker
          margin="normal"
          label={label}
          value={selectedDate}
          onChange={handleDateTimeChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
