import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { az } from "date-fns/locale";
import { enUS } from "date-fns/locale";
import { ru } from "date-fns/locale";
import { usePathname } from "next/navigation";

const SharedDataPicker = ({
  form_type,
  text,
  onChange,
  customClass,
  customStyle,
}) => {
  const localeMap = {
    az,
    en: enUS,
    ru,
  };
  const pathname = usePathname();
  const lang = pathname.split("/")[1]; // az, en, ru gibi
  const dateLocale = localeMap[lang] || az;
  return (
    <>
      <div className="w-full relative ">
        <DatePicker
          selected={form_type ? new Date(form_type) : null}
          onChange={onChange}
          placeholderText={text}
          dateFormat="dd.MM.yyyy"
          showMonthDropdown
          locale={dateLocale}
          showYearDropdown
          dropdownMode="select"
          className={customClass}
        />
        <img src={`/form/date.svg`} alt="date" className={customStyle} />
      </div>
    </>
  );
};

export default SharedDataPicker;
