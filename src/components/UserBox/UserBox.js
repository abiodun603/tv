import React, { FC } from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';

import style from './UserBox.module.scss';

const UserBox = ({
  url = '',
  avatarUrl,
  children,
  userName = '',
  nickName = '',
  isMobile = false,
}) => {
  const UserBoxContent = (
    <div className={style.userBoxContainer}>
      {!isMobile && <Avatar src={avatarUrl} />}
      <div>
        {userName && <p className={style.userBoxName}>{userName}</p>}
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
