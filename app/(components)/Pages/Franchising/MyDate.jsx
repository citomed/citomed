"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";
const customRange = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill(0)
    .map((_, idx) => start + idx * step);
};

const MyDate = ({ mytarix }) => {
  const [startDate, setStartDate] = useState(new Date());

  const currentYear = new Date().getFullYear() + 5;

  const years = customRange(2000, currentYear);

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avqust",
    "Senrtabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const handleDateChange = (date) => {
    setStartDate(date);
    mytarix = startDate.toLocaleDateString("az-AZ");
  };

  return (
    <div className="p-4">
      <DatePicker
        renderCustomHeader={({
          date, // Bu bir JavaScript Date objesidir
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            className=""
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Dikeyde ortalamak için
            }}
          >
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button" // Buton tipi belirtmek iyi bir pratiktir
              className="px-2 py-1 border rounded-md mr-2 hover:bg-gray-100 " // Basit stil
            >
              {"<"}
            </button>
            <select
              value={date.getFullYear()} // date.getFullYear() kullanın
              onChange={({ target: { value } }) => changeYear(Number(value))} // Gelen değer string, Number'a çevirin
              className="p-1 border rounded-md mx-1 " // Basit stil
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[date.getMonth()]} // date.getMonth() kullanın (0-11 arası döner)
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className="p-1 border rounded-md mx-1 " // Basit stil
            >
              {months.map((option) => (
                <option key={option} value={option} className="">
                  {option}
                </option>
              ))}
            </select>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="px-2 py-1 border rounded-md ml-2 hover:bg-gray-100" // Basit stil
            >
              {">"}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={handleDateChange} // Güncellenmiş handler
        dateFormat="dd/MM/yyyy" // İstediğiniz tarih formatı
        className="p-2 border rounded-md w-full max-w-xs " // Inputa stil
        placeholderText="Tarih seçin"
        // Türkçe lokalizasyon için date-fns ile birlikte kullanabilirsiniz
        locale={az} // Eğer `import tr from 'date-fns/locale/tr';` ve `registerLocale` yapıldıysa
      />
    </div>
  );
};

export default MyDate;
