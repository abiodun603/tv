import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from '@material-ui/core';

import { useCurrentWidth } from '../../../lib/hooks/useCurrentWidth';

import { CarouselItem, LoadingCarousel } from './carousel-item';
import { ArrowButton } from './arrow-button';

import style from './movies-carousel.module.scss';

const SlidingInterval = 5000;

const Slider = React.forwardRef(({ children, ...props }, ref) => {
  const width = Math.min(useCurrentWidth(), 1344);

  return (
    <div className={style.carousel}>
      <div className="d-flex justify-content-center">
        <Carousel ref={ref} width={width} {...props}>
          {children}
        </Carousel>
      </div>
    </div>
  );
});

const MoviesCarousel = inject('home')(
  observer((props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { home: homeStore } = props;
    const movies = homeStore.sliderMovies;
    const isMobile = useMediaQuery('(max-width:767px)');

    useEffect(() => {
      homeStore.getCarouselMovies();
    }, []);

    const renderItem = (movie, idx) => {
      return (
        <CarouselItem
          key={`MoviesCarousel_item_${idx.toString()}`}
          active={idx === currentSlide}
          video={movie}
        />
      );
    };

    const renderPrevArrow = (onClickHandler) => {
      if (isMobile) return null;
      return <ArrowButton position="left" onClick={onClickHandler} />;
    };

    const renderNextArrow = (onClickHandler) => {
      if (isMobile) return null;
      return <ArrowButton position="right" onClick={onClickHandler} />;
    };

    return (
      <div className={style.carousel_wrapper}>
        {homeStore.carousel.loading && (
          <div className={style.carousel}>
            <div className="d-flex justify-content-center">
              <LoadingCarousel />
            </div>
          </div>
        )}
        {movies.length > 0 && (
          <Slider
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows
            centerMode={isMobile ? false : true}
            interval={SlidingInterval}
            infiniteLoop
            autoPlay
            onChange={(idx) => setCurrentSlide(idx)}
            onClickItem={(idx) => setCurrentSlide(idx)}
            renderArrowPrev={renderPrevArrow}
            renderArrowNext={renderNextArrow}
          >
            {movies.map(renderItem)}
          </Slider>
        )}
      </div>
    );
  }),
);

export { MoviesCarousel };
