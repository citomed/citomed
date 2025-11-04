"use client";
import Link from "next/link";
import { toSlug2 } from "../../Shared/SharedToSlug/SharedToSlug";
import { usePathname } from "next/navigation";

const DosctorsResults = ({ data, params }) => {
  const path = usePathname();
  return (
    <>
      {data &&
        data?.map((cur, i) => {
          const toSLug = toSlug2(cur?.title);
          return (
            <li
              className={`group  ${
                path === `/${params}/search`
                  ? "border-b border-[#C5CEE0] justify-between"
                  : ""
              }`}
              key={i}
            >
              <Link
                href={`/${params}/hekimler/${cur?.id}/${toSLug}`}
                className={`flex justify-between items-center  trans group-hover:bg-[#f2f6ff] 
                    ${
                      path === `/${params}/search`
                        ? "py-[12px]"
                        : "px-[24px] py-[12px]"
                    }`}
              >
                <h3 className="text-[17px] md:text-[13px] text-[--color-blue]">
                  {cur?.title}
                </h3>
                <img
                  src="/header_li_icon.svg"
                  alt="header_li_icon"
                  className="trans group-hover:filter-[--filter]"
                />
              </Link>
            </li>
          );
        })}
    </>
  );
};

export default DosctorsResults;
