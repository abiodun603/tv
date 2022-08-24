import React, { FC } from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';

import style from './UserBox.module.scss';

const UserBox = ({
  url = '',
  avatarUrl,
  children,
  userName,
  nickName = '',
}) => {
  const UserBoxContent = (
    <div className={style.userBoxContainer}>
      <Avatar src={avatarUrl} />
      <div>
        <p className={style.userBoxName}>{userName}</p>
        <p className={style.userBoxNickName}>
          {nickName ? `@${nickName}` : nickName}
        </p>
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
