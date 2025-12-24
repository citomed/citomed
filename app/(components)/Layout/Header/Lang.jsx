import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Lang = ({ toggle, switchLang, langs, scrolledFromTop }) => {
  const [language, setLanguage] = useState("az");
  const [selectedLangs, setSelectedLangs] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // pathname'den dili alırken artık dikkatli olmalıyız.
    // Eğer path '/hizmetler' ise split[1] 'hizmetler' olur.
    const pathSegments = pathname.split("/").filter(Boolean); // boşlukları temizle
    const firstSegment = pathSegments[0];

    // Eğer ilk segment 'en' veya 'ru' gibi bir dilse onu al, yoksa 'az' varsay.
    const pathLang = langs.includes(firstSegment) ? firstSegment : "az";

    const savedLang = localStorage.getItem("citomed") || "az";
    const validLang = langs.includes(pathLang) ? pathLang : savedLang;

    if (validLang !== language) {
      setLanguage(validLang);
      localStorage.setItem("citomed", validLang);
    }
  }, [pathname, language, langs]);

  useEffect(() => {
    setSelectedLangs(langs.filter((lang) => lang !== language));
  }, [language, langs]);

  const langSwitcher = async (targetLang) => {
    setLanguage(targetLang);
    localStorage.setItem("citomed", targetLang);

    // URL'yi temizle ve yeni dili ayarla
    let cleanPath = pathname;

    // Eğer URL şu an bir dil prefixi içeriyorsa (en/hizmetler), onu çıkar
    // langs dizisindeki herhangi biriyle başlıyorsa kes
    for (const l of langs) {
      if (cleanPath.startsWith(`/${l}/`) || cleanPath === `/${l}`) {
        cleanPath = cleanPath.replace(`/${l}`, "");
      }
    }

    // Eğer cleanPath boş kaldıysa (anasayfa ise) '/' yap
    if (!cleanPath) cleanPath = "/";

    // Yeni URL oluştur
    if (targetLang === "az") {
      // AZ ise prefix ekleme
      router.replace(`${cleanPath}`);
    } else {
      // Diğer diller ise prefix ekle. Eğer cleanPath '/' ise çift slash olmasın diye kontrol et
      const newPath =
        cleanPath === "/" ? `/${targetLang}` : `/${targetLang}${cleanPath}`;
      router.replace(newPath);
    }

    toggle(false);
  };

  return (
    // ... JSX kısmı aynı kalabilir ...
    <div className="relative text-black px-4 py-1 ">
      <div
        onClick={toggle}
        className="flex items-center cursor-pointer justify-center"
      >
        <button
          className={` capitalize text-[18px] md:text-[14px] ${
            scrolledFromTop ? "text-[#fff]" : "text-[#000]"
          }`}
        >
          {language}
        </button>
        <p
          className={`flex pl-3 ${
            scrolledFromTop ? "text-[#fff]" : "text-[#000]"
          }`}
        >
          {/* <FaAngleDown className="w-[25px] h-[14px]" /> */}
        </p>
      </div>
      {switchLang && (
        <div className="absolute mt-6 top-[2.8rem] left-[-9px]  flex flex-col text-left items-center justify-center bg-[--bg-f6] border border-[--bg-55] rounded-[10px]">
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
