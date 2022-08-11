import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    }
  }));

const Transition = React.forwardRef(function Transition( props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContentDialog = (props) => {
  const classes = useStyles();
  const { opened, onClose, title, children } = props;

  return (
    <Dialog maxWidth={false} open={opened} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle id="dialog-title" className={classes.title}>{title}
        <IconButton className={classes.closeButton} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton></DialogTitle>
      <DialogContent dividers className={classes.content}>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentDialog;
