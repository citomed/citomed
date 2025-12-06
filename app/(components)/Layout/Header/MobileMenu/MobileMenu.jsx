"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

// params propunu əlavə etdik
const MobileMenu = ({
  menu,
  handleOpen,
  openCategory,
  closeMobileMenu,
  params,
}) => {
  const activePage = usePathname();

  // 1. URL Prefix Məntiqi: 'az' isə boş, digərləri '/en' vs.
  const urlPrefix = params === "az" ? "" : `/${params}`;

  // Köməkçi funksiya: Linki düzgün formaya salır
  const getFullUrl = (path) => {
    if (!path) return "#";

    // Ana səhifə üçün xüsusi yoxlama
    if (path === "/") {
      return params === "az" ? "/" : `/${params}`;
    }

    // Normal səhifələr üçün
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${urlPrefix}${cleanPath}`;
  };

  return (
    <>
      {menu &&
        menu?.map((item, i) => {
          // Parent Link üçün URL yaradılır
          const itemHref = getFullUrl(item?.href);

          // Active yoxlanışı yeni URL-ə görə aparılır
          let isActive = false;
          if (item?.href && itemHref === activePage) {
            isActive = true;
          } else if (item?.subMenu) {
            isActive = item?.subMenu?.some(
              (subItem) => getFullUrl(subItem?.href) === activePage
            );
          }

          return (
            <li key={i} onClick={handleOpen(item?.title)} className="relative">
              {item?.href === null ? (
                // === Dropdown başlığı (Link deyil) ===
                <h3
                  className={` flex text-[25px] md:text-[20px] capitalize items-center gap-2 trans items cursor-pointer ${
                    isActive ? "text-[#fff]" : ""
                  } hover:text-[#fff]`}
                >
                  {item?.title}
                  <span>
                    {openCategory === item?.title ? (
                      <FaChevronUp className="text-[15px]" />
                    ) : (
                      <FaChevronDown className="text-[15px]" />
                    )}
                  </span>
                </h3>
              ) : (
                // === Normal Link ===
                <Link
                  onClick={closeMobileMenu} // Linkə tıkladıqda menyu bağlansın
                  className={`text-[25px] md:text-[20px] capitalize trans hover:text-[#fff] ${
                    isActive ? "text-[#fff]" : ""
                  }`}
                  href={itemHref} // Yenilənmiş URL
                >
                  {item?.title}
                </Link>
              )}

              {/* === Submenu === */}
              {item?.subMenu !== null && (
                <ul
                  className={`trans gap-3 ${
                    openCategory === item?.title
                      ? "flex visible h-full flex-col mt-3  ml-2  mb-3 "
                      : " invisible h-0"
                  }`}
                >
                  {item &&
                    openCategory === item?.title &&
                    item?.subMenu?.map((elem, j) => {
                      // Submenu linki üçün URL
                      const subItemHref = getFullUrl(elem?.href);

                      return (
                        <li
                          className="itemsor-pointer trans hover:text-[#fff]"
                          key={j}
                        >
                          <Link
                            onClick={closeMobileMenu} // Linkə tıkladıqda menyu bağlansın
                            href={subItemHref} // Yenilənmiş URL
                            className="flex h-full w-full capitalize text-[20px] md:text-[16px]"
                          >
                            {elem?.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </li>
          );
        })}
      <span
        onClick={closeMobileMenu}
        className="absolute top-10 right-10 text-[30px] text-[#fff] cursor-pointer"
      >
        <IoClose />
      </span>
    </>
  );
};

export default MobileMenu;
