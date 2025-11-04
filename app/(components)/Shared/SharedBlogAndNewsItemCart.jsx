import H2Text from "./Texts/H2Text";
import Paragraph from "./Paragraph/Paragraph";
import SharedInstagram from "./SharedInstagram/SharedInstagram";
import Link from "next/link";
import { toSlug2 } from "./SharedToSlug/SharedToSlug";
import NewsImages from "../Pages/News/NewsImages";

const SharedBlogAndNewsItemCart = ({
  h2Class,
  similar_news,
  img,
  data,
  hrefName,
  params,
  random_data,
  single_images,
}) => {
  const covertToSLug = toSlug2(data?.name);
  return (
    <>
      <div className="grid grid-cols-12 gap-[24px]">
        <div className="col-span-8 lg:col-span-12 flex flex-col">
          <H2Text
            text={data?.name}
            customStyle={`text-[--color-blue] ${h2Class} font-['SFProText-Bold'] `}
          />
          <Paragraph
            customStyle={`text-[16px] text-[--color-5b] mt-[24px]  md:text-[13px]`}
            text={data?.text}
          />
          {single_images && (
            <div className="my-[80px]">
              <NewsImages data={single_images} />
            </div>
          )}
        </div>
        <div className="col-span-4 lg:col-span-12 lg:mb-[40px]">
          <div className="flex flex-col">
            <div className="w-full ">
              <SharedInstagram data_instagram={img} />
            </div>
            {random_data?.length > 0 && (
              <div className="flex flex-col bg-[--bg-f6] mt-[32px]  rounded-[20px] border border-[--bg-b4] mb-[80px]">
                <H2Text
                  text={similar_news}
                  customStyle={`text-[--color-blue] ${h2Class} font-['SFProText-Bold'] p-[24px]`}
                />

                <div className="flex flex-col">
                  {random_data &&
                    random_data?.map((item, i) => (
                      <div key={i} className="blog p-[24px] flex flex-col">
                        <span className="text-[--color-5b] text-[14px] mb-[16px]">
                          {item?.date}
                        </span>
                        <h2 className="text-[18px] text-[--color-blue]">
                          {item?.name}
                        </h2>
                        <div className="flex justify-end">
                          <Link
                            href={`/${params}/${hrefName}/${item?.id}/${covertToSLug}`}
                            className="flex items-center gap-[12px]"
                          >
                            <h3
                              className={`w-max capitalize text-[--color-blue] text-[14px]`}
                            >
                              {readMore}
                            </h3>
                            <img src={"/right-2.svg"} alt="right-2" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedBlogAndNewsItemCart;
