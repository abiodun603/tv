import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuItem, Fade } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';

export const SeriesControlsMock = ({}) => {
  const [currentSeason, setCurrentSeason] = useState('1');
  const [currentEpisode, setCurrentEpisode] = useState('1');

  const [anchorSeason, setAnchorSeason] = useState(null);
  const [anchorEpisode, setAnchorEpisode] = useState(null);

  const seasonsItems = [].map((season, index) => {
    return (
      <MenuItem key={index} data-data={season.season}>
        Season {season.season}
      </MenuItem>
    );
  });

  const episodesItems =
    currentEpisode &&
    [].map((episode, index) => {
      return <MenuItem key={index}>Episode {episode.series}</MenuItem>;
    });

  return (
    <Container className="mb-3 px-0">
      <Row>
        <Col>
          <Button
            style={{ background: 'rgb(175 175 175)', color: 'white' }}
            variant="contained"
            color="primary"
            disableElevation
            disabled
            size="large"
            endIcon={<ArrowDropDown />}
          >
            Season {currentSeason}
          </Button>
          <Menu
            id="select-season"
            anchorEl={anchorSeason}
            keepMounted
            open={Boolean(anchorSeason)}
            TransitionComponent={Fade}
          >
            {seasonsItems}
          </Menu>{' '}
          <Button
            style={{ background: 'rgb(175 175 175)', color: 'white' }}
            variant="contained"
            color="primary"
            disableElevation
            disabled
            size="large"
            endIcon={<ArrowDropDown />}
          >
            Episode {currentEpisode}
          </Button>
          <Menu
            id="select-episode"
            anchorEl={anchorEpisode}
            keepMounted
            open={Boolean(anchorEpisode)}
            TransitionComponent={Fade}
          >
            {episodesItems}
          </Menu>
        </Col>
      </Row>
    </Container>
  );
};
