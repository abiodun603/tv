import { withStyles, Tab, Tabs } from '@material-ui/core';

export var TabsCustom = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#2dbd58',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export var TabCustom = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#959595',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&$selected': {
      color: '#2dbd58',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
