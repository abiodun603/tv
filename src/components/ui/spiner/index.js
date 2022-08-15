import React from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

import AppTheme from '../../../theme';

export var Spinner = withStyles({
  root: {
    color: AppTheme.palette.primary.main,
  },
})((props) => <CircularProgress color="default" {...props} />);
