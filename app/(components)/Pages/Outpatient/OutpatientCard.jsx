import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import Link from "next/link";

const OutpatientCard = ({ item, see_more, params }) => {
  return (
    <li className="border border-[--bg-b4] rounded-[10px] p-[24px] md:p-[14px] col-span-4 lg:col-span-6 md:col-span-12 bg-[--bg-f6]">
      <Link href={`/${params}/services/${item?.id}/${item?.slug}`}>
        <H2Text
          customStyle={`text-[22px] md:text-[16px] font-['SFProText-Bold'] text-[--color-blue] uppercase mb-[40px]`}
          text={item?.title}
        />
      </Link>
      <Paragraph
        customStyle={`text-[16px] md:text-[13px] text-[--color-5b] line-clamp-3 `}
        text={item?.short_desc}
      />
      <div className="flex justify-end mt-[20px]">
        <Link
          href={`/${params}/servisler/${item?.id}/${item?.slug}`}
          className="flex items-center gap-[12px] text-[14px]"
        >
          <h2 className="text-[--color-blue]">{see_more}</h2>
          <img src="/right-2.svg" alt="right" />
        </Link>
      </div>
    </li>
  );
};

export default OutpatientCard;
