import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles, TextField, Checkbox } from '@material-ui/core';
import dynamic from 'next/dynamic';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import AppTheme from '../../../theme';
export { default as MultiSelect } from './MultiSelect';
export { default as LanguagesSelect } from './LanguagesSelect';

const MuiPhoneNumber = dynamic(import('material-ui-phone-number'), {
  ssr: false,
});

export const GreenCheckbox = withStyles({
  root: {
    color: AppTheme.palette.grey.grey30,
    '&$checked': {
      color: AppTheme.palette.primary.main,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const CustomTextField = withStyles({
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

export const CustomDatePicker = withStyles({
  root: {
    width: '100%',
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

export const CustomPhoneField = (props) => (
  <MuiPhoneNumber {...props} className="isabitv-phone" />
);
