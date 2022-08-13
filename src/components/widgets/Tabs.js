import { withStyles, Tab, Tabs } from '@material-ui/core';
import AppTheme from '../../theme';

export var TabsCustom = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: AppTheme.palette.primary.main,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export var TabCustom = withStyles({
  root: {
    textTransform: 'none',
    color: AppTheme.palette.grey.grey60,
    fontWeight: AppTheme.typography.fontWeightRegular,
    fontSize: AppTheme.typography.pxToRem(15),
    marginRight: AppTheme.spacing(1),
    '&$selected': {
      color: AppTheme.palette.primary.main,
      fontWeight: AppTheme.typography.fontWeightMedium,
      fontSize: AppTheme.spacing(1) * 2,
    },
  },
  selected: {},
})((props) => <Tab disableRipple {...props} />);
