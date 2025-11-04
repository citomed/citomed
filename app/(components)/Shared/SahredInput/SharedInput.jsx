import React from "react";

const SharedInput = ({
  text = "",
  type,
  placeholder,
  id,
  name,
  value,
  ngClass,
  customStyle = "",
  customClass,
  onChange,
}) => {
  return (
    <div className={ngClass}>
      {text && (
        <label htmlFor={id} className={customClass}>
          {text}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${customStyle} outline-none text-[16px]`}
      />
    </div>
  );
};

export default SharedInput;
