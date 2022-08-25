import React, { useState } from 'react';
import cookies from 'js-cookie';
import { Button } from '@material-ui/core';

import FlagIcon from '../../../public/icon/ic_flag.svg';

import { PATH_URL_LIB_COMPLAINT } from '../../constants/API';

import http from '../../api/axiosApi';

export const Complaint = ({
  id,
  className,
  hasComplaint,
  isButton,
  isFromDetailsPage = false,
  onComplain = () => {},
}) => {
  const [complaint, setComplaint] = useState(hasComplaint);

  const complain = () => {
    http.setToken(cookies.get('token'));

    const method = complaint ? 'delete' : 'post';
    http[method](PATH_URL_LIB_COMPLAINT, {
      video_id: id,
    }).then(() => {
      setComplaint(!complaint);
    });
  };

  const isComplaint = isFromDetailsPage ? hasComplaint : complaint;

  return isButton ? (
    <Button
      size="large"
      disableElevation
      onClick={() => {
        isFromDetailsPage ? onComplain() : complain();
      }}
      startIcon={
        <FlagIcon
          className={`${className} icon-small`}
          fill={isComplaint ? '#bd392d' : 'rgba(172,170,170,0.4)'}
        />
      }
    >
      Сomplain
    </Button>
  ) : (
    <FlagIcon
      onClick={() => {
        isFromDetailsPage ? onComplain() : complain();
      }}
      className={`${className} icon-small`}
      fill={isComplaint ? '#bd392d' : 'rgba(172,170,170,0.4)'}
    />
  );
};
