import React, { ChangeEventHandler, InputHTMLAttributes, useMemo } from 'react';

let id = 0;

function getUniqueID() {
  return `CheckBox_id${id++}`;
}

export const CheckBox = ({ title, checked, onChange }) => {
  const htmlID = useMemo(() => {
    return getUniqueID();
  }, []);

  return (
    <div className="custom-control custom-checkbox mr-5 mb-3">
      <input
        checked={checked}
        type="checkbox"
        className="custom-control-input"
        id={htmlID}
        onChange={onChange}
      />
      <label
        className="custom-control-label text text_view_secondary"
        htmlFor={htmlID}
      >
        {title}
      </label>
    </div>
  );
};
