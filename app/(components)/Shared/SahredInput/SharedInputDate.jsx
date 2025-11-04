"use client"; // Bu faylın Client Component olduğunu bildirir

import { useRef, useEffect } from "react";
import styles from "./DateInputWithPlaceholder.module.css"; // CSS modulu üçün
import Image from "next/image";

export default function DateInputWithPlaceholder({
  id,
  type,
  type2,
  privateDate,
  label,
  placeholderText = "Tarix seçin", // Defolt placeholder
  initialValue = "",
  onChange,
  className = "",
  inputClass = "",
  src,
  value,
  ...props // Digər input atributları üçün
}) {
  const inputRef = useRef(null);
  const icon_date = useRef();

  useEffect(() => {
    // Komponent yüklənəndə, əgər initialValue varsa və input hələ text tipindədirsə,
    // tipi 'date' et. Bu, form submitdən sonra və ya edit zamanı dəyərin düzgün görünməsi üçündür.
    if (inputRef.current && initialValue && inputRef.current.type === type) {
      // inputRef.current.value = initialValue; // Bu artıq defaultValue ilə təmin olunur
      inputRef.current.type = type2;
      inputRef.current.placeholder = ""; // Date tipində placeholder olmur
    } else if (inputRef.current && !inputRef.current.value) {
      // Əgər dəyər yoxdursa və tip text deyilsə, textə qaytar
      inputRef.current.type = type;
      inputRef.current.placeholder = placeholderText;
    }
  }, [initialValue, placeholderText]); // initialValue və ya placeholderText dəyişdikdə yenidən işləsin

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.type = type2;
      inputRef.current.placeholder = ""; // Date tipində text placeholder-i silirik
    }
    icon_date.current.classList.add("hidden");
  };

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.value) {
      inputRef.current.type = type2;
      icon_date.current.classList.remove("hidden");
      inputRef.current.placeholder = placeholderText;
    }
  };

  return (
    <div className={`${styles.inputGroup} ${className}  cursor-pointer`}>
      <input
        ref={inputRef}
        id={privateDate}
        name={privateDate}
        type={type} // İlkin olaraq text
        value={value}
        placeholder={placeholderText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={initialValue} // Uncontrolled component üçün ilkin dəyər
        onChange={onChange} // Əgər controlled component kimi istifadə etmək istəsəniz
        className={`${styles.dateInput} ${inputClass}`}
        {...props} // Digər propsları (required, disabled vs.) ötür
      />
      <Image
        ref={icon_date}
        width={18}
        height={20}
        src={src}
        className="absolute right-5 top-[50%] translate-y-[-50%] icon_date"
      />
    </div>
  );
}
