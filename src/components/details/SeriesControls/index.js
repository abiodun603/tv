import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuItem, Fade } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';

export const SeriesControls = ({
  currentSeason,
  currentEpisode,
  seasons,
  episodes,
  onSelectEpisode,
  onSelectSeason,
}) => {
  const [anchorSeason, setAnchorSeason] = useState(false);
  const [anchorEpisode, setAnchorEpisode] = useState(false);

  const handleClickSeasonButton = (event) => {
    setAnchorSeason(event.currentTarget);
  };

  const handleClickEpisode = (event) => {
    setAnchorEpisode(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorSeason(false);
    setAnchorEpisode(false);
  };

  const seasonsItems = seasons.map((season, index) => {
    return (
      <MenuItem
      key={`season_${index}`}
        onClick={() => onSelectSeason(season.season)}
      >
        Season {season.season}
      </MenuItem>
    );
  });

  const episodesItems =
    episodes.map((episode, index) => {
      return (
        <MenuItem
          key={`episode_${index}`}
          onClick={() => onSelectEpisode(episode)}
        >
          Episode {episode.series}
        </MenuItem>
      );
    });

  return (
    <Container className="mb-3">
      <Row>
        <Col>
          <Button
            style={{ background: '#28a745', color: 'white' }}
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={handleClickSeasonButton}
            endIcon={<ArrowDropDown />}
          >
            Season {currentSeason}
          </Button>
          <Menu
            id="select-season"
            anchorEl={anchorSeason}
            keepMounted
            open={Boolean(anchorSeason)}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {seasonsItems}
          </Menu>{' '}
          <Button
            style={{ background: '#28a745', color: 'white' }}
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={handleClickEpisode}
            endIcon={<ArrowDropDown />}
          >
            Episode {currentEpisode?.series}
          </Button>
          <Menu
            id="select-episode"
            anchorEl={anchorEpisode}
            keepMounted
            open={Boolean(anchorEpisode)}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {episodesItems}
          </Menu>
        </Col>
      </Row>
    </Container>
  );
};
