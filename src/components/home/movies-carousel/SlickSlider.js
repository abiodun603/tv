import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled, { withTheme } from 'styled-components';
import {
  compose,
  flexbox,
  palette,
  spacing,
  typography,
  display,
} from '@material-ui/system';
import Slider from 'react-slick';
import { useMediaQuery } from '@material-ui/core';
import { Container } from 'react-bootstrap';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BannerCard from '../../Card/CardBanner';
import style from './movies-carousel.module.scss';

const Box = styled('div')(
  compose(display, flexbox, spacing, palette, typography),
);

const MoviesCarousel = inject('home')(
  observer(
    withTheme((props) => {
      const { home: homeStore, theme } = props;
      const movies = homeStore.sliderMovies;
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoPlay: true,
        autoPlaySpeed: 3000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

      useEffect(() => {
        homeStore.getCarouselMovies();
      }, []);

      return (
        <div className={style.carousel_wrapper} id="jumbotron_search">
          <Container>
            <Box fontSize={64} lineHeight={1}>
              All Your Favorite Movies <br />
              In One Place
            </Box>
            <Box my={2} color={theme.palette.grey.white60}>
              Watch thousands of amazing movies and TV shows. Available
              Anywhere.
            </Box>
            {movies.length > 0 && (
              <Box mt={10}>
                <Slider {...settings}>
                  {movies.map((movie, index) => (
                    <div key={index}>
                      <Box mx={1}>
                        <BannerCard
                          video={movie}
                          full
                          className="transparent-bg"
                        />
                      </Box>
                    </div>
                  ))}
                </Slider>
              </Box>
            )}
          </Container>
        </div>
      );
    }),
  ),
);

export { MoviesCarousel };
