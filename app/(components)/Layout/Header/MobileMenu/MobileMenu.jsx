"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

const MobileMenu = ({ menu, handleOpen, openCategory, closeMobileMenu }) => {
  const activePage = usePathname();
  return (
    <>
      {menu &&
        menu?.map((item, i) => {
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
            <li key={i} onClick={handleOpen(item?.title)} className="relative">
              {item?.href === null ? (
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
                <Link
                  className={`text-[25px] md:text-[20px] capitalize trans hover:text-[#fff] ${
                    isActive ? "text-[#fff]" : ""
                  }`}
                  href={linkHref}
                >
                  {item?.title}
                </Link>
              )}
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
                    item?.subMenu?.map((elem, i) => {
                      return (
                        <li
                          className="itemsor-pointer trans hover:text-[#fff]"
                          key={i}
                        >
                          <Link
                            href={`${elem?.href}`}
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
      <span onClick={closeMobileMenu} className="absolute top-10 right-10 text-[30px] text-[#fff] cursor-pointer">
        <IoClose />
      </span>
    </>
  );
};

export default MobileMenu;
