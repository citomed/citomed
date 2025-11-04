import Link from "next/link";
import React from "react";
import H2Text from "../../Shared/Texts/H2Text";

import { toSlug2 } from "../../Shared/SharedToSlug/SharedToSlug";

const CarrerCard = ({
  params,
  cur,
  carrer_emekHaqqiText,
  carrer_tecrubeText,
  last_resort,
  readMore,
}) => {
  const newSlug = toSlug2(cur?.title);

  return (
    <>
      <li className="flex flex-col col-span-6 lg:col-span-12 rounded-[10px] overflow-hidden border border-[-bg-b4]">
        <div className="bg-[--bg-55] p-[32px] lg:p-[20px]">
          <Link href={`/${params}/career/${cur?.id}/${newSlug}`}>
            <H2Text
              text={cur?.title}
              customStyle={`text-[26px] 1xl:text-[20px] md:text-[16px] text-[--color-blue] font-['SFProText-Bold'] font-[600]`}
            />
          </Link>
        </div>
        <div className="bg-[--bg-f6] p-[32px] lg:p-[20px]">
          <div className="grid grid-cols-12">
            <div className="col-span-6 ">
              <div className="flex flex-col">
                <h3 className="text-[--color-blue] text-[20px] lg:text-[16px] font-['SFProText-Medium'] font-[500] capitalize">
                  {carrer_tecrubeText}
                </h3>
                <span className="text-[--color-blue] text-[20px] lg:text-[16px] font-[300]">
                  {cur?.work_experience}
                </span>
              </div>
            </div>
            <div className="col-span-6 ">
              <div className="flex flex-col">
                <h3 className="text-[--color-blue] text-[20px] lg:text-[16px] font-['SFProText-Medium'] font-[500] capitalize">
                  {carrer_emekHaqqiText}
                </h3>
                <span className="text-[--color-blue] text-[20px] lg:text-[16px] font-[300]">
                  {cur?.work_salary}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[41px]">
            <div className="flex items-center">
              <h3 className="text-[--color-5b] text-[14px]">
                {last_resort} <span>{cur?.apply_date}</span>
              </h3>
            </div>

            <Link
              href={`/${params}/career/${cur?.id}/${newSlug}`}
              className="flex items-center gap-4"
            >
              <h3 className={`w-max  text-[14px] capitalize`}>{readMore}</h3>
              <img src={`/right-2.svg`} alt="right" />
            </Link>
          </div>
        </div>
      </li>
    </>
  );
};

export default CarrerCard;
