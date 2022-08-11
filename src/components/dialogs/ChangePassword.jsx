import React, { ReactEventHandler } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Spinner } from 'react-bootstrap';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Button,
} from '@material-ui/core';

import { ButtonContainer, ButtonTextGreen } from '../widgets/Button';
import { CustomTextField } from '../widgets/Field';


@inject('ui', 'profile')
@observer
class ChangePassword extends React.Component {
  static autoRunPass;

  componentDidMount() {
    this.autoRunPass = autorun(() => {
      let state = this.props.profile.statusChangePass;

      if (state === 'success') {
        this.close();
        this.props.profile.clearPass();
      }
    });
  }

  close = () => {
    this.props.profile.clearPass();
    this.props.ui.closeDialog();
  };

  render() {
    let store = this.props.profile;

    return (
      <div>
        <ButtonTextGreen
          onClick={this.props.ui.openDialog}
          startIcon={
            <span className="account-list__lock-icon icon icon_name_lock" />
          }
        >
          CHANGE PASSWORD
        </ButtonTextGreen>

        <Dialog
          open={this.props.ui.isOpenDialog}
          onClose={this.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="dialog-title">
            <Typography variant="h6">Change password</Typography>
          </DialogTitle>
          <DialogContent>
            <CustomTextField
              label="Old password"
              type="password"
              error={!store.validated.oldPass}
              helperText={
                !store.validated.oldPass ? 'Incorrect old password' : ''
              }
              value={store.password.oldPass}
              onChange={(e) => store.setOldPass(e.target.value)}
              fullWidth
            />
            <CustomTextField
              margin="dense"
              label="New password"
              type="password"
              error={!store.validated.newPass}
              helperText={
                !store.validated.newPass ? 'Incorrect new password' : ''
              }
              value={store.password.new}
              onChange={(e) => store.setNewPass(e.target.value)}
              fullWidth
            />
            <CustomTextField
              margin="dense"
              label="Confirm password"
              type="password"
              error={!store.validated.repeatPass}
              helperText={
                !store.validated.repeatPass ? 'Incorrect confirm password' : ''
              }
              value={store.password.repeat}
              onChange={(e) => store.setRepPass(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {store.statusChangePass === 'loading' ? (
              <Spinner animation="border" variant="success" className="mt-4" />
            ) : (
              <ButtonContainer
                onClick={store.changePassword}
                className="mt-5 px-5"
                color="primary"
                variant="contained"
                size="small"
              >
                Save
              </ButtonContainer>
            )}
            <Button onClick={this.close} className="mt-5 px-5" size="small">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ChangePassword;
