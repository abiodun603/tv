import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Carousel } from 'react-responsive-carousel';

import { useCurrentWidth } from '../../../lib/hooks/useCurrentWidth';

import { CarouselItem } from './carousel-item';
import { ArrowButton } from './arrow-button';

import style from './movies-carousel.module.scss';

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

const SlidingInterval = 5000;

const MoviesCarousel = inject('home')(
  observer((props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { home: homeStore } = props;
    const movies = homeStore.sliderMovies;

    useEffect(() => {
      homeStore.getCarouselMovies();
    }, []);

    const RenderItem = (movie, idx) => {
      return (
        <CarouselItem
          key={`MoviesCarousel_item_${idx.toString()}`}
          active={idx === currentSlide}
          video={movie}
        />
      );
    };

    const RenderPrevArrow = (onClickHandler) => {
      return <ArrowButton position="left" onClick={onClickHandler} />;
    };

    const RenderNextArrow = (onClickHandler) => {
      return <ArrowButton position="right" onClick={onClickHandler} />;
    };

    return (
      <div className={style.carousel_wrapper}>
        {movies.length > 0 && (
          <Slider
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows
            centerMode
            interval={SlidingInterval}
            infiniteLoop
            autoPlay
            onChange={(idx) => setCurrentSlide(idx)}
            onClickItem={(idx) => setCurrentSlide(idx)}
            renderArrowPrev={RenderPrevArrow}
            renderArrowNext={RenderNextArrow}
          >
            {movies.map(RenderItem)}
          </Slider>
        )}
      </div>
    );
  }),
);

export { MoviesCarousel };
