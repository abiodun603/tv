import Image from 'next/image';
import Link from 'next/link';

export default function CardContest({ item }) {
  return (
    <div className="col mb-4">
      <div className="news-card card card_theme_default h-100">
        <div className="news-card__body card-body">
          <div className="news-card__header media mb-3">
            <Image
              src={item.image.url}
              width="32"
              height="32"
              className="news-card__image"
              alt=""
            />
            <div className="media-body d-flex justify-content-between">
              <div className="font-weight-bold text text_typography_subheader-s">
                Jordan Barnes
              </div>
              <span className="news-card__flag-icon icon icon_name_flag"></span>
            </div>
          </div>
          <div className="news-card__media">
            <Image
              src={item.image.url}
              className="news-card__media-image rounded"
              alt=""
            />
            <div className="news-card__play"></div>
            <div className="news-card__info">
              <div className="news-card__info-item">
                <span className="news-card__info-views news-card__info-icon icon icon_name_views"></span>
                <span className="news-card__info-value">11.4k</span>
              </div>
              <div className="news-card__info-item">
                <span className="news-card__info-likes news-card__info-icon icon icon_name_likes"></span>
                <span className="news-card__info-value">10k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
