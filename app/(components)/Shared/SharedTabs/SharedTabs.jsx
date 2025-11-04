"use client";

import { useCallback, useEffect, useRef, useState } from "react";
const SharedTabs = ({
  customStyle,
  tab1name,
  tab2Name,
  h2Class,
  activeTabClass,
  tab1Content,
  tab2Content,
  data1,
  data2,
}) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [sliderStyle, setSliderStyle] = useState({
    width: 0,
    left: 0,
    height: 0, // Hündürlüyü də əlavə edirik
    opacity: 0, // Başlanğıcda görünməz olsun
  });
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tabsContainerRef = useRef(null);

  const updateSlider = useCallback(() => {
    if (!tabsContainerRef.current) return;

    let activeTabElement;
    if (activeTab === "tab1" && tab1Ref.current) {
      activeTabElement = tab1Ref.current;
    } else if (activeTab === "tab2" && tab2Ref.current) {
      activeTabElement = tab2Ref.current;
    }

    if (activeTabElement) {
      setSliderStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
        height: activeTabElement.offsetHeight, // Düymənin hündürlüyünü alırıq
        opacity: 1, // Görünən edirik
      });
    } else {
      // Heç bir tab aktiv deyilsə və ya tapılmasa (ehtimal azdır)
      setSliderStyle({ width: 0, left: 0, height: 0, opacity: 0 });
    }
  }, [activeTab]);
  useEffect(() => {
    // İlk yüklənmədə və aktiv tab dəyişdikdə kiçik bir gecikmə ilə yeniləyək
    // ki, elementlər DOM-da tam yerləşsin.
    const timer = setTimeout(() => {
      updateSlider();
    }, 50); // 50ms gecikmə, ehtiyac olarsa tənzimləyin
    return () => clearTimeout(timer);
  }, [updateSlider]);

  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    return () => {
      window.removeEventListener("resize", updateSlider);
    };
  }, [updateSlider]);

  return (
    <div className="flex flex-col ">
      {(Array.isArray(data1) && data1.length > 0) ||
      (Array.isArray(data2) && data2.length > 0) ? (
        <div className={`${customStyle}`} ref={tabsContainerRef}>
          <div className="flex items-center justify-center relative">
            <span
              aria-hidden="true"
              className={`absolute top-0 ${activeTabClass} transition-all duration-350 ease-in-out`}
              style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
                height: `${sliderStyle.height}px`,
                opacity: sliderStyle.opacity,
                zIndex: 0,
              }}
            />
            <div className="flex items-center justify-center relative">
              <button
                ref={tab1Ref}
                onClick={() => setActiveTab("tab1")}
                className={`${h2Class} relative z-10 transition-colors duration-300 ease-in-out`}
              >
                {tab1name}
              </button>
            </div>
            <button
              ref={tab2Ref}
              onClick={() => setActiveTab("tab2")}
              className={`${h2Class} relative z-10 transition-colors duration-300 ease-in-out`}
            >
              {tab2Name}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-[80px] 1xl:mt-[40px] md:mt-[20px]">
        <div
          className={`transition-all duration-500 ease-in-out   ${
            activeTab === "tab1"
              ? "opacity-100  visible  "
              : "opacity-0 max-h-0 invisible overflow-hidden "
          }`}
        >
          {tab1Content}
        </div>
        <div
          className={`transition-all duration-500 ease-in-out  ${
            activeTab === "tab2"
              ? "opacity-100 visible "
              : "opacity-0 max-h-0 invisible overflow-hidden "
          }`}
        >
          {tab2Content}
        </div>
      </div>
    </div>
  );
};

export default SharedTabs;
