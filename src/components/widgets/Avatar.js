import { createMuiTheme, withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';

const theme = createMuiTheme();

export var AvatarLarge = withStyles({
  root: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
})((props) => <Avatar alt="photo" {...props} />);
