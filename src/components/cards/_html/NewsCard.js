import Link from 'next/link';
import { Col } from 'react-bootstrap';

import { TYPE_NEWS } from '../../../constants/API';
import { getPhoto, getPreview } from '../../../utils/pathUtil';

function converBigNumber(val) {
  if (val < 1000) {
    return val;
  }
  return (val / 1000).toFixed(1) + 'k';
}

export const NewsCard = ({ item }) => {
  const owner = item.social ? item.social.profile : item.user;
  return (
    <Col md={6} xl={3} className="mb-4">
      <div className="news-card card card_theme_default h-100">
        <div className="news-card__body card-body">
          <div className="news-card__header media mb-3 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <img
                src={getPhoto(owner.photo)}
                width="32"
                height="32"
                className="news-card__image"
                alt=""
              />
              <div className="font-weight-bold text text_typography_subheader-s">
                {owner.username}
              </div>
            </div>
            <div>
              <span className="news-card__flag-icon icon icon_name_flag"></span>
            </div>
          </div>
          <div className="news-card__text text text_view_secondary mb-2">
            {item.title}
          </div>
          <Link href={`/details/${TYPE_NEWS}?id=${item.id}`}>
            <div className="news-card__media">
              <img
                src={getPreview(item.preview_url)}
                className="news-card__media-image rounded"
                alt=""
              />
              <div className="news-card__play"></div>
              <div className="news-card__info">
                <div className="news-card__info-item">
                  <span className="news-card__info-views news-card__info-icon icon icon_name_views"></span>
                  <span className="news-card__info-value">
                    {converBigNumber(item.count_watch)}
                  </span>
                </div>
                <div className="news-card__info-item">
                  <span className="news-card__info-likes news-card__info-icon icon icon_name_likes"></span>
                  <span className="news-card__info-value">
                    {converBigNumber(item.count_like)}
                  </span>
                </div>
                <div className="news-card__info-item">
                  <span className="news-card__info-comments news-card__info-icon icon icon_name_comments"></span>
                  <span className="news-card__info-value">
                    {converBigNumber(item.count_comments)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Col>
  );
};
