import mobile from 'is-mobile';

export const BASE_URL = process.env.BASE_URL || 'https://api.isabi.tv/';

export const SINGLE_VIDEO = 'single';
export const SERIES = 'series';

export const MANAGER = 'manager';
export const USER = 'user';

export const PATH_URL_REC = 'videos/rec';
export const PATH_URL_RECOMMENDED = 'video/recommended';
export const PATH_URL_SUBSCRIPTIONS = 'video/subscriptions';
export const PATH_URL_VIDEOS = 'videos';
export const PATH_URL_VIDEO = 'video/';

export const PATH_URL_MY_UPLOADS = 'myuploads';
export const PATH_URL_EPISODES = 'episodes';

export const PATH_URL_SOCIAL = 'social';
export const PATH_URL_SUBSCRIBE = 'social/subscribe/';
export const PATH_URL_UNSUBSCRIBE = 'social/unsubscribe/';

export const PATH_URL_COMMENTS = 'comments/video/';
export const PATH_URL_COMMENT_CREATE = 'comment/create';

export const PATH_URL_LIKE_CREATE = 'like/create';
export const PATH_URL_LIKE_DELETE = (id) => `like/delete/${id}`;

export const PATH_URL_LIB_WATCH = 'lib/watch'; 
export const PATH_URL_LIB_HISTORY = 'lib/history';
export const PATH_URL_LIB_SUBSCIBED_COLLECTIONS = '/collections/my';
export const PATH_URL_LIB_COMPLAINT = 'complaints/create';

export const PATH_URL_COUNTRIES = 'countries/';

export const PATH_URL_COLLECTIONS = 'collections/';
export const PATH_URL_COLLECTION = 'collection/';

export const PATH_URL_COMING_SOON = 'comings'; 

export const PATH_URL_CONTESTS = 'contests/';

export const PATH_URL_PROFILE = 'profile';
export const PATH_URL_PROFILE_CREATE = 'profile/create';
export const PATH_URL_PROFILE_UPDATE = 'profile/update';
export const PATH_URL_PROFILE_REMOVE_UPLOADS = 'profile/removeUploads';
export const PATH_URL_PROFILE_REMOVE_ACCOUNT = 'profile/delete/my';
export const PATH_URL_PROFILE_CLEAR_HISTORY = 'profile/clearHistory';

export const PATH_URL_SEARCH_HISTORY_MY = 'search-history/my';
export const PATH_URL_SEARCH_HISTORY_MY_LIST = 'search-history/my/list';
export const PATH_URL_SETTINGS = 'settings';

export const PATH_URL_UPLOAD = 'upload';

export const PATH_URL_LANGUAGES = 'languages';

export const PARAM_LIMIT_SMALL = 3;
export const PARAM_LIMIT_MEDIUM = 4;
export const PARAM_LIMIT_LARGE = 6;
export const PARAM_LIMIT_LIB = 8;
export const PARAM_LIMIT_ALL = 12;
export const PARAM_LIMIT_COMMENTS = 5;

export const TYPE_REC = 'tip';
export const TYPE_USER = 'user';
export const TYPE_FILM = 'film';
export const TYPE_SERIAL = 'serial';
export const TYPE_MUSIC = 'music';
export const TYPE_PODCAST = 'podcast';
export const TYPE_NEWS = 'news';
export const TYPE_COMING_SOON = 'coming';

export const TYPE_LIB_HISTORY = 'history';
export const TYPE_LIB_WATCH = 'watch';

export const TAG_ALL = 'all';
export const TAG_TV = 'tv';
export const TAG_KIDS = 'kids';
export const TAG_MUSIC = 'music';
export const TAG_DOC = 'doc';
export const TAG_FAVORITE_USER = 'favorite_user';

export const ALL_LANGUAGES_ID = 1;

export const PARAM_LIMIT_M = mobile() ? 2 : 4;
export const PARAM_LIMIT_L = mobile() ? 2 : 6;
