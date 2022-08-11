import { action, configure, observable, runInAction } from 'mobx';
import { PARAM_LIMIT_ALL } from '../constants/API';

configure({ enforceActions: 'always' });

class ContestsStore {
  @observable contests = {
    start: 0,
    media: [],
    hasMore: true,
    total: PARAM_LIMIT_ALL,
    loading: false,
  };

  @action
  getComming(firstParams = {}) {
    //TODO Remove Temp mock
    runInAction(() => {
      this.contests = {
        start: 0,
        end: 12,
        media: [
          {
            title: 'Contest 1',
            image: {
              url: `/fake_data/contests/contest-1.png`,
            },
          },
        ],
        hasMore: false,
        total: 12,
        loading: false,
      };
    });
    /* end mock  */
  }

  @action
  getContests(firstParams = {}) {
    //TODO Remove Temp mock
    runInAction(() => {
      this.contests = {
        start: 0,
        end: 12,
        media: [
          {
            title: 'Contest 1',
            image: {
              url: `/fake_data/contests/contest-1.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/contest-2.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/contest-3.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/contest-4.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/contest-2.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/contest-5.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/more-1.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/more-2.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/more-3.png`,
            },
          },
          {
            title: 'Contest 2',
            image: {
              url: `/fake_data/contests/more-4.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-6.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-7.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-8.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-9.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-10.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-11.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-12.png`,
            },
          },
          {
            title: 'Contest 6',
            image: {
              url: `/fake_data/contests/contest-13.png`,
            },
          },
        ],
        hasMore: false,
        total: 12,
        loading: false,
      };
    });
    /* end mock  */
  }
}

export default ContestsStore;
