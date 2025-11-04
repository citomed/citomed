import H2Text from "../Texts/H2Text";
import Section_1_Video from "../../PagesComponent/HomePage/Section1/Section_1_Components/Section_1_Video";

const SharedDirections = ({
  text1,
  text2,
  text3,
  h2Class,
  data1,
  data2,
  img,
  videoLink,
  unis,
  section_video,
}) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[24px] lg:gap-0">
        <div className="col-span-8 lg:col-span-12">
          {unis && (
            <div className="flex flex-col  border-b border-[--bg-b4] pb-[40px]">
              {text1 && (
                <H2Text
                  text={text1}
                  customStyle={` ${h2Class} font-['SFProText-Bold'] mb-[32px]`}
                />
              )}
              {unis && (
                <div
                  className="text-[14px] text-[--color-blue]"
                  dangerouslySetInnerHTML={{ __html: `${unis}` }}
                />
              )}
            </div>
          )}
          {(data1 || data2) && (
            <div className="flex flex-col gap-[24px] md:gap-[12px] mt-[40px] md:mt-[20px]">
              {text2 && (
                <H2Text
                  text={text2}
                  customStyle={` ${h2Class} font-['SFProText-Bold'] `}
                />
              )}
              <div className="grid grid-cols-12 gap-[24px] md:gap-[0px]">
                <div className="col-span-6 lg:col-span-12 pl-[20px]">
                  <div
                    className="text-[--color-blue] text-[14px] md:text-[12px] doctor_single"
                    dangerouslySetInnerHTML={{ __html: `${data1}` }}
                  />
                </div>

                <div className="col-span-6 lg:col-span-12 lg:p-[20px] md:pt-[0px] px-[20px]">
                  <div
                    className="text-[--color-blue] text-[14px] md:text-[12px] doctor_single"
                    dangerouslySetInnerHTML={{ __html: `${data2}` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 lg:col-span-12">
          {text3 && (
            <H2Text
              text={text3}
              customStyle={` ${h2Class} font-['SFProText-Bold'] mb-[32px]`}
            />
          )}

          <div className={` ${section_video}`}>
            <Section_1_Video
              height={583}
              imgClass="h-full  md:h-[350px] md:object-cover rounded-[20px]"
              linear={`/services/linear.png`}
              img={img}
              videoLink={videoLink}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedDirections;
