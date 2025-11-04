"use client";
import { useState, useRef, useEffect } from "react";
import H2Text from "../Texts/H2Text";

const SharedPrefix = ({
  data,
  roundedPrefix = "",
  numberprefix,
  absoluteClass,
  onSelect, // <-- Ekledik
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    selectedItem: "",
  });
  const [contentHeight, setContentHeight] = useState(0); // Kontentin hündürlüyü üçün state
  const dropdownListRef = useRef(null); // UL elementi üçün ref

  const handleSelect = (id) => {
    setForm({ selectedItem: id });
    setDropdownOpen(false);
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      onSelect(selectedItem.text); // Seçilen prefix'i üst komponent'e gönder
    }
  };

  // Dropdown açılanda və ya data dəyişəndə kontentin hündürlüyünü hesabla
  useEffect(() => {
    if (dropdownOpen && dropdownListRef.current) {
      setContentHeight(dropdownListRef.current.scrollHeight);
    }
    // Dropdown bağlananda contentHeight-i sıfırlamağa ehtiyac yoxdur,
    // çünki max-height: 0px inline style ilə onsuz da təyin olunacaq.
    // Amma istəsəniz else { setContentHeight(0); } əlavə edə bilərsiniz.
  }, [dropdownOpen, data]); // data dəyişəndə də hündürlüyü yenidən hesabla

  const selectedCategory = data?.find((cur) => cur.id === form.selectedItem);
  const displayText = selectedCategory
    ? selectedCategory.text
    : `${numberprefix}`;

  // Dropdown-u açıb-bağlamaq üçün funksiya
  // Bu, contentHeight-in düzgün zamanda hesablanmasına kömək edə bilər
  const toggleDropdown = () => {
    if (!dropdownOpen && dropdownListRef.current) {
      // Açılmadan dərhal əvvəl hündürlüyü yenidən ölçmək daha dəqiq nəticə verə bilər
      // xüsusilə data dinamik olaraq dəyişirsə və useEffect hələ işə düşməyibsə
      setContentHeight(dropdownListRef.current.scrollHeight);
    }
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className={`relative bg-[#fff] h-full ${roundedPrefix}`}>
        <div
          className="w-full cursor-pointer h-full"
          onClick={toggleDropdown} // toggleDropdown istifadə edin
          aria-expanded={dropdownOpen}
          aria-controls="doctors-dropdown-list"
        >
          <div className="flex justify-between items-center h-full px-5">
            <H2Text
              text={displayText}
              customStyle={`text-[16px] font-[500] text-[--color-blue]`}
            />
            <span>
              <img
                src="/down-blue.svg"
                className={`transition-transform duration-300 ease-in-out ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                alt="Kateqoriya seçin"
              />
            </span>
          </div>
        </div>

        <ul
          id="doctors-dropdown-list"
          ref={dropdownListRef} // Ref-i ul elementinə bağla
          style={{
            maxHeight: dropdownOpen ? `${contentHeight}px` : "0px", // Dinamik max-height
          }}
          className={`absolute ${absoluteClass}
                     bg-white border-b border-l border-r border-[--bg-55] z-10 rounded-b-[20px] shadow-lg
                     overflow-hidden transition-all duration-300 ease-in-out
                     ${
                       // Opacity və pointer-events class ilə idarə olunur
                       dropdownOpen
                         ? "opacity-100"
                         : "opacity-0 pointer-events-none"
                     }`}
        >
          {data &&
            data?.map((cur) => (
              <li
                key={cur.id}
                className={`px-[15px] py-[4px] transition-colors duration-150 ease-in-out hover:bg-gray-100 cursor-pointer ${
                  form.selectedItem === cur.id
                    ? "bg-[--bg-55]  font-['SFProText-Medium']"
                    : ""
                }`}
                onClick={() => handleSelect(cur.id)}
                role="option"
                aria-selected={form.selectedItem === cur.id}
              >
                <H2Text
                  text={cur.text}
                  customStyle={`capitalize text-[16px] font-[500] text-[--color-blue]`}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SharedPrefix;
