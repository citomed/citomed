import React from "react";

const H2Text = ({ customStyle, text, long_text = "" }) => {
  return (
    <div
      className={`  ${customStyle}`}
      title={`${long_text}`}
      dangerouslySetInnerHTML={{ __html: `${text}` }}
    />
  );
};

export default H2Text;
