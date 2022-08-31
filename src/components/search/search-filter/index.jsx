import React from 'react';
import { inject, observer } from 'mobx-react';

import { FiltersModal } from '../filters-modal';

export const SearchFilter = (props) => {
  const { search, ui } = props;

  return (
    <>
      <FiltersModal />

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="font-weight-bold text text_typography_headline-xl">
          {search.searchWord
            ? `Search results for «${search.searchWord}»`
            : 'Explore'}
        </h1>

        <div className="filter-form d-flex">
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={ui.openDialog}
          >
            <span className="filter-form__filter-icon icon icon_name_filter mr-1" />
            Filter
          </button>
        </div>
      </div>
    </>
  );
};
