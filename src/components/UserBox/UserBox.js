import React, { FC } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import style from './UserBox.module.scss';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const UserBox = ({
  url = '',
  avatarUrl,
  children,
  userName = '',
  nickName = '',
  isMobile = false,
}) => {
  const classes = useStyles();

  const UserBoxContent = (
    <div className={style.userBoxContainer}>
      <Avatar src={avatarUrl} className={isMobile ? classes.small : ''} />
      <div>
        {userName && (
          <p className={`${style.userBoxName} ${isMobile ? 'h6' : ''}`}>
            {userName}
          </p>
        )}
        {nickName && (
          <p className={style.userBoxNickName}>
            {nickName ? `@${nickName}` : nickName}
          </p>
        )}
      </div>
    </div>
  );
  return (
    <div className={style.userBox}>
      {Boolean(url) ? <Link href={url}>{UserBoxContent}</Link> : UserBoxContent}
      {children}
    </div>
  );
};

export default UserBox;
