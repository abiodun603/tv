import { withStyles, Tab, Tabs } from '@material-ui/core';

export const ProfileTabs = withStyles((theme) => ({
  root: {
    minWidth: 200,
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export const ProfileTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: theme.palette.grey.grey60,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    ['@media (max-width:768px)']: {
      minWidth: '40px !important',
      padding: '6px !important',
    },
    '&$labelIcon': {
      minHeight: 56,
    },
    '&$selected': {
      color: theme.palette.primary.main,
    },
    '& > span': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        marginBottom: '0 !important',
        marginRight: theme.spacing(1),
      },
      ['@media (max-width:768px)']: {
        display: 'block',
        '& .MuiSvgIcon-root': {
          margin: '0 !important',
        },
      },
    },
  },
  selected: {},
  labelIcon: {},
}))((props) => <Tab disableRipple {...props} />);
