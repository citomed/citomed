
import SharedLink from "../Link/SharedLink";
import H2Text from "../Texts/H2Text";

import Paragraph from "../Paragraph/Paragraph";

const SharedTabsContents = ({ data, see_more }) => {
  return (
    <ul className="grid grid-cols-12 gap-[24px] w-full">
      {data?.map((cat, i) => (
        <li
          key={i}
          className={`flex flex-col bg-[--bg-f6] h-full  border border-[--bg-b4] rounded-[10px] p-[24px] md:p-[16px] col-span-4 lg:col-span-6 md:col-span-12`}
        >
          <H2Text
            customStyle={`text-[22px] font-['SFProText-Bold'] md:text-[16px] text-[--color-blue] uppercase mb-[40px]`}
            text={cat?.name}
          />
          <Paragraph
            customStyle={`text-[16px] text-[--color-5b] line-clamp-3 `}
            text={cat?.name2}
          />
          <div className="flex justify-end items-center mt-[25px]">
            <SharedLink
              href={`${process.env.NEXT_PUBLIC_PICTURE}/${cat?.file}`}
              customStyle={`flex items-center gap-[12px] text-[14px]`}
              text={see_more}
              h2Class="text-[--color-blue]"
              src="/right-2.svg"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SharedTabsContents;
