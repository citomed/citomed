import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import SharedInstagram from "../../Shared/SharedInstagram/SharedInstagram";
import SharedDoctorSlice from "../../Shared/SharedDoctorSlice/SharedDoctorSlice";
import SharedLink from "../../Shared/Link/SharedLink";
import SharedBgColorsTextTitle from "../../Shared/SharedBgColorsTextTitle/SharedBgColorsTextTitle";
import SharedDirections from "../../Shared/SharedDirections/SharedDirections";
import OutpatientCard from "../Outpatient/OutpatientCard";
import Section_1_Video from "../../PagesComponent/HomePage/Section1/Section_1_Components/Section_1_Video";

const ServicesSingle = ({
  all,
  data,
  params,
  treatment_directions,
  our_doctors,
  our_services,
  see_more,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter>
            <H2Text
              text={data?.item?.title}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
          </FlexCenter>
          <div className="grid grid-cols-12 gap-[24px] mt-[80px] lg:mt-[40px] md:mt-[20px]">
            <div className="col-span-8 lg:col-span-12">
              <SharedBgColorsTextTitle
                text1={data?.item?.text1}
                text2={data?.item?.text2}
              />
            </div>
            <div className="col-span-4  lg:col-span-12  lg:mt-6">
              <div className="lg:grid lg:grid-cols-12 gap-[24px]">
                <div className="col-span-6 lg:col-span-12">
                  <SharedInstagram
                    data_instagram={data?.instagram}
                    img={`/home/section1/image2.png`}
                  />
                </div>
                <div className="hidden lg:flex col-span-6 lg:col-span-12 lg:justify-center ">
                  <Section_1_Video
                    height={583}
                    imgClass="w-full lg:h-[500px] md:h-[350px] md:object-cover overflow-hidden rounded-[20px]"
                    linear={`/services/linear.png`}
                    main_div="w-full"
                    videoLink={data?.item?.video}
                    img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.item?.video_image}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-[80px] lg:my-[20px]">
            <SharedDirections
              text2={treatment_directions}
              h2Class={`text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] text-[--color-blue]`}
              data1={data?.item?.text3}
              data2={data?.item?.text4}
              section_video="lg:hidden"
              img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.item?.video_image}`}
              videoLink={data?.item?.video}
            />
          </div>
          <div className="my-[80px] lg:my-[20px] border-b border-[--bg-b4] pb-[80px] lg:pb-[30px]">
            <H2Text
              customStyle={`text-[--color-blue] text-[36px]  1xl:text-[30px] lg:text-center lg:text-[25px] md:text-[20px]  font-['SFProText-Bold'] mb-[40px]`}
              text={our_doctors}
            />
            <SharedDoctorSlice
              params={params}
              data_doctots={data?.random_doctors}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between lg:flex-wrap w-full mb-[44px]">
              <H2Text
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold'] lg:mb-[20px]`}
                text={our_services}
              />
              <SharedLink
                customStyle={`flex items-center gap-[12px] border border-[--color-blue] rounded-[60px] px-[47px] lg:w-max md:h-max md:px-[30px] md:py-[6px]` }
                text={all}
                href={`/${params}/services`}
                src="/right.svg"
                customImgClass="filter1"
                h2Class="text-[16px] text-[--color-blue] capitalize "
              />
            </div>
            <div className="mb-[80px]">
              <ul className="grid grid-cols-12 gap-[24px] w-full">
                {data?.random_services?.map((item, i) => (
                  <OutpatientCard
                    params={params}
                    key={i}
                    item={item}
                    see_more={see_more}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Max1200>
      </Section>
    </Main>
  );
};

export default ServicesSingle;
