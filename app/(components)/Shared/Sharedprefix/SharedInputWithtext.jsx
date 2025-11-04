import SharedInput from "../SahredInput/SharedInput";
import { prefix } from "../SharedForm/SharedFrForm";
import SharedPrefix from "./SharedPrefix";

const SharedInputWithtext = ({
  numberprefix,
  placeholder,
  width = " top-[6rem] w-[90px]",
  gap = "gap-6",
  customStyle = "py-[16px]",
  onPrefixSelect,
  id,
  name,
  type,
  onChange,
  value,
}) => {
  return (
    <>
      <div className={`grid grid-cols-12 ${gap} mt-[16px]`}>
        <div className="col-span-3 lg:col-span-12">
          <SharedPrefix
            data={prefix}
            absoluteClass={` ${width}  left-2  `}
            roundedPrefix={`rounded-[10px] lg:py-[16px]`}
            numberprefix={numberprefix}
            onSelect={onPrefixSelect}
          />
        </div>
        <div className="col-span-9 lg:col-span-12 md:mt-[10px]">
          <SharedInput
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            customStyle={`w-full px-[13px] ${customStyle} rounded-[10px] placeholder:text-[16px]`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};

export default SharedInputWithtext;
