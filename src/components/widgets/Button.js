import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import React from 'react';
import AppTheme from '../../theme';

export const ButtonContainer = withStyles((theme) => ({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    textTransform: 'none',
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#2dbd58',
    '&:hover': {
      backgroundColor: '#249947',
    },
  },
}))((props) => <Button {...props} />);

export const ButtonText = withStyles({
  root: {
    textTransform: 'none',
    color: AppTheme.palette.grey.grey60,
    fontWeight: 600,
  },
})((props) => <Button size="small" variant="text" {...props} />);

export const ButtonTextGreen = withStyles({
  root: {
    color: '#2dbd58',
    fontWeight: 'bold',
  },
})((props) => <Button size="small" variant="text" {...props} />);
