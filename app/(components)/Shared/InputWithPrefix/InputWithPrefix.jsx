import React from "react";
import SharedPrefix from "../Sharedprefix/SharedPrefix";
import { prefix } from "../SharedForm/SharedFrForm";
import SharedInput from "../SahredInput/SharedInput";

const InputWithPrefix = ({
  type,
  id,
  name,
  value,
  onChange,
  customStyle,
  placeholder,
  customClass,
  gap,
  roundedPrefix,
  onPrefixSelect,
}) => {
  return (
    <>
      <div className={`grid grid-cols-12 ${gap}`}>
        <div className="col-span-3">
          <SharedPrefix
            data={prefix}
            numberprefix="(0XX)"
            absoluteClass={"left-[2rem] w-[120px]"}
            roundedPrefix={roundedPrefix}
            onSelect={onPrefixSelect}
          />
        </div>
        <div className="col-span-9">
          <SharedInput
            customStyle={`w-full px-[13px] ${customClass} py-[16px] placeholder:text-[16px]`}
            placeholder={placeholder}
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={customStyle}
          />
        </div>
      </div>
    </>
  );
};

export default InputWithPrefix;
