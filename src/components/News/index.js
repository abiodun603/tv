import React, { useState, useEffect } from 'react';

import { inject, observer } from 'mobx-react';
import { useMediaQuery } from '@material-ui/core';

import Link from 'next/link';

import { Container, Spinner } from 'react-bootstrap';

import { NewsCard } from '../cards/_html/NewsCard';
import { ButtonTextGreen } from '../widgets/Button';

import possibleCategories from '../../utils/lists/listTagNews';
import { TYPE_NEWS } from '../../constants/API';

const News = inject('news')(
  observer((props) => {
    const [categories, setCategories] = useState([]);
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    const [amountOfActiveFilters, setAmountOfActiveFilters] = useState(0);
    const [searchingFor, setSearchingFor] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const isMobile = useMediaQuery('(max-width:768px)');
    const isLargeScreen = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
      setCategories(possibleCategories);

      loadNews();
    }, []);

    const loadNews = () => {
      props.news.getNews('news', {
        _where: { tags_contains: [TYPE_NEWS] },
      });
    };

    const searchNews = (value) => {
      if (value !== '') {
        return props.news.searchNews('news', {
          _where: { tags_contains: ['news'] },
          title_contains: value,
        });
      }

      props.news.resetNews('single', {
        _where: { tags_contains: [TYPE_NEWS] },
      });
    };

    const toggleFilter = (filter) => {
      const filterIndex = categoriesFilter.indexOf(filter);
      if (filterIndex === -1) {
        categoriesFilter.push(filter);
        setAmountOfActiveFilters(amountOfActiveFilters + 1);
      } else {
        categoriesFilter.splice(filterIndex, 1);
        setAmountOfActiveFilters(amountOfActiveFilters - 1);
      }
    };

    const news = props.news.media;

    return (
      <Container>
        <div className={isMobile ? 'py-3' : isLargeScreen ? 'py-5' : 'p-5'}>
          <div className="row">
            <div className="mb-4 col">
              <span className="text-title">Latest in the community</span>
            </div>
          </div>
          <ul className="news-nav d-flex align-items-center justify-content-between flex-wrap mb-4">
            <li className="news-nav__item">
              <a
                onClick={() => setCategoriesFilter([])}
                className={`news-nav__link ${
                  categoriesFilter.length === 0 && 'news-nav__link_active'
                }`}
              >
                All
              </a>
            </li>
            {categories.map((category) => (
              <li
                key={category.key}
                className="news-nav__item list-inline-item"
              >
                <a
                  className={`news-nav__link ${
                    categoriesFilter.includes(category.label) &&
                    'news-nav__link_active'
                  }`}
                  onClick={(e) => {
                    toggleFilter(category.label);
                  }}
                >
                  {category.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="news-filter d-flex justify-content-between mb-4">
            <div className="news-filter__search">
              <input
                value={searchingFor}
                onChange={(e) => setSearchingFor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchNews(e.target.value);
                  }
                }}
                type="text"
                className="news-filter__control form-control"
                id="Search-for-news"
                placeholder="Search for news"
              />
              <span className="news-filter__search-icon icon icon_name_search" />
            </div>
            <Link href="uploadNews">
              <button
                className="news-filter__add btn btn-primary"
                type="submit"
              >
                <span className="news-filter__add-icon icon icon_name_plus" />
              </button>
            </Link>
          </div>

          <div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-4"
            style={{ minHeight: '302px' }}
          >
            {categoriesFilter.length === 0
              ? news.map((item) => <NewsCard key={item.id} item={item} />)
              : news.map((item) => {
                  if (props.news.categoryCheck(item.tags, categoriesFilter)) {
                    return <NewsCard key={item.id} item={item} />;
                  }
                })}
          </div>
          <div className="row">
            {props.news.hasMore && (
              <div
                onClick={() => {
                  loadNews();
                }}
                className="col text-center my-5"
              >
                <ButtonTextGreen>Show more</ButtonTextGreen>
              </div>
            )}
          </div>
        </div>
      </Container>
    );
  }),
);
export default News;
