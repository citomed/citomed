import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import SharedBgColorsTextTitle from "../../Shared/SharedBgColorsTextTitle/SharedBgColorsTextTitle";
import PrivateServiceForm from "../../Shared/SharedForm/PrivateServiceForm";
import Image from "next/image";
import SharedVideoWithInstagram from "../../Shared/SharedVideoWithInstagram/SharedVideoWithInstagram";
import SharedFag from "../../Shared/SharedFag/SharedFag";
import ServiceGridITem from "../../Shared/ServicesGrid/ServiceGridITem";
import Privatetags from "./Privatetags";

const PrivateServiceSingle = ({
  data,
  params,
  read_more,
  asked_questions,
  other_services,
  pressure_chamber,
  private_name,
  private_surname,
  private_birth,
  private_gender,
  private_when_came,
  form_men,
  form_women,
  form_text1,
  form_text2,
  btn_name,
  btn_sending,
  contact_form_1,
  swal_error_8,
  swal_error_1,
}) => {
  const someTexts = [
    {
      id: 1,
      text: `${data?.item?.blue_card1}`,
      img: "/plus.svg",
    },
    {
      id: 2,
      text: `${data?.item?.blue_card2}`,
      img: "/plus.svg",
    },
    {
      id: 3,
      text: `${data?.item?.blue_card3}`,
      img: "/plus.svg",
    },
  ];

  console.log("data", data);

  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <FlexCenter>
            <H2Text
              text={data?.item?.title}
              customStyle={`text-[--color-blue]  text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
          </FlexCenter>
          <div className="grid grid-cols-12 gap-[24px] mt-[80px] 1xl:mt-[40px] md:mt-[20px]">
            <div className="col-span-7 lg:col-span-12">
              <SharedBgColorsTextTitle
                text1={data?.item?.text1}
                text2={data?.item?.text2}
              />
            </div>
            <div className="col-span-5 lg:col-span-12">
              <div className="bg-[--color-blue] w-full h-full rounded-[20px] p-[32px] 1xl:p-[16px]">
                <PrivateServiceForm
                  private_name={private_name}
                  private_surname={private_surname}
                  private_birth={private_birth}
                  private_gender={private_gender}
                  private_when_came={private_when_came}
                  form_men={form_men}
                  form_women={form_women}
                  form_text1={form_text1}
                  form_text2={form_text2}
                  btn_name={btn_name}
                  btn_sending={btn_sending}
                  contact_form_1={contact_form_1}
                  swal_error_8={swal_error_8}
                  swal_error_1={swal_error_1}
                  ozel_ad={data?.item?.title}
                  params={params}
                  xidmet_id={data?.item?.id}
                />
              </div>
            </div>
          </div>
          {someTexts?.length > 0 && (
            <div className="grid grid-cols-12 gap-[24px] my-[80px] md:my-[40px]">
              <div className="col-span-4 lg:col-span-12">
                <ul className="flex flex-col justify-between gap-[24px] h-full">
                  {someTexts?.map((cur, i) => (
                    <li
                      key={i}
                      className="bg-[--bg-55] px-[24px] 1xl:px-[12px] py-[40px] md:py-[20px] rounded-[10px] flex md:items-center gap-[16px]"
                    >
                      <div className="flex items-center ">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#fff] flex items-center justify-center">
                          <Image
                            width={24}
                            height={24}
                            alt={cur?.text}
                            src={cur?.img}
                          />
                        </div>
                      </div>
                      <H2Text
                        text={cur?.text}
                        customStyle={`text-[#fff] text-[20px] 1xl:text-[16px] md:text-[13px] text-[--color-blue] font-['SFProText-Medium']`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-8 lg:col-span-12 h-full">
                <Image
                  width={1000}
                  height={550}
                  alt="private1"
                  className="rounded-[20px] h-[560px] 1xl:h-full object-cover"
                  src={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.item?.image2}`}
                />
              </div>
            </div>
          )}

          <div className="mb-[80px] md:mb-[40px] h-full">
            <SharedVideoWithInstagram
              height={1200}
              imgClass="h-[528px] object-cover"
              imageDiv="h-full"
              linear={`/home/section1/linear.png`}
              imgVideo={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.item?.video_image}`}
              imgInstagram={data?.instagram}
              videoLink={data?.item?.video}
            />
          </div>
          {data?.item?.service_tags?.length > 0 && (
            <div className="mb-[80px] md:mb-[40px]">
              <H2Text
                text={data?.item?.special_benefits}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <Privatetags data={data?.item?.service_tags} />
            </div>
          )}

          {data?.fags?.length > 0 && (
            <div className="w-full  border-b border-[--bg-b4] pb-[80px] 1xl:pb-[40px]">
              <H2Text
                text={asked_questions}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <SharedFag data={data?.fags} />
            </div>
          )}
          {data?.random_services?.length > 0 && (
            <div className="my-[80px] 1xl:my-[40px]">
              <H2Text
                text={other_services}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <div className="grid grid-cols-12 gap-6 mt-[40px] md:mt-[20px]">
                {data?.random_services?.map((item, i) => (
                  <ServiceGridITem
                    key={i}
                    params={params}
                    item={item}
                    customStyle="col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12"
                    readMore={read_more}
                    services_slug={`ozel-xidmetler`}
                  />
                ))}
              </div>
            </div>
          )}
        </Max1200>
      </Section>
    </Main>
  );
};

export default PrivateServiceSingle;
