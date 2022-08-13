import React from 'react';

export const ArrowToolbar = ({
  canPrev = false,
  canNext = false,
  onPrev,
  onNext,
}) => {
  return (
    <div className="slider-control">
      <button
        type="button"
        className="slider-control__btn slider-control__btn_direction_left btn btn-outline-primary"
        disabled={!canPrev}
        onClick={onPrev}
      >
        <span className="icon icon_name_chevron" />
      </button>
      <button
        type="button"
        className="slider-control__btn slider-control__btn_direction_right btn btn-outline-primary"
        disabled={!canNext}
        onClick={onNext}
      >
        <span className="icon icon_name_chevron" />
      </button>
    </div>
  );
};
