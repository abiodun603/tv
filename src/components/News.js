import React from 'react';

import { inject, observer } from 'mobx-react';

import Link from 'next/link';

import { Container, Spinner } from 'react-bootstrap';

import { NewsCard } from './cards/_html/NewsCard';
import { ButtonTextGreen } from './widgets/Button';

import possibleCategories from '../utils/lists/listTagNews';
import { TYPE_NEWS } from '../constants/API';
import { getPhoto } from '../utils/pathUtil';
@inject('news')
@observer
class News extends React.Component {
  state = {
    news: [],
    newsList: [],

    categories: [],
    categoriesFilter: [],
    amountOfActiveFilters: 0,

    searchingFor: '',
    searchLoading: false,
    searchResults: [],
  };

  toggleFilter = (filter) => {
    const filterIndex = this.state.categoriesFilter.indexOf(filter);
    if (filterIndex === -1) {
      this.state.categoriesFilter.push(filter);
      return this.setState({
        amountOfActiveFilters: (this.state.amountOfActiveFilters += 1),
      });
    } else {
      this.state.categoriesFilter.splice(filterIndex, 1);
      return this.setState({
        amountOfActiveFilters: (this.state.amountOfActiveFilters -= 1),
      });
    }
  };

  // searchForNews = (key, searchingFor, searchingIn) => {
  //   this.setState({ searchLoading: true });
  //   if (key === 'Enter') {
  //     console.log('u pressed enter...');
  //   }

  //   if (searchingFor.length >= 2) {
  //     const result = searchingIn.reduce(function (acc, item) {
  //       if (
  //         item.social.profile.username
  //           .trim()
  //           .toLowerCase()
  //           .includes(searchingFor.trim().toLowerCase()) ||
  //         item.title
  //           .trim()
  //           .toLowerCase()
  //           .includes(searchingFor.trim().toLowerCase())
  //       ) {
  //         acc.push(item);
  //         return acc;
  //       }
  //       return acc;
  //     }, []);
  //     return (
  //       this.setState({ searchResults: result }),
  //       this.setState({ searchLoading: false })
  //     );
  //   }
  //   return;
  // };

  componentDidMount() {
    this.props.news.getNews('news', {
      _where: { tags_contains: [TYPE_NEWS] },
    });

    this.setState({
      categories: possibleCategories,
    });
  }
  loadNews() {
    this.props.news.getNews('news', {
      _where: { tags_contains: [TYPE_NEWS] },
    });
  }

  searchNews(value) {
    if (value !== '') {
      return this.props.news.searchNews('news', {
        _where: { tags_contains: ['news'] },
        title_contains: value,
      });
    }
    this.props.news.resetNews('single', {
      _where: { tags_contains: [TYPE_NEWS] },
    });
  }
  render() {
    const news = this.props.news.media;

    return (
      <Container className="py-5 px-5">
        <div className="row">
          <div className="mb-4 col">
            <span className="text-title">Latest in the community</span>
          </div>
        </div>
        <ul className="news-nav list-inline text-center mb-4">
          <li className="news-nav__item list-inline-item">
            <a
              onClick={() => {
                this.setState({ categoriesFilter: [] });
              }}
              className={`news-nav__link ${
                this.state.categoriesFilter.length === 0 &&
                'news-nav__link_active'
              }`}
            >
              All
            </a>
          </li>
          {this.state.categories.map((category) => (
            <li key={category.key} className="news-nav__item list-inline-item">
              <a
                className={`news-nav__link ${
                  this.state.categoriesFilter.includes(category.label) &&
                  'news-nav__link_active'
                }`}
                onClick={(e) => {
                  this.toggleFilter(category.label);
                }}
              >
                {category.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="news-filter d-flex justify-content-between mb-4">
          <div className="news-filter__search">
            <label htmlFor="Search-for-news" className="sr-only">
              Search for news
            </label>
            <input
              value={this.state.searchingFor}
              onChange={(e) => {
                this.setState({ searchingFor: e.target.value });
                // this.searchForNews(e.key, e.target.value, news);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.searchNews(e.target.value);
                }
              }}
              type="text"
              className="news-filter__control form-control"
              id="Search-for-news"
              placeholder="Search for news"
            />
            <span className="news-filter__search-icon icon icon_name_search" />
            {/* <div
              className={
                this.state.searchingFor.length >= 2
                  ? 'news-filter__search__results'
                  : ''
              }
            >
              {this.state.searchLoading === false ? (
                <>
                  {this.state.searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/details/${TYPE_NEWS}?id=${result.id}`}
                    >
                      <div
                        className="news-filter__search__results__result"
                        // onMouseEnter={(e) => {
                        //   if (window) {
                        //     let description = e.target.children[1];
                        //     if (description) {
                        //       const length = description.innerHTML.length;
                        //       if (length > 25) {
                        //         description.style.transition = `${
                        //           length * 0.1
                        //         }s`;
                        //         description.style.textOverflow = 'unset';
                        //         description.style.overflow = 'initial';
                        //         description.style.whiteSpace = 'nowrap';
                        //         description.style.transform = `translateX(-${
                        //           length * 5.5
                        //         }px)`;
                        //       }
                        //     }
                        //   }
                        // }}
                        // onMouseLeave={(e) => {
                        //   if (window) {
                        //     let description = e.target.children[1];
                        //     if (description) {
                        //       const length = description.innerHTML.length;
                        //       if (length > 25) {
                        //         description.style.transition = `${
                        //           length * 0.1
                        //         }s`;
                        //         description.style.textOverflow = 'unset';
                        //         description.style.overflow = 'initial';
                        //         description.style.whiteSpace = 'nowrap';
                        //         description.style.transform = 'translateX(0px)';
                        //       }
                        //     }
                        //   }
                        // }}
                      >
                        <div className="search__results__result__author">
                          <img
                            className="result__author__avatar"
                            src={getPhoto(result.social.profile.photo)}
                            width="32"
                            height="32"
                            alt="avatar of the uploader"
                          />
                          <strong className="result__author__name">
                            {result.social.profile.username}
                          </strong>
                        </div>
                        <div className="search__results__result__body">
                          {result.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {this.state.searchingFor.length >= 2 &&
                    this.state.searchLoading === true && (
                      <div className="d-flex justify-content-center">
                        <Spinner
                          animation="border"
                          variant="success"
                          className="mt-3 mb-3"
                        />
                      </div>
                    )}
                </>
              )}
            </div> */}
          </div>
          <Link href="uploadNews">
            <button className="news-filter__add btn btn-primary" type="submit">
              <span className="news-filter__add-icon icon icon_name_plus" />
              <span className="sr-only">Add</span>
            </button>
          </Link>
        </div>

        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-4"
          style={{ minHeight: '302px' }}
        >
          {this.state.categoriesFilter.length === 0
            ? news.map((item) => <NewsCard key={item.id} item={item} />)
            : news.map((item) => {
                if (
                  this.props.news.categoryCheck(
                    item.tags,
                    this.state.categoriesFilter,
                  )
                ) {
                  return <NewsCard key={item.id} item={item} />;
                }
              })}
          {/* <div>{this.state.noNews && <div>no news...</div>}</div> */}
        </div>
        <div className="row">
          {this.props.news.hasMore && (
            <div
              onClick={() => {
                this.loadNews();
              }}
              className="col text-center my-5"
            >
              <ButtonTextGreen>Show more</ButtonTextGreen>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default News;
