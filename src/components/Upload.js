import React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Col, Row, ProgressBar } from 'react-bootstrap';
import DropZone from './widgets/DropZone';

import { Chip, useMediaQuery, Container } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ButtonContainer } from './widgets/Button';
import {
  CustomTextField,
  GreenCheckbox,
  LanguagesSelect,
} from './widgets/Field';

import style from '../../styles/dropZone.module.css';

import { SINGLE_VIDEO } from '../constants/types';

const Upload = inject(
  'upload',
  'auth',
)(
  observer((props) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    let storeUpload = props.upload;
    const handleChangeText = (event) => {
      props.upload.setDataVideo(event.target.value, event.target.id);
    };
    const handleChangeCheckbox = (event) => {
      props.upload.setDataVideo(event.target.checked, event.target.id);
    };
    const setEnabled = (key, enabled) => {
      props.upload.setEnabledTag(key, enabled);
    };

    return (
      <Container id={style.settings_background}>
        <Row className={`bg-light-gray ${isMobile ? 'pb-5' : 'py-5'}`}>
          <Col xs={12} className={`bg-white ${isMobile ? 'px-2 py-5' : 'p-5'}`}>
            <Row>
              <Col lg={6}>
                <h2 className="text-dark">Upload Video</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={6} className="mt-2 mr-4 mb-4">
                <div className={style.root}>
                  {storeUpload.file !== null ? (
                    <Container>
                      <Row>
                        {!storeUpload.loading ? (
                          <Col className="d-flex justify-content-center">
                            <Chip
                              label={storeUpload.file.name}
                              onDelete={storeUpload.removeFile}
                            />
                          </Col>
                        ) : (
                          <Col>
                            <p className={style.fileName_progress}>
                              {storeUpload.file.name}
                            </p>
                            <ProgressBar
                              label={`${storeUpload.progress}%`}
                              animated
                              variant="success"
                              now={storeUpload.progress}
                            />
                          </Col>
                        )}
                      </Row>
                    </Container>
                  ) : (
                    <DropZone upload={storeUpload} />
                  )}
                </div>
              </Col>
              <Col lg={6} className={`mb-4 ${isMobile ? 'px-2' : 'px-5'}`}>
                <Form>
                  <Row>
                    <Col md={5} className="mb-2">
                      <CustomTextField
                        id="title"
                        fullWidth
                        error={!storeUpload.validated.title}
                        label="Title"
                        helperText={
                          !storeUpload.validated.title ? 'Incorrect title' : ''
                        }
                        value={storeUpload.dataVideo.title}
                        onChange={handleChangeText}
                      />
                    </Col>
                    <Col md={{ span: 5, offset: 1 }} className="mb-2">
                      <CustomTextField
                        id="description"
                        fullWidth
                        error={!storeUpload.validated.description}
                        label="Description"
                        helperText={
                          !storeUpload.validated.description
                            ? 'Incorrect title'
                            : ''
                        }
                        value={storeUpload.dataVideo.description}
                        onChange={handleChangeText}
                      />
                    </Col>
                  </Row>
                  <h6 className="mt-5 text-dark">Tags</h6>

                  <div className="mt-3 mb-5 d-flex flex-wrap">
                    {storeUpload.tagsVideo.map((tag) => {
                      return (
                        <div key={tag.key}>
                          <Chip
                            className={`${
                              tag.enabled ? 'bg-success' : 'bg-default'
                            } text-white mr-1 mt-1`}
                            onClick={(e) => setEnabled(tag.key, !tag.enabled)}
                            label={tag.label}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <LanguagesSelect
                    value={storeUpload.languages}
                    handleChange={(event) =>
                      storeUpload.setLanguages(event.target.value)
                    }
                  />

                  <Row className="mt-3">
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          id="allow_download"
                          checked={storeUpload.dataVideo.allow_download}
                          onChange={handleChangeCheckbox}
                          name="checkedG"
                        />
                      }
                      label="Allow Downloads"
                    />
                  </Row>
                  <Row className="mb-5">
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          id="allow_comments"
                          checked={storeUpload.dataVideo.allow_comments}
                          onChange={handleChangeCheckbox}
                          name="checkedG"
                        />
                      }
                      label="Allow comments & reviews"
                    />
                  </Row>

                  <ButtonContainer
                    color="primary"
                    onClick={(e) =>
                      !storeUpload.loading
                        ? storeUpload.uploadVideo(SINGLE_VIDEO)
                        : storeUpload.cancel()
                    }
                    variant="contained"
                  >
                    {storeUpload.loading ? 'Cancel' : 'Submit'}
                  </ButtonContainer>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }),
);

export default Upload;
