import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import H2Text from "../../Shared/Texts/H2Text";
import CarrerCard from "./CarrerCard";

const Career = ({
  tr_career,
  tr_career_long,
  data,
  params,
  carrer_emekHaqqiText,
  carrer_tecrubeText,
  last_resort,
  readMore,
}) => {
  return (
    <>
      <Main>
        <Section ngClass="min-h-[65vh] md:min-h-max md:px-[10px]">
          <Max1200>
            <FlexCenter customClass={`flex-col`}>
              <H2Text
                text={tr_career}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <Paragraph
                customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:mt-[10px] md:text-[13px] text-center w-[50%] lg:w-full`}
                text={tr_career_long}
              />
              <div className="py-[80px] w-full lg:py-[40px] md:py-[20px]">
                <ul className="grid grid-cols-12 gap-[24px] ">
                  {data &&
                    data?.map((cur, i) => (
                      <CarrerCard
                        carrer_emekHaqqiText={carrer_emekHaqqiText}
                        carrer_tecrubeText={carrer_tecrubeText}
                        params={params}
                        key={i}
                        cur={cur}
                        readMore={readMore}
                        last_resort={last_resort}
                      />
                    ))}
                </ul>
              </div>
            </FlexCenter>
          </Max1200>
        </Section>
      </Main>
    </>
  );
};

export default Career;
