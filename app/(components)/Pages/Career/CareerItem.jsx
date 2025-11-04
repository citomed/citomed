import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import H2Text from "../../Shared/Texts/H2Text";

import SharedCareerForm from "../../Shared/SharedForm/SharedCareerForm";

const CareerItem = ({
  data,
  text1,
  text2,
  carrer_emekHaqqiText,
  carrer_tecrubeText,
  work_schedule_text,
  workplace,
  params,
  career_form,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <H2Text
            text={data?.position}
            customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold'] mb-[80px] xl:mb-[40px]`}
          />
          <div className="grid grid-cols-12 gap-[24px] mb-[80px]">
            <div className="col-span-8 lg:col-span-12">
              <div className="border border-[--color-blue] rounded-[20px] ">
                <div className="border-b border-[--color-blue] ">
                  <div className="p-[32px] lg:p-[20px]">
                    <h3 className="text-[16px] md:text-[14px] text-[--color-blue] mb-[22px] md:mb-[10px] uppercase">
                      {text1}
                    </h3>
                    <div
                      className="text-[16px] md:text-[13px] text-[--color-blue] pl-[30px] md:pl-[15px] doctor_single"
                      dangerouslySetInnerHTML={{ __html: `${data?.text1}` }}
                    />
                  </div>
                </div>
                <div className="p-[32px] lg:p-[20px]">
                  <h3 className="text-[16px] md:text-[14px] text-[--color-blue] mb-[22px] md:mb-[10px] uppercase">
                    {text2}
                  </h3>
                  <div
                    className="text-[16px] md:text-[13px] text-[--color-blue] pl-[30px] md:pl-[15px] doctor_single"
                    dangerouslySetInnerHTML={{ __html: `${data?.text2}` }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-12">
              <div className="flex flex-col">
                <div className="bg-[--bg-f6] p-[32px] lg:p-[20px] flex flex-col justify-between h-max rounded-[20px]">
                  <div className="flex flex-col mb-[25px]">
                    <h2 className="text-[--color-blue] text-[16px] font-['SFProText-Medium']">
                      {carrer_tecrubeText}:
                    </h2>
                    <h2 className="text-[--color-blue] text-[16px] ">
                      {data?.work_experience}
                    </h2>
                  </div>
                  <div className="flex flex-col  mb-[25px]">
                    <h2 className="text-[--color-blue] text-[16px] font-['SFProText-Medium']">
                      {carrer_emekHaqqiText}:
                    </h2>
                    <h2 className="text-[--color-blue] text-[16px] ">
                      {data?.work_salary}
                    </h2>
                  </div>
                  <div className="flex flex-col  mb-[25px]">
                    <h2 className="text-[--color-blue] text-[16px] font-['SFProText-Medium']">
                      {work_schedule_text}
                    </h2>
                    <h2 className="text-[--color-blue] text-[16px] ">
                      {data?.work_time}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[--color-blue] text-[16px] font-['SFProText-Medium']">
                      {workplace}
                    </h2>
                    <h2 className="text-[--color-blue] text-[16px] ">
                      {data?.work_adress}
                    </h2>
                  </div>
                </div>
                <SharedCareerForm
                  params={params}
                  career_id={data?.id}
                  career_form={career_form}
                />
              </div>
            </div>
          </div>
        </Max1200>
      </Section>
    </Main>
  );
};

export default CareerItem;
