import Link from "next/link";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import { toSlug } from "../../Shared/SharedToSlug/SharedToSlug";

const LabarotoryCard = ({ item, params, see_more, line_clamp }) => {
  const toSlugName = toSlug(item?.title);
  return (
    <>
      <li className="col-span-4 lg:col-span-6 md:col-span-12 bg-[--bg-f6] ">
        <div className="flex w-full flex-col h-full p-[32px] 1xl:p-[20px] md:p-[14px] border border-[--bg-b4] rounded-[10px]">
          <Link href={`/${params}/lab/${item?.id}/${toSlugName}`}>
            <H2Text
              text={item?.title}
              customStyle={`text-[22px] 1xl:text-[18px] md:text-[14px] font-['SFProText-Bold'] text-[--color-blue] uppercase mb-[40px]`}
            />
          </Link>
          <Paragraph
            text={item?.text}
            customStyle={`text-[14px] text-[--color-5b]  md:text-[13px] ${line_clamp}`}
          />
          <div className="flex items-center justify-between mt-[40px]">
            {item?.label && (
              <span className="bg-[--bg-55] uppercase text-white px-[11px] py-[3px] text-[12px] rounded-[13px]">
                {item?.label}
              </span>
            )}
            <div className="flex justify-end w-full">
              <Link
                href={`/${params}/lab/${item?.id}/${toSlugName}`}
                className="flex items-center gap-[12px]"
              >
                <h2 className="text-[14px] text-[--color-blue]">{see_more}</h2>
                <img src="/right-2.svg" alt={see_more} />
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default LabarotoryCard;
