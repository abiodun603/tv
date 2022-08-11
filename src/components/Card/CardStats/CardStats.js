import React, { FC } from 'react';
import { CardStatsViews, CardStatsLike, CardStatsComment } from './CardStat-Items';

import style from './CardStats.module.scss';

const CardStats = ({ views, likes, comments, disableViews, disableLikes, disableComments }) => {
  return (
    <div className={style.stats}>
      { !disableViews && <CardStatsViews value={views} /> }
      { !disableLikes && <CardStatsLike value={likes} /> }
      { !disableComments && <CardStatsComment value={comments} /> }
    </div>
  );
};

export default CardStats;
