import {
  Drawer,
  useMediaQuery,
  makeStyles,
  List,
  IconButton,
  Divider,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  MOBLE_MENU,
  MOBLE_SUB_MENU,
  Box,
  NavBarLink,
  UserProfileIcon,
} from './navbar-utils';
import { ButtonText } from '../../widgets/Button';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    width: 250,
  },
  divider: {
    backgroundColor: '#2B3331',
  },
}));

export const SideBar = ({ open, onClose, profile, logout }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:720px)');

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        className={classes.sideBar}
        role="responsivness"
        onClick={onClose}
        onKeyDown={onClose}
      >
        {isMobile && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            m={2}
          >
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="open drawer"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <UserProfileIcon photo={profile.photo} />
          </Box>
        )}
        <List>
          {MOBLE_MENU.map((menu) => (
            <NavBarLink menu={menu} isDesktop={false} key={menu.title} />
          ))}
        </List>
        <Divider className={classes.divider} />
        <List>
          {MOBLE_SUB_MENU.map((menu) => (
            <NavBarLink menu={menu} isDesktop={false} key={menu.title} />
          ))}
        </List>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="center" mt={2}>
          <ButtonText
            onClick={logout}
            startIcon={
              <span className="account-list__logout-icon icon icon_name_logout" />
            }
          >
            <span className="font-weight-bold text text_view_secondary text-uppercase">
              Logout
            </span>
          </ButtonText>
        </Box>
      </div>
    </Drawer>
  );
};
