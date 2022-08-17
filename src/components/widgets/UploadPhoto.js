import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from 'react-bootstrap/Spinner';
import { Badge, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EditIcon from '../../../public/icon/ic_edit.svg';
import { getPhoto } from '../../utils/pathUtil';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 60,
    height: 60,
  },
}));

function UploadPhoto(props) {
  const [loading, setLoading] = useState(false);
  const { storeProfile } = props;
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (file) => {
      setLoading(true);
      props.upload(file).then(() => {
        setLoading(false);
      });
    },
    multiple: false,
    accept: '.png, .jpeg, .jpg',
  });

  const avatar = (
    <Avatar src={getPhoto(storeProfile.photo)} className={classes.avatar} />
  );

  if (loading) {
    return <Spinner animation="border" variant="success" />;
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<EditIcon />}
      >
        {avatar}
      </Badge>
    </div>
  );
}

export default UploadPhoto;
