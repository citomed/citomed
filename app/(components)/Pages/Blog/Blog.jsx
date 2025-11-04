import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SahredCard from "../../Shared/SharedCard/SahredCard";

const Blog = ({
  tr_blogs,
  tr_blogs_long,
  data,
  params,
  read_more,
  not_found_blog,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-[60vh] md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={tr_blogs}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:mt-[10px] md:text-[14px] text-center w-[50%] lg:w-full`}
              text={tr_blogs_long}
            />

            {data?.length > 0 ? (
              <div className="my-[80px] lg:my-[40px] md:my-[20px]">
                <ul className="grid grid-cols-12 gap-[24px]">
                  {data &&
                    data?.map((item, i) => (
                      <SahredCard
                        key={i}
                        item={item}
                        width={1000}
                        height={240}
                        page={`/bloq`}
                        params={params}
                        read_more={read_more}
                      />
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-center text-gray-600 text-[25px] mt-[30px]">
                {not_found_blog}
              </p>
            )}
          </FlexCenter>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Blog;
