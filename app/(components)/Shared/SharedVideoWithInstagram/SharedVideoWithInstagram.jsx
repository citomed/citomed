import Section_1_Video from "../../PagesComponent/HomePage/Section1/Section_1_Components/Section_1_Video";
import SharedInstagram from "../SharedInstagram/SharedInstagram";

const SharedVideoWithInstagram = ({
  height,
  imgVideo,
  linear,
  videoLink,
  text1,
  imgInstagram,
  imgClass,
  imageDiv,
  ins,
}) => {
  console.log("ins", ins);

  return (
    <>
      <div className="grid grid-cols-12 gap-[24px] h-full ">
        <div
          className={`${
            ins === 0 ? "col-span-12" : "col-span-8 md:col-span-12"
          } flex flex-col gap-4 h-full`}
        >
          <Section_1_Video
            height={height}
            linear={linear}
            img={imgVideo}
            imgClass={imgClass}
            imageDiv={imageDiv}
            videoLink={videoLink}
            main_div="overflow-hidden rounded-[21px]"
          />
          {text1 && (
            <h1
              className="text-[14px] text-[#5b748d] pt-4"
              dangerouslySetInnerHTML={{ __html: text1 }}
            />
          )}
        </div>
        {ins === 1 && (
          <div className="col-span-4 h-full md:col-span-12">
            <SharedInstagram data_instagram={imgInstagram} />
          </div>
        )}
      </div>
    </>
  );
};

export default SharedVideoWithInstagram;
