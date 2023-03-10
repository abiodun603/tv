'use client'
import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { Box } from '../../widgets/Box';
import ConfirmDialog from '../../dialogs/Confirm';
import { ButtonText } from '../../widgets/Button';
import Toggler from './../../Toggler/Toggler';
import { PrettoSlider } from '../../ui/slider';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(2),
  },
  rBorder: {
    borderRight: `1px solid ${theme.palette.grey.grey50}`,
  },
}));

const ProfileSettings = inject('auth')(
  observer((props) => {
    const { profileStore } = props.auth;
    const [quality, setQuality] = useState(480);
    const [qualityText, setQualityText] = useState('');
    const [deleteAllUploadsDialog, setDeleteAllUploadsDialog] = useState(false);
    const [clearHistoryDialog, setClearHistoryDialog] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:767px)');
    const theme = useTheme();

    useEffect(() => {
      if (quality <= 500) {
        setQualityText(`Low ${quality}p`);
      } else if ((quality > 500) & (quality <= 1000)) {
        setQualityText(`Medium ${quality}p`);
      } else {
        setQualityText(`High ${quality}p`);
      }
    }, [quality]);
    const toggleDeleteAllUploadsDialog = () => {
      setDeleteAllUploadsDialog(!deleteAllUploadsDialog);
    };

    const handleSubmitRemoveUploads = () => {
      const {
        profileStore: { removeUploads },
      } = props.auth;

      toggleDeleteAllUploadsDialog();

      removeUploads();
    };

    const toggleClearHistoryDialog = () => {
      setClearHistoryDialog(!clearHistoryDialog);
    };

    const handleSubmitClearHistory = () => {
      const {
        profileStore: { clearHistory },
      } = props.auth;

      toggleClearHistoryDialog();

      clearHistory();
    };

    return (
      <Box ml={isMobile ? 0 : 4}>
        <Grid container>
          <Grid container item xs={12} className={classes.gridContainer}>
            <Grid item xs={12}>
              <Box fontWeight="500" fontSize="2rem">
                Settings
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={4}
            className={classNames(classes.gridContainer, classes.rBorder)}
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Box>Video Quality</Box>
                <Box>{qualityText}</Box>
              </Box>
              <Box mb={2}>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  value={quality}
                  min={360}
                  max={1200}
                  onChange={(e, v) => setQuality(v)}
                  step={10}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <Toggler
                  id="track_watch"
                  title="Do not track my watch history"
                  checked={Boolean(profileStore.profile.watch_history_enabled)}
                  onChange={(event) => {
                    profileStore.setDontTrackWatch(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <Toggler
                  id="track_search"
                  title="Do not track my search history"
                  checked={Boolean(profileStore.profile.search_history_enabled)}
                  onChange={(event) => {
                    profileStore.setDontTrackSearch(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <ButtonText onClick={toggleDeleteAllUploadsDialog}>
                  <span className="font-weight-bold text-danger text-uppercase">
                    <u>Delete All Uploads</u>
                  </span>
                </ButtonText>
                <ConfirmDialog
                  opened={Boolean(deleteAllUploadsDialog)}
                  onClose={toggleDeleteAllUploadsDialog}
                  onSubmit={handleSubmitRemoveUploads}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <ButtonText onClick={toggleClearHistoryDialog}>
                  <span className="font-weight-bold text-danger text-uppercase">
                    <u>Clear History</u>
                  </span>
                </ButtonText>
                <ConfirmDialog
                  opened={Boolean(clearHistoryDialog)}
                  onClose={toggleClearHistoryDialog}
                  onSubmit={handleSubmitClearHistory}
                />
              </Box>
            </Grid>
          </Grid>
          {/* <Grid container item xs={12} md={8} className={classes.gridContainer}>
            <Grid item xs={12}>
              <Box fontWeight="500" mb={2}>
                My Devices
              </Box>
              <Box color={theme.palette.grey.grey60} mb={2}>
                Devices that are currently signed in on your account
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                mb={2}
              >
                <Box>PC, Windows 10 -&nbsp;&nbsp;</Box>
                <Box color={theme.palette.grey.grey60}>Toronto, Canada</Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                mb={2}
              >
                <Box>Samsung Galaxy, Android 9P -&nbsp;&nbsp;</Box>
                <Box color={theme.palette.grey.grey60}>Toronto, Canada</Box>
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    );
  }),
);

export default ProfileSettings;
