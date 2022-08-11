import * as TYPES from '../constants/types';
import * as TAGS from '../constants/tags';
import * as GENRES from '../constants/genres';
import { MANAGER, USER } from '../constants/API';

const getVideoParams = (type, tag) => {
  if (type && type !== TYPES.USER && !tag) {
    switch (type) {
      case TYPES.PODCAST: {
        return {
          _where: {
            type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
            tags_contains: [GENRES.PODCASTS],
            tags_ncontains: [TAGS.NEWS],
          },
        };
      }
      case TYPES.REC: {
        return {
          _where: {
            type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
            creator: MANAGER,
            tags_ncontains: [TAGS.NEWS],
          },
        };
      }
      case TYPES.MUSIC: {
        return {
          _where: {
            type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
            tags_contains: [GENRES.MUSIC],
            tags_ncontains: [TAGS.NEWS],
          },
        };
      }
      default:
        return {
          _where: {
            tags_ncontains: [TAGS.NEWS],
            type,
          },
        };
    }
  }

  switch (tag) {
    case TAGS.FAVORITE_USER:
      return {
        _where: {
          status: TYPES.RELEASED,
          creator: USER,
        },
      };
    case TAGS.POPULAR:
      return {
        _where: {
          status: TYPES.RELEASED,
          creator: USER,
          tags_ncontains: [TAGS.NEWS],
        },
      };
    case TAGS.RECOMMENDED:
      return {
        _where: {
          tags_ncontains: [TAGS.NEWS],
          status: TYPES.RELEASED,
          creator: USER,
        },
      };
    case TAGS.NEWS:
      return {
        _where: {
          tags_contains: [TAGS.NEWS],
          type: [TYPES.SINGLE_VIDEO],
        },
      };
    case TAGS.KIDS:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          status: TYPES.RELEASED,
          tags_contains: [GENRES.KIDS, GENRES.ANIMATION],
          tags_ncontains: [TAGS.NEWS],
          creator: MANAGER,
        },
      };
    case TAGS.DOC:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          status: TYPES.RELEASED,
          tags_contains: [GENRES.DOC],
          tags_ncontains: [TAGS.NEWS],
          creator: MANAGER,
        },
      };
    case TAGS.TV:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          status: TYPES.RELEASED,
          tags_contains: [GENRES.TV],
          tags_ncontains: [TAGS.NEWS],
          creator: MANAGER,
        },
      };
    case TAGS.MUSIC:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          status: TYPES.RELEASED,
          tags_contains: [GENRES.MUSIC],
          tags_ncontains: [TAGS.NEWS],
          creator: MANAGER,
        },
      };
    case TAGS.PODCASTS:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          status: TYPES.RELEASED,
          tags_contains: [GENRES.PODCASTS],
          tags_ncontains: [TAGS.NEWS],
          creator: MANAGER,
        },
      };
    case TAGS.MOVIES:
      return {
        type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
        status: TYPES.RELEASED,
        creator: MANAGER,
        // _where: [
        //   {
        //     tags_ncontains: [TAGS.NEWS],
        //   },
        //   {
        //     tags_ncontains: [GENRES.TV],
        //   },
        //   {
        //     tags_ncontains: [GENRES.KIDS],
        //   },
        //   {
        //     tags_ncontains: [GENRES.ANIMATION],
        //   },
        // ],
      };

    case TAGS.ALL:
      return {
        type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
        status: TYPES.RELEASED,
        creator: MANAGER,
        // _where: [
        //   {
        //     tags_ncontains: [TAGS.NEWS],
        //   },
        //   {
        //     tags_ncontains: [GENRES.TV],
        //   },
        //   {
        //     tags_ncontains: [GENRES.KIDS],
        //   },
        //   {
        //     tags_ncontains: [GENRES.ANIMATION],
        //   },
        //   {
        //     tags_ncontains: [GENRES.MUSIC],
        //   },
        //   {
        //     tags_ncontains: [GENRES.PODCASTS],
        //   },
        // ],
      };
    default:
      return {
        _where: {
          type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
          tags_contains: tag,
          tags_ncontains: [TAGS.NEWS],
        },
      };
  }
};

export default getVideoParams;
