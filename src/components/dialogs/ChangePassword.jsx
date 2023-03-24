import React, { useEffect } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Spinner } from 'react-bootstrap';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

import { ButtonContainer, ButtonTextGreen } from '../widgets/Button';
import { CustomTextField } from '../widgets/Field';

const ChangePassword = inject(
  'ui',
  'profile',
)(
  observer((props) => {
    useEffect(() => {
      autorun(() => {
        let state = props.profile.statusChangePass;

        if (state === 'success') {
          close();
          props.profile.clearPass();
        }
      });
    }, []);

    close = () => {
      props.profile.clearPass();
      props.ui.closeDialog();
    };
    let store = props.profile;

    return (
      <div>
        <ButtonTextGreen
          onClick={props.ui.openDialog}
          startIcon={
            <span className="account-list__lock-icon icon icon_name_lock" />
          }
        >
          CHANGE PASSWORD
        </ButtonTextGreen>

        <Dialog
          open={props.ui.isOpenDialog}
          onClose={close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="dialog-title">Change password</DialogTitle>
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
                !store.validated.newPass ? 'Password must be more than 6 characters including at least one number, one character and a Capital letter.' : ''
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
            <Button onClick={close} className="mt-5 px-5" size="small">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }),
);
export default ChangePassword;
