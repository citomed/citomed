"use client";
import { useState, useRef, useEffect } from "react";
import H2Text from "../Texts/H2Text";

const DcotorsCategory = ({
  categoriesData,
  selectedCategoryId,
  onCategorySelect,
  doctor_cats
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const dropdownListRef = useRef(null);

  useEffect(() => {
    if (dropdownOpen && dropdownListRef.current) {
      setContentHeight(dropdownListRef.current.scrollHeight);
    }
  }, [dropdownOpen, categoriesData]);

  const handleSelectInternal = (id) => {
    onCategorySelect(id);
    setDropdownOpen(false);
  };

  const currentSelection = categoriesData?.find(
    (cur) => cur?.id === selectedCategoryId
  );
  
  const displayText = currentSelection
    ? currentSelection.categoryName
    : doctor_cats;

  return (
    <div className="relative border border-[--bg-55] py-[19px] px-[24px] rounded-[60px] w-[384px] mb-8">
      <div
        className="w-full cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-controls="doctors-dropdown-list"
      >
        <div className="flex justify-between items-center">
          <H2Text
            text={displayText}
            customStyle={`text-[16px] lg:text-[14px] font-['SFProText-Medium'] text-[--color-blue] capitalize`}
          />
          <span>
            <img
              src="/down.svg"
              className={`transition-transform duration-300 ease-in-out ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              alt={doctor_cats}
            />
          </span>
        </div>
      </div>

      <ul
        id="doctors-dropdown-list"
        ref={dropdownListRef}
        style={{
          maxHeight: dropdownOpen ? `${contentHeight}px` : "0px",
        }}
        className={`absolute top-[calc(100%_+_3px)] left-0 right-0 w-full 
                   bg-white  border-[--bg-55] border z-20 rounded-b-[20px] rounded-t-[20px] shadow-lg
                   overflow-hidden transition-all duration-500 ease-in-out
                   ${
                     dropdownOpen
                       ? "opacity-100"
                       : "opacity-0 pointer-events-none"
                   }`}
      >
        {categoriesData &&
          categoriesData?.map((cur) => (
            <li
              key={cur.id === null ? "all-categories" : cur.id}
              className={`px-[25px] py-[10px] transition-colors duration-150 ease-in-out hover:bg-[--bg-55] cursor-pointer
                          ${
                            selectedCategoryId === cur.id
                              ? "bg-[--bg-55]  font-['SFProText-Medium']"
                              : ""
                          }`}
              onClick={() => handleSelectInternal(cur.id)}
              role="option"
              aria-selected={selectedCategoryId === cur.id}
            >
              <H2Text
                text={cur.categoryName}
                customStyle={`capitalize text-[16px] lg:text-[14px] font-[500] text-[--color-blue]`}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DcotorsCategory;
