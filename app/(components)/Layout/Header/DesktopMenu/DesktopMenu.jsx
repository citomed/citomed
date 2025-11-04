"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopMenu = ({ menu, scrolledFromTop }) => {
  const activePage = usePathname();
  return (
    <>
      {menu?.map((item, i) => {
        let isActive = false;
        if (item?.href && item?.href === activePage) {
          isActive = true;
        } else if (item?.subMenu) {
          isActive = item?.subMenu?.some(
            (subItem) => subItem?.href === activePage
          );
        }
        const linkHref = item?.href || "#";
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
                href={linkHref}
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
                {item?.subMenu?.map((cur, i) => (
                  <li key={i} className="w-full subMenu ">
                    <Link
                      href={`${cur?.href}`}
                      className="text-[16px] w-full  header_transiton flex justify-between items-center  text-[#000] capitalize "
                    >
                      <h3>{cur?.title}</h3>
                      <span>
                        <img src="/header_li_icon.svg" alt="" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default DesktopMenu;
