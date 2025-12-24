"use client";
import Image from "next/image";
import Link from "next/link";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import Lang from "./Lang";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import MobileMenu from "./MobileMenu/MobileMenu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import { useRouter, useSearchParams } from "next/navigation";

const Header = ({ params, translate }) => {
  const [open, setOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  // === DÜZƏLİŞ BURADA BAŞLAYIR ===
  // Menyu linklərindən `params` (dil kodunu) çıxardıq.
  // DesktopMenu və MobileMenu onsuz da dinamik olaraq bunu əlavə edir.
  const menu = [
    {
      id: 1,
      title: `${translate?.home_page}`,
      href: `/`, // Sadəcə '/'
      subMenu: null,
    },
    {
      id: 2,
      title: `${translate?.about_page}`,
      href: null,
      subMenu: [
        {
          id: 1,
          title: `${translate?.about_page}`,
          href: `/haqqimizda`, // '/haqqimizda' (params olmadan)
        },
        {
          id: 2,
          title: `${translate?.leaders_address}`,
          href: `/rehberin-muracieti`,
        },
      ],
    },
    {
      id: 3,
      title: `${translate?.services}`,
      href: null,
      subMenu: [
        {
          id: 1,
          title: `${translate?.services}`,
          href: `/servisler`,
        },
        {
          id: 2,
          title: `${translate?.privateservives}`,
          href: `/ozel-xidmetler`,
        },
        {
          id: 3,
          title: `${translate?.chekcups}`,
          href: `/checkaplar`,
        },
        {
          id: 4,
          title: `${translate?.laboratory_tests}`,
          href: `/laboratoriya-testler`,
        },
      ],
    },
    {
      id: 4,
      title: `${translate?.doctors}`,
      href: `/hekimler`,
      subMenu: null,
    },
    {
      id: 5,
      title: `${translate?.news}`,
      href: `/xeberler`, // Sadəcə '/'
      subMenu: null,
    },
    {
      id: 6,
      title: `${translate?.contact}`,
      href: `/elaqe`,
      subMenu: null,
    },
  ];
  // === DÜZƏLİŞ BİTDİ ===

  const currentLang = params;
  const [scrolledFromTop, setScrollTop] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const mobileRef = useRef();
  const overlayDiv = useRef();
  const handleOpen = (name) => () => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler);
    }

    return function () {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, []);
  function scrollHandler(event) {
    if (typeof window !== "undefined") {
      window.pageYOffset >= 50 ? setScrollTop(true) : setScrollTop(false);
    }
  }

  let language;
  if (typeof window !== "undefined") {
    language = localStorage.getItem("citomed");
  }

  const langSwitcher = async () => {
    setOpen(false);
  };
  const langs = ["az", "en"];

  const langChecker = useCallback((lang = "az") => {
    if (typeof localStorage !== "undefined") {
      return lang !== localStorage.getItem("citomed");
    }
  }, []);

  const myLang = langs?.filter(langChecker);

  function openMobileMenu() {
    const menuClassList = mobileRef?.current?.classList;
    if (menuClassList?.contains("left-[-100%]")) {
      menuClassList?.replace("left-[-100%]", "left-0");
      overlayDiv?.current?.classList?.add("active");
    }
  }
  function closeMobileMenu() {
    const menuClassList = mobileRef?.current?.classList;
    if (menuClassList?.contains("left-0")) {
      menuClassList?.replace("left-0", "left-[-100%]");
      overlayDiv?.current?.classList?.remove("active");
    }
  }

  function openSearchInput() {
    setSearchVisible((prev) => !prev);
    setSearchInput("");
  }

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  //! SEARCH UCUN LAZIM OLAN KODLAR
  const searchInputRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState([]);
  const [xidmetler, setXidmetler] = useState([]);
  const [laboratorytests, setLaboratoryTests] = useState([]);
  const [teams, setTeams] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [career, setCareer] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search üçün URL yaradarkən prefix məntiqini tətbiq etmək lazımdır (əgər lazımsa)
  // Amma burada fetch URL-də params (dil kodu) lazımdır, o düzdür.
  useEffect(() => {
    const toLowerCase = searchInput.toLocaleLowerCase();
    if (searchInput && searchInput.trim() !== "") {
      setLoading(true);
      const delay = setTimeout(() => {
        fetch(
          `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/search?q=${toLowerCase}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCategory(data?.category);
            setXidmetler(data?.xidmetler);
            setLaboratoryTests(data?.laboratorytests);
            setTeams(data?.teams);
            setNews(data?.news);
            setBlogs(data?.blogs);
            setCareer(data?.career);
          })
          .finally(() => setLoading(false));
      }, 1000);

      return () => clearTimeout(delay);
    } else {
      setLoading(false);
      setCategory([]);
      setXidmetler([]);
      setLaboratoryTests([]);
      setTeams([]);
      setNews([]);
      setBlogs([]);
      setCareer([]);
    }
  }, [searchInput, params]);

  const createQueryString = useCallback(
    (name, value) => {
      const params =
        searchParams !== undefined
          ? new URLSearchParams(searchParams || undefined)
          : "";
      params?.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Search nəticəsində yönləndirmə edərkən URL-i düzəldirik
  // AZ -> /search/?q=...
  // EN -> /en/search/?q=...
  const urlPrefix = params === "az" ? "" : `/${params}`;

  const onCodeClose = (e) => {
    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "Enter") {
      openSearch();
      closeSearch();
      if (e.keyCode === 27) {
        openSearchInput();
        setCategory([]);
        setXidmetler([]);
        setLaboratoryTests([]);
        setTeams([]);
        setNews([]);
        setBlogs([]);
        setCareer([]);
      }
    } else if (e.keyCode === 13) {
      openSearchInput();
      const query =
        searchInput !== undefined ? createQueryString("q", searchInput) : "";

      // Router push düzəlişi
      router.push(`${urlPrefix}/search/?${query}`);
    }
  };

  function openSearch() {
    if (!searchInput || searchInput.trim() === "") return;

    const query =
      searchInput !== undefined ? createQueryString("q", searchInput) : "";

    // Router push düzəlişi
    router.push(`${urlPrefix}/search/?${query}`);
  }

  const closeSearch = () => {
    setSearchVisible(false);
    setSearchInput("");
    setCategory([]);
    setXidmetler([]);
    setLaboratoryTests([]);
    setTeams([]);
    setNews([]);
    setBlogs([]);
    setCareer([]);
  };

  function openSearchInput() {
    if (searchVisible) {
      closeSearch();
    } else {
      setSearchVisible(true);
    }
  }

  return (
    <header
      className={`  fixed top-0 left-0 right-0 z-[400] header_transiton border-b border-[--bg-55]  ${
        scrolledFromTop
          ? "bg-[--color-blue] py-4 shadow-xl"
          : "bg-[#FAFDFE] py-10 xl:py-6"
      }`}
    >
      <Max1200>
        <nav className="grid grid-cols-12 gap-4 lg:flex lg:justify-between lg:items-center">
          <div className="col-span-2  xl:col-span-1 h-full flex justify-center">
            {/* Logo Linki */}
            <Link
              href={currentLang === "az" ? "/" : `/${currentLang}`}
              className=" flex justify-center items-center"
            >
              {scrolledFromTop ? (
                <Image
                  alt="logo dark"
                  src={"/logo/logo_new_2.svg"}
                  width={300}
                  height={100}
                  className="max-w-[160px] 1xl:max-w-[120px] xl:w-[100px] md:w-[70px]"
                />
              ) : (
                <Image
                  alt="logo white"
                  src={"/logo/logo_new.svg"}
                  width={300}
                  height={100}
                  className="max-w-[180px] 1xl:max-w-[120px] xl:w-[100px] md:w-[70px]"
                />
              )}
            </Link>
          </div>
          <div
            className={`  ${
              searchVisible
                ? "col-span-9 pr-[24px]"
                : "col-span-8 xl:col-span-9 lg:col-span-1"
            }`}
          >
            <div
              className={` flex items-center transition-all duration-500 ease-in-out h-full`}
            >
              {!searchVisible ? (
                <ul className="flex items-center h-full justify-center gap-[14px] lg:hidden w-full transition-opacity duration-300 ease-in-out opacity-100">
                  <DesktopMenu
                    params={params}
                    menu={menu}
                    scrolledFromTop={scrolledFromTop}
                  />
                </ul>
              ) : null}

              {/* Arama Input Alanı */}
              <div
                className={`flex items-center flex-col transition-all duration-500  justify-center ease-in-out relative transform-gpu 
                  md:fixed md:top-[60px] md:right-0 md:w-full md:px-3
                  ${
                    searchVisible
                      ? "scale-x-100 origin-right w-full opacity-100  lg:w-[600px]"
                      : "scale-x-0 origin-right w-0 opacity-0"
                  }`}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    value={searchInput}
                    type="text"
                    onKeyUp={(e) => onCodeClose(e)}
                    onChange={(e) =>
                      setSearchInput(e.target.value.toLocaleLowerCase())
                    }
                    placeholder="Axtar..."
                    className={`w-full px-4 py-4  ${
                      !category?.length &&
                      !xidmetler?.length &&
                      !laboratorytests?.length &&
                      !teams?.length &&
                      !news?.length &&
                      !career.length &&
                      !blogs?.length
                        ? "rounded-[20px] "
                        : "rounded-t-[10px]"
                    } border-[--bg-55] border text-[16px] text-black bg-white focus:outline-none`}
                  />
                  <Image
                    onClick={openSearch}
                    alt="search"
                    width={50}
                    height={50}
                    src={`/search.svg`}
                    className={`max-w-[20px] absolute right-5 top-[13px] cursor-pointer ${
                      scrolledFromTop ? "filter1" : ""
                    }`}
                  />
                </div>
                <SearchPage
                  notFound={
                    !category?.length &&
                    !xidmetler?.length &&
                    !laboratorytests?.length &&
                    !teams?.length &&
                    !career.length &&
                    !news?.length &&
                    !blogs?.length
                  }
                  category={category}
                  xidmetler={xidmetler}
                  laboratorytests={laboratorytests}
                  teams={teams}
                  career={career}
                  news={news}
                  blogs={blogs}
                  loading={loading}
                  inputValue={searchInput}
                  netice={translate?.netice}
                  params={params}
                />
              </div>
            </div>

            <ul
              ref={mobileRef}
              className={`hidden lg:flex flex-col gap-[10px] fixed top-0 header_transiton z-[120] left-[-100%] w-[350px] h-full bg-[--bg-55] pt-[70px] pl-[40px]`}
            >
              <MobileMenu
                openCategory={openCategory}
                menu={menu}
                params={params}
                handleOpen={handleOpen}
                closeMobileMenu={closeMobileMenu}
              />
            </ul>
            <div
              onClick={closeMobileMenu}
              ref={overlayDiv}
              className="mobile-menu-overlay overflow-x-hidden block fixed left-0 top-0 bottom-0 right-0 z-[100] overlay "
            />
          </div>
          <div
            className={` flex justify-end ${searchVisible ? "" : "col-span-2"}`}
          >
            <div className="flex items-center  h-full gap-[24px]">
              <div className={`${searchVisible ? "hidden" : "flex"}`}>
                <div className="py-[21px] px-[21px] md:py-[14px] md:px-[14px] w-[35px] h-[35px] md:w-[25px] md:h-[25px]  rounded-full border border-[#55c4ef] flex items-center justify-center ">
                  <span
                    onClick={openSearchInput}
                    className="p-2 cursor-pointer"
                  >
                    <Image
                      alt="search"
                      width={50}
                      height={50}
                      src={`/search.svg`}
                      className={`max-w-5 ${scrolledFromTop ? "filter1" : ""}`}
                    />
                  </span>
                </div>
              </div>

              <span
                className={`px-8 1xl:px-8 md:px-4 md:py-0   rounded-[60px] border border-[#55c4ef] flex items-center justify-center gap-8 py-2 ${
                  searchVisible ? "" : "flex"
                }`}
              >
                <Lang
                  toggle={() => setOpen(!open)}
                  langs={langs}
                  scrolledFromTop={scrolledFromTop}
                  switchLang={
                    open && (
                      <div className="absolute  mt-6 right-[10px] top-6 h-[50px] flex flex-col text-left items-center justify-center">
                        {myLang?.map((lang, index) => (
                          <button
                            className="text-[--text] z-[200] capitalize text-[18px] xl:text-[13px] transitions  overflow-hidden px-6 py-1 rounded-lg bg-white-A700   "
                            key={index}
                            onClick={() => langSwitcher(lang)}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )
                  }
                />
              </span>
              <span
                onClick={openMobileMenu}
                className={`hidden lg:flex text-[30px] md:text-[25px] pr-4 lg:pr-0 cursor-pointer ${
                  scrolledFromTop ? "text-[#fff]" : "text-[#000]"
                }`}
              >
                <HiOutlineMenuAlt3 />
              </span>
            </div>
          </div>
        </nav>
      </Max1200>
      {searchVisible && (
        <div
          onClick={closeSearch}
          className="fixed top-[120px] left-0 right-0 w-full h-full bg-transparent z-[390]"
        ></div>
      )}
    </header>
  );
};

export default Header;
