import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles, TextField, Checkbox } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export { default as MultiSelect } from './MultiSelect';
export { default as LanguagesSelect } from './LanguagesSelect';
import AppTheme from '../../../theme';

export var GreenCheckbox = withStyles({
  root: {
    color: AppTheme.palette.grey.grey30,
    '&$checked': {
      color: AppTheme.palette.primary.main,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export var CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: AppTheme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: AppTheme.palette.primary.main,
    },
    '&  .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: AppTheme.palette.secondary.main,
    },
  },
})((props) => <TextField {...props} />);

export var CustomDatePicker = withStyles({
  root: {
    '& label.Mui-focused': {
      color: AppTheme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: AppTheme.palette.primary.main,
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: AppTheme.palette.secondary.main,
    },
  },
})((props) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker {...props} />
  </MuiPickersUtilsProvider>
));
