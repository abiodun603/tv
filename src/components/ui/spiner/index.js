import React from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';
import { ThreeDots } from 'react-loader-spinner';
import { withTheme } from 'styled-components';

import AppTheme from '../../../theme';

export const Spinner = withStyles({
  root: {
    color: AppTheme.palette.primary.main,
  },
})((props) => <CircularProgress color="default" {...props} />);

export const ThreeDotsLoader = (props) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color={AppTheme.palette.primary.main}
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};
