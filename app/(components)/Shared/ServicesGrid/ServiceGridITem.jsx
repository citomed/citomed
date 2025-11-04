import Image from "next/image";
import H2Text from "../Texts/H2Text";
import IsNew from "../IsNew/IsNew";

import Link from "next/link";
import { toSlug2 } from "../SharedToSlug/SharedToSlug";

const ServiceGridITem = ({
  customStyle,
  item,
  readMore,
  params,
  services_slug,
}) => {
  const convertoSlug = toSlug2(item?.title);

  return (
    <>
      <div
        className={`${customStyle}  relative  rounded-[1.5rem]  service_grid   h-[450px] md:h-[400px]`}
      >
        <div className="relative h-full">
          <Image
            alt={item?.title}
            src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.image}`}
            width={1000}
            height={478}
            className="h-full object-cover rounded-[1.5rem] overflow-hidden"
          />
          <div className="absolute bottom-0 content_card left-0 right-0 h-[70px] bg-[#55c4ef] px-6 py-6 rounded-[10px]  ">
            <div className="flex flex-col justify-between h-full overflow-hidden ">
              <div className="flex flex-col">
                <H2Text
                  text={item?.title}
                  customStyle={`text-[24px] text-[--color-blue] 1xl:text-[20px] font-bold`}
                />
                <div
                  className="invisible opacity-0 text-[--color-blue]  card_p text-[12px] pt-4"
                  dangerouslySetInnerHTML={{
                    __html: `${item?.short_desc && item?.short_desc}`,
                  }}
                />
              </div>
              <div className="mb-2 flex items-center isNewInner   opacity-0 invisible ">
                {item?.label && (
                  <IsNew
                    text={item?.label}
                    customStyle={`bg-[#f32735] text-[12px]  rounded-3xl uppercase text-white font-semibold  px-[14px] py-[3px] border-[4px] border-[#3db2df]`}
                  />
                )}
                <div className="flex justify-end  w-full pr-[20px] ">
                  <Link
                    href={`/${params}/${services_slug}/${item?.id}/${convertoSlug}`}
                    className="flex items-center gap-4"
                  >
                    <h3
                      className={`w-max  text-[14px] text-[--color-blue]  link_after  opacity-0 invisible capitalize`}
                    >
                      {readMore}
                    </h3>
                    <img src={`/right.svg`} alt="right" className={`filter1`} />
                  </Link>
                </div>
              </div>
            </div>
            {item?.label && (
              <IsNew
                text={item?.label}
                customStyle={`absolute isNew header_transiton top-[-1.5rem] text-[12px] right-4 bg-[#f32735] rounded-3xl uppercase text-white font-semibold px-[14px] py-[3px] border-[4px] border-[#3db2df]`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceGridITem;
