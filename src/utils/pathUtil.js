export function getPhoto(poster) {
  if (poster) {
    if (poster.url) {
      return poster.url;
    } else if (poster.formats && poster.formats.thumbnail) {
      return poster.formats.thumbnail.url;
    }
  } else {
    return '/icon/ic_person.png';
  }
}

export function getPoster(poster) {
  if (poster) {
    if (poster.url) {
      return poster.url;
    } else if (poster.formats && poster.formats.thumbnail) {
      return poster.formats.thumbnail.url;
    }
  } else {
    return '/image/empty.png';
  }
}

export function getPreview(poster) {
  return poster ? poster : '/image/empty.png';
}

export function getMedia(media) {
  if (media.info) {
    if (media.info.type === 'series') {
      return media.stream_video_url;
    }
    //video player is waiting at list for one video, so its impoertantn to export at least something
    return 'https://d1mqj23dlohn3i.cloudfront.net/media/my-video360p.m3u8';
  }
  if (media && media.length > 0 && media[0].stream_video_url != null) {
    return media[0].stream_video_url;
  } else {
    //video player is waiting at list for one video, so its impoertantn to export at least something
    return 'https://d1mqj23dlohn3i.cloudfront.net/media/my-video360p.m3u8';
  }
}

export function getTrailer(media) {
  if (media && media.length > 0 && media[0].trailer && media[0].trailer.url) {
    return media[0].trailer.url;
  }

  return null;
}
