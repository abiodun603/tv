import React from 'react';
import { withStyles, TextField, Checkbox } from '@material-ui/core';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export { default as MultiSelect } from './MultiSelect';
export { default as LanguagesSelect } from './LanguagesSelect';

export var GreenCheckbox = withStyles({
  root: {
    color: 'rgba(43,51,49,0.3)',
    '&$checked': {
      color: '#2dbd58',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export var CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '&  .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
})((props) => <TextField {...props} />);

export var CustomDatePicker = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
})((props) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker {...props} />
  </MuiPickersUtilsProvider>
));
