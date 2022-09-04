import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuItem, Fade } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';

export const SeriesControls = ({
  seriesData,
  allEpisodes,
  onSelectEpisode,
  onSelectSeason,
}) => {
  const didMountRef = useRef(false);
  const [currentSeason, setCurrentSeason] = useState(
    seriesData.seasons.filter((season) => Boolean(season.season) !== false)[0]
      .season,
  );
  const [currentEpisode, setCurrentEpisode] = useState({
    number: seriesData.episodes[0].series,
    season: '1',
  });
  const [currentEpisodeID, setCurrentEpisodeID] = useState(
    seriesData.episodes[0].id,
  );

  const [anchorSeason, setAnchorSeason] = useState(false);
  const [anchorEpisode, setAnchorEpisode] = useState(false);

  useEffect(() => {
    if (didMountRef.current) {
      onSelectSeason({
        season: currentSeason,
        episode: currentEpisode.number,
      });
    } else {
      didMountRef.current = true;
    }
  }, [currentSeason]);

  useEffect(() => {
    if (didMountRef.current) {
      onSelectEpisode({
        episode_id: currentEpisodeID,
      });
    } else {
      didMountRef.current = true;
    }
  }, [currentEpisode]);

  const handleClickSeasonButton = (event) => {
    setAnchorSeason(event.currentTarget);
  };

  const handleClickEpisode = (event) => {
    setAnchorEpisode(event.currentTarget);
  };

  const handleSelectSeason = (season, episode, episode_id) => {
    setCurrentSeason(season);
    setCurrentEpisode({ number: episode, season: season });
    setCurrentEpisodeID(episode_id);

    handleClose();
  };
  const handleSelectEpisode = (series, id) => {
    setCurrentEpisode({ number: series, season: currentEpisode.season });
    setCurrentEpisodeID(id);

    return handleClose();
  };

  const handleClose = () => {
    setAnchorSeason(null);
    setAnchorEpisode(null);
  };

  const getFirstEpisodeFromSeason = (season, allEpisodes) => {
    const seasons = {};

    allEpisodes.forEach((episode) => {
      if (Object.keys(seasons).includes(`${episode.season}`)) {
        return seasons[`${episode.season}`].push(episode);
      } else {
        return (seasons[`${episode.season}`] = [episode]);
      }
    });

    return seasons[`${season}`][0].id;
  };

  const seasonList = seriesData.seasons.filter(
    (season) => Boolean(season.season) !== false,
  );

  const seasonsItems = seasonList.map((season, index) => {
    return (
      <MenuItem
        key={index}
        onClick={() => {
          handleSelectSeason(
            season.season,
            '1',
            getFirstEpisodeFromSeason(season.season, allEpisodes),
          );
        }}
      >
        Season {season.season}
      </MenuItem>
    );
  });

  const episodesItems =
    currentEpisode.number &&
    seriesData.episodes.map((episode, index) => {
      return (
        <MenuItem
          key={index}
          onClick={() => {
            handleSelectEpisode(episode.series, episode.id);
          }}
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
            style={{ background: '#28a745' }}
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
            style={{ background: '#28a745' }}
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={handleClickEpisode}
            endIcon={<ArrowDropDown />}
          >
            Episode {currentEpisode.number}
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
