import Image from "next/image";
import H2Text from "../Texts/H2Text";
import Paragraph from "../Paragraph/Paragraph";
import Link from "next/link";
import { toSlug2 } from "../SharedToSlug/SharedToSlug";

const SahredCard = ({ item, width, height, params, read_more,page }) => {
  const covertToSLug = toSlug2(item?.name);

  return (
    <li className="border border-[--bg-55] rounded-[10px] p-[16px] flex flex-col h-full col-span-4 lg:col-span-6 md:col-span-12">
      <Link
        href={`/${params}${page}/${item?.id}/${covertToSLug}`}
        className="flex items-center justify-center mb-[16px]"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.cover}`}
          alt={item?.name}
          width={width}
          height={height}
          className={`object-cover`}
        />
      </Link>
      <div className="flex justify-between h-full flex-col">
        <Link href={`/${params}${page}/${item?.id}/${covertToSLug}`}>
          <H2Text
            text={item?.name}
            customStyle={`text-[--color-blue] text-[20px] md:text-[16px] font-['SFProText-Medium'] font-[500] mb-[24px] md:mb-[12px] line-clamp-2`}
          />
        </Link>
        <Paragraph
          text={item?.text}
          customStyle={`mb-[24px] text-[--color-blue] text-[14px] md:text-[12px] line-clamp-3`}
        />
        <div className="flex justify-between items-center">
          <span className={`text-[--color-5b] text-[14px]`}>{item?.date}</span>

          <Link
            href={`/${params}${page}/${item?.id}/${covertToSLug}`}
            className="flex items-center gap-[12px]"
          >
            <h3 className={`w-max capitalize text-[--color-blue] text-[14px]`}>
              {read_more}
            </h3>
            <img src={"/right-2.svg"} alt="right" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default SahredCard;
