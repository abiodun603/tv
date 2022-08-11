import React from 'react';
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

@inject('home')
@observer
class MoviesCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      slidingInterval: 5000,
    };
  }

  componentDidMount() {
    const { home: homeStore } = this.props;

    homeStore.getCarouselMovies();
  }

  handleSlideChange = (idx) => {
    this.setState({
      ...this.state,
      currentSlide: idx,
    });
  };

  renderItem = (movie, idx) => {
    const { currentSlide } = this.state;

    return (
      <CarouselItem
        key={`MoviesCarousel_item_${idx.toString()}`}
        active={idx === currentSlide}
        video={movie}
      />
    );
  };

  renderPrevArrow = (onClickHandler) => {
    return <ArrowButton position="left" onClick={onClickHandler} />;
  };

  renderNextArrow = (onClickHandler) => {
    return <ArrowButton position="right" onClick={onClickHandler} />;
  };

  render() {
    const { home } = this.props;
    const movies = home.sliderMovies;
    const { slidingInterval } = this.state;

    return (
      <div className={style.carousel_wrapper}>
        {movies.length > 0 && (
          <Slider
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows
            centerMode
            interval={slidingInterval}
            infiniteLoop
            autoPlay
            onChange={this.handleSlideChange}
            onClickItem={this.handleSlideChange}
            renderArrowPrev={this.renderPrevArrow}
            renderArrowNext={this.renderNextArrow}
          >
            {movies.map(this.renderItem)}
          </Slider>
        )}
      </div>
    );
  }
}

export { MoviesCarousel };
