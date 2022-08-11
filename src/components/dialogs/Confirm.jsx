import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

import { ButtonContainer, ButtonText } from '../widgets/Button';

const ConfirmDialog = (props) => {
  const { opened, onClose, onSubmit } = props;

  return (
    <Dialog open={opened} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Are you sure?</DialogTitle>
      <DialogActions>
        <ButtonContainer
          onClick={onSubmit}
          className="mt-5 px-5"
          color="primary"
          variant="contained"
          size="small"
        >
          Ok
        </ButtonContainer>
        <Button
          onClick={onClose}
          className="mt-5 px-3"
          size="small"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
