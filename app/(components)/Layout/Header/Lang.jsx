import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

const Lang = ({ toggle, switchLang, langs, scrolledFromTop }) => {
  const [language, setLanguage] = useState("az");
  const [selectedLangs, setSelectedLangs] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  // URL'den veya LocalStorage'dan dili belirle
  useEffect(() => {
    const pathLang = pathname.split("/")[1];
    const savedLang = localStorage.getItem("citomed") || "az";
    const validLang = langs.includes(pathLang) ? pathLang : savedLang;

    if (validLang !== language) {
      setLanguage(validLang);

      localStorage.setItem("citomed", validLang);
    }
  }, [pathname, language, langs]);

  // Seçilen dili filtrele
  useEffect(() => {
    setSelectedLangs(langs.filter((lang) => lang !== language));
  }, [language, langs]);

  // Dil değiştir ve URL'yi güncelle
  const langSwitcher = async (lang) => {
    setLanguage(lang);
    localStorage.setItem("citomed", lang);

    // URL'deki mevcut path'i koruyarak sadece dili değiştir
    const currentPath = pathname.split("/").slice(2).join("/") || "";
    router.replace(`/${lang}/${currentPath}`);
    toggle(false);
  };

  return (
    <div className="relative text-black px-4 py-1 ">
      <div
        onClick={toggle}
        className="flex items-center cursor-pointer justify-center"
      >
        <button
          className={` capitalize text-[18px] md:text-[14px] ${
            scrolledFromTop ? "text-[#fff]" : "text-[--text]"
          }`}
        >
          {language}
        </button>
        <p className="flex pl-3">
          <FaAngleDown
            className={` ${scrolledFromTop ? "text-[#fff]" : "text-[--text]"}`}
          />
        </p>
      </div>
      {switchLang && (
        <div className="absolute mt-6 top-[2.3rem] left-[-9px]  flex flex-col text-left items-center justify-center bg-[--bg-f6] border border-[--bg-55] rounded-[10px]">
          {selectedLangs?.map((lang, index) => (
            <button
              className="text-[--text] z-[50] capitalize text-[18px] hover:text-[--bg-55] langText xl:text-[13px] transitions  py-1   trans h-12 w-[80px] flex justify-center items-center"
              key={index}
              onClick={() => langSwitcher(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lang;
