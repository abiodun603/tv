import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';

import { inject, observer } from 'mobx-react';
import { useMediaQuery } from '@material-ui/core';

import Link from 'next/link';

import { Container, Spinner } from 'react-bootstrap';

import { NewsCard } from '../cards/_html/NewsCard';
import { ButtonTextGreen } from '../widgets/Button';
import { MockEmptySpace } from '../mock/MockEmptySpace';
import { ThreeDotsLoader } from '../ui/spiner';

import possibleCategories from '../../utils/lists/listTagNews';
import { TYPE_NEWS } from '../../constants/API';
import NewsTabs from './NewsTabs';

const News = inject('news')(
  observer((props) => {
    const [activeTab, setAactiveTab] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    const [searchingFor, setSearchingFor] = useState('');
    const isMobile = useMediaQuery('(max-width:767px)');
    const isLargeScreen = useMediaQuery('(min-width:1280px)');

    useEffect(() => {
      setCategories(possibleCategories);
    }, []);

    useEffect(() => {
      const selectedTag = categories.find((c) => c.key === activeTab);
      loadNews(selectedTag?.label);
    }, [activeTab]);

    const loadNews = (tag = TYPE_NEWS) => {
      if (tag === 'All') {
        tag = TYPE_NEWS
      }

      props.news.getNews('news', {
        _where: { tags_contains: [tag] },
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

    const news = props.news.media;

    return (
      <Container>
        <div className={isMobile ? 'py-3' : isLargeScreen ? 'py-5' : 'p-5'}>
          <div className="row">
            <div className="mb-4 col">
              <span className="text-title">Latest in the community</span>
            </div>
          </div>
          <div className="mb-4 news-tabs">
            <NewsTabs
              categories={categories}
              activeTab={activeTab}
              onTabSelected={(e, i) => setAactiveTab(i)}
            />
          </div>

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
            {props.news.loading ? (
              <div className="d-flex align-items-center justify-content-center w-100">
                <ThreeDotsLoader />
              </div>
            ) : (
              <>
                {news.length === 0 && <MockEmptySpace width={250} />}
                {categoriesFilter.length === 0
                  ? news.map((item) => <NewsCard key={item.id} item={item} />)
                  : news.map((item) => {
                      if (
                        props.news.categoryCheck(item.tags, categoriesFilter)
                      ) {
                        return <NewsCard key={item.id} item={item} />;
                      }
                    })}
              </>
            )}
          </div>
          <Row>
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
          </Row>
        </div>
      </Container>
    );
  }),
);
export default News;
