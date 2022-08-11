import React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Col, Container, Row, ProgressBar } from 'react-bootstrap';

import DropZone from './widgets/DropZone';
import { ButtonContainer } from './widgets/Button';

import { Chip } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  CustomTextField,
  GreenCheckbox,
  LanguagesSelect,
} from './widgets/Field';

import { NEWS, SINGLE_VIDEO } from '../constants/types';

import style from '../../styles/dropZone.module.css';

@inject('uploadNews', 'auth')
@observer
class UploadNews extends React.Component {
  handleChangeText = (event) => {
    this.props.uploadNews.setDataVideo(event.target.value, event.target.id);
  };
  handleChangeCheckbox = (event) => {
    this.props.uploadNews.setDataVideo(event.target.checked, event.target.id);
  };
  setEnabled = (key, enabled) => {
    this.props.uploadNews.setEnabledTag(key, enabled);
  };

  render() {
    let storeUpload = this.props.uploadNews;

    return (
      <Container fluid id={style.settings_background}>
        <Row className="p-5 bg-light-gray">
          <Col md={10} className="mx-auto bg-white p-5">
            <Row>
              <Col md={6}>
                <h2 className="text-dark">Upload News</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} className="mt-2 mr-4">
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
              <Col md={6}>
                <Form>
                  <Form.Row>
                    <Col md={5}>
                      <CustomTextField
                        id="title"
                        fullWidth
                        error={!storeUpload.validated.title}
                        label="title"
                        helperText={
                          !storeUpload.validated.title ? 'Incorrect title' : ''
                        }
                        value={storeUpload.dataVideo.title}
                        onChange={this.handleChangeText}
                      />
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                      <CustomTextField
                        id="description"
                        fullWidth
                        error={!storeUpload.validated.description}
                        label="description"
                        helperText={
                          !storeUpload.validated.description
                            ? 'Incorrect title'
                            : ''
                        }
                        value={storeUpload.dataVideo.description}
                        onChange={this.handleChangeText}
                      />
                    </Col>
                  </Form.Row>
                  <h6 className="mt-5 text-dark">Tags</h6>

                  <Form.Row className="mt-3 mb-5">
                    {storeUpload.tagsVideo.map((tag) => {
                      return (
                        <div key={tag.key}>
                          <Chip
                            className={`${
                              tag.enabled ? 'bg-success' : 'bg-default'
                            } text-white mr-1 mt-1`}
                            onClick={(e) =>
                              this.setEnabled(tag.key, !tag.enabled)
                            }
                            label={tag.label}
                          />
                        </div>
                      );
                    })}
                  </Form.Row>
                  <LanguagesSelect
                    value={storeUpload.languages}
                    handleChange={(event) =>
                      storeUpload.setLanguages(event.target.value)
                    }
                  />

                  <Form.Row className="mt-3">
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          id="allow_download"
                          checked={storeUpload.dataVideo.allow_download}
                          onChange={this.handleChangeCheckbox}
                          name="checkedG"
                        />
                      }
                      label="Allow Downloads"
                    />
                  </Form.Row>
                  <Form.Row className="mb-5">
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          id="allow_comments"
                          checked={storeUpload.dataVideo.allow_comments}
                          onChange={this.handleChangeCheckbox}
                          name="checkedG"
                        />
                      }
                      label="Allow comments & reviews"
                    />
                  </Form.Row>

                  <ButtonContainer
                    color="primary"
                    onClick={(e) =>
                      !storeUpload.loading
                        ? storeUpload.uploadNews(SINGLE_VIDEO)
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
  }
}

export default UploadNews;
