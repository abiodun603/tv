import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import MenuItem from '@material-ui/core/MenuItem';
import { CustomTextField, LanguagesSelect } from '../../widgets/Field';

import listYear from '../../../utils/lists/listYear';

import * as docClasses from '../../../utils/document/classes';
import { CheckBox } from '../../ui/checkbox';
import { Tag } from '../../ui/tag';

const years = listYear();

@inject('ui', 'search')
@observer
export class FiltersModal extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      ui: { isOpenDialog },
    } = this.props;

    if (isOpenDialog) {
      docClasses.addClassToBody('modal-open');
    } else {
      docClasses.removeClassFromBody('modal-open');
    }
  }

  componentWillUnmount() {
    docClasses.removeClassFromBody('modal-open');
  }

  changeYearFrom = (event) => {
    this.props.search.setFromYear(event.target.value);
  };

  changeYearTo = (event) => {
    this.props.search.setToYear(event.target.value);
  };

  applyFilter = () => {
    this.props.ui.closeDialog();
    this.props.search.apply();
  };

  resetFilter = () => {
    this.props.ui.closeDialog();
    this.props.search.reset();
  };

  close = () => {
    this.props.ui.closeDialog();
  };

  setEnabled = (key, enabled) => {
    this.props.search.setEnabledTag(key, enabled);
  };

  handleChangeCheckbox = (event) => {
    this.props.search.setDownloadVideo(event.target.checked);
  };

  handleChangeLanguages = (event) => {
    this.props.search.setLanguages(event.target.value);
  };

  render() {
    const { ui, search } = this.props;

    if (!ui.isOpenDialog) {
      return null;
    }

    return (
      <div className="modal modal_theme_full d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered container">
          <button
            type="button"
            className="modal__close close close_size_l"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.close}
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-content">
            <h1 className="font-weight-bold text text_typography_headline-xl mb-4">
              Filters
            </h1>
            <div className="font-weight-bold mb-3">Category</div>

            <div className="d-flex flex-wrap mb-4">
              {search.tagsVideo.map((tag) => {
                return (
                  <Tag
                    key={tag.key}
                    title={tag.label}
                    active={tag.enabled}
                    onClick={() => this.setEnabled(tag.key, !tag.enabled)}
                  />
                );
              })}
            </div>

            <div className="font-weight-bold mb-3">Release Year</div>

            <Row className="mb-4">
              <Col md={2} sm={3} className="mb-2">
                <CustomTextField
                  select
                  label="From"
                  fullWidth
                  value={search.from_year}
                  onChange={this.changeYearFrom}
                >
                  {years.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Col>

              <Col md={2} sm={3} className="mb-2">
                <CustomTextField
                  select
                  label="To"
                  fullWidth
                  value={search.to_year}
                  onChange={this.changeYearTo}
                >
                  {years.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Col>
            </Row>

            <div className="d-flex flex-wrap mb-4">
              <CheckBox
                title="Can be downloaded"
                checked={search.allow_download}
                onChange={this.handleChangeCheckbox}
              />
            </div>

            <div className="d-flex flex-wrap mb-4">
              <LanguagesSelect
                handleChange={(e) => this.handleChangeLanguages(e)}
                value={search.languages ? search.languages : []}
              />
            </div>

            <div className="row">
              <div className="col col-sm-3">
                <button
                  className="btn btn-outline-primary btn-block btn-lg"
                  type="button"
                  onClick={this.resetFilter}
                >
                  Reset
                </button>
              </div>
              <div className="col col-sm-3">
                <button
                  className="btn btn-primary btn-block btn-lg"
                  type="button"
                  onClick={this.applyFilter}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
