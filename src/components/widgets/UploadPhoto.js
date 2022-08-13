import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from 'react-bootstrap/Spinner';
import { Badge, Avatar } from '@material-ui/core';

import EditIcon from '../../../public/icon/ic_edit.svg';
import { getPhoto } from '../../utils/pathUtil';

function UploadPhoto(props) {
  const [loading, setLoading] = useState(false);
  const { storeProfile } = props;

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
    <Avatar width="100" height="100" src={getPhoto(storeProfile.photo)} />
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
