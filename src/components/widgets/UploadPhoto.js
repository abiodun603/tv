import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from 'react-bootstrap/Spinner';
import { Badge, Avatar } from '@material-ui/core';

import EditIcon from '../../../public/icon/ic_edit.svg';
import { getPhoto } from '../../utils/pathUtil';

function UploadPhoto(props) {
  const [loading, setLoading] = useState(false);
  const { storeProfile } = props;

  const onDrop = useCallback((file) => {
    setLoading(true);
    props.upload(file).then(() => {
      setLoading(false);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  });

  const avatar = (
    <Avatar src={getPhoto(storeProfile.photo)} className={props.classname} />
  );

  if (loading) {
    return <Spinner animation="border" variant="success" />;
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Badge
        overlap="circular"
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
