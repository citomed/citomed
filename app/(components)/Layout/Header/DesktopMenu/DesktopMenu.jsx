"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// 'params' propunu əlavə etdik (bu, 'az', 'en' və ya 'ru' dəyəri alacaq)
const DesktopMenu = ({ menu, scrolledFromTop, params }) => {
  const activePage = usePathname();

  // 1. URL Prefix Məntiqi: 'az' isə boş, digərləri '/en' vs.
  const urlPrefix = params === "az" ? "" : `/${params}`;

  // Köməkçi funksiya: Gələn href-i düzgün URL-ə çevirir
  const getFullUrl = (path) => {
    if (!path) return "#";

    // Ana səhifə üçün xüsusi yoxlama
    if (path === "/") {
      return params === "az" ? "/" : `/${params}`;
    }

    // Normal səhifələr üçün (slash ilə başladığına əmin oluruq)
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${urlPrefix}${cleanPath}`;
  };

  return (
    <>
      {menu?.map((item, i) => {
        // Linkin tam URL-ini yaradırıq
        const itemHref = getFullUrl(item?.href);

        let isActive = false;

        // Active yoxlamasını yeni yaradılan tam URL ilə aparırıq
        if (item?.href && itemHref === activePage) {
          isActive = true;
        } else if (item?.subMenu) {
          // Submenu üçün də eyni məntiq
          isActive = item?.subMenu?.some(
            (subItem) => getFullUrl(subItem?.href) === activePage
          );
        }

        return (
          <li key={i} className="relative group">
            {item?.href === null ? (
              <h3
                className={`${
                  isActive ? "font-bold text-[#55c4ef]" : "font-[400]"
                } cursor-pointer  ${
                  scrolledFromTop ? "text-[#fff]" : "text-[#0d2a68]"
                } text-[16px] relative item_h3 header_transiton  hover:text-[#55c4ef] `}
              >
                {item?.title}
                {isActive && <span className="menu_border" />}
              </h3>
            ) : (
              <Link
                href={itemHref} // Yenilənmiş URL
                className={`${
                  isActive ? "font-bold text-[#55c4ef] " : "font-[400]"
                } text-[#0d2a68] ${
                  scrolledFromTop ? "text-[#fff]" : "text-[#0d2a68]"
                }  text-[16px] font-[400] header_transiton relative hover:text-[#55c4ef] `}
              >
                {item?.title}
                {isActive && <span className="menu_border" />}
              </Link>
            )}
            {item?.subMenu && (
              <ul className="absolute item_submenu opacity-0 top-[2.5rem] invisible shadow-lg  headersub_transiton mt-[-2rem] group-hover:mt-0  group-hover:opacity-100 group-hover:visible left-0 bg-[#fff] flex flex-col gap-4 p-5 rounded-[10px] min-w-[250px]">
                {item?.subMenu?.map((cur, j) => {
                  // Submenu linki üçün tam URL
                  const subItemHref = getFullUrl(cur?.href);

                  return (
                    <li key={j} className="w-full subMenu ">
                      <Link
                        href={subItemHref} // Yenilənmiş URL
                        className="text-[16px] w-full  header_transiton flex justify-between items-center  text-[#000] capitalize "
                      >
                        <h3>{cur?.title}</h3>
                        <span>
                          <img src="/header_li_icon.svg" alt="" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default DesktopMenu;
