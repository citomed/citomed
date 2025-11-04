import H2Text from "../Texts/H2Text";
import Paragraph from "../Paragraph/Paragraph";
import SharedLink from "../Link/SharedLink";
import Image from "next/image";
import Link from "next/link";

const SharedTabContentItem = ({ item, see_more }) => {
  return (
    <li
      className={` ${item?.galery_kiv ? "col-span-3  " : "col-span-4"}  ${
        item?.title1
          ? "border border-[--bg-b4] bg-[--bg-f6] flex flex-col p-[24px]"
          : ""
      } border border-[--bg-b4] p-[24px] rounded-[10px]`}
    >
      {item?.title1 && (
        <H2Text
          customStyle={`text-[22px] font-['SFProText-Bold'] text-[--color-blue] uppercase`}
          text={item?.title1}
        />
      )}
      {item?.name && (
        <H2Text
          customStyle={`text-[22px] font-['SFProText-Bold'] text-[--color-blue] uppercase`}
          text={item?.name}
        />
      )}
      {item?.title2 && (
        <H2Text
          customStyle={`text-[24px] font-['SFProText-Bold'] text-[--color-blue] capitalize`}
          text={item?.title2}
        />
      )}
      {item?.title3 && (
        <Paragraph
          customStyle={`text-[--color-5b] text-[14px] line-clamp-3 capitalize font-['SFProText-Light'] mt-[16px]`}
          text={item?.title3}
        />
      )}
      {see_more && (
        <div className="flex justify-end items-center mt-[25px]">
          <SharedLink
            href={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.file}`}
            target={`blank`}
            customStyle={`flex items-center gap-[12px] text-[14px]`}
            text={see_more}
            h2Class="text-[--color-blue]"
            src="/right-2.svg"
          />
        </div>
      )}
      {item?.src && (
        <div className="flex items-center justify-center w-full">
          <Image
            width={196}
            height={100}
            src={item?.src}
            alt={item?.logoTitle}
            className="w-[196px] h-[100px] object-cover"
          />
        </div>
      )}
      {item?.src1 && (
        <div className="flex items-center justify-center w-full">
          <Image
            width={282}
            height={100}
            src={item?.src1}
            alt={item?.logoTitle}
            className="w-full h-[180px] object-cover"
          />
        </div>
      )}
      {item?.src1Alt && (
        <Link
          href={`${item?.kiv_pdf}`}
          target="_blank"
          className="flex items-center justify-end mt-[32px] w-full"
        >
          <img
            width={24}
            height={24}
            src={item?.src1Alt}
            alt={item?.title1}
            className="object-cover"
          />
        </Link>
      )}
    </li>
  );
};

export default SharedTabContentItem;
