"use client";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import RoundedPicture from "../../Shared/RoundedPicture/RoundedPicture";
import SharedDoctorForm from "../../Shared/SharedForm/SharedDoctorForm";
import SharedDirections from "../../Shared/SharedDirections/SharedDirections";
import Image from "next/image";
import SharedLink from "../../Shared/Link/SharedLink";
import SharedDoctorSlice from "../../Shared/SharedDoctorSlice/SharedDoctorSlice";

const DcotorItem = ({
  params,
  data,
  education,
  treatment_directions,
  doctor_reduqest,
  data_doctors_random,
  other_doctors,
  placeholder_birthday,
  placeholder_gender,
  placeholder_name,
  placeholder_surname,
  placeholder_when_came,
  btn_name,
  btn_sending,
  all,
  private_gender,
  form_men,
  form_women,
  form_text1,
  form_text2,
  contact_form_1,
  swal_error_8,
  swal_error_1,
  tr_doctors_long,
}) => {
  return (
    <Main>
      <Section ngClass="md:p-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={data?.title}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[24px] 1xl:text-[20px] lg:text-[18px] text-[--color-5b] mt-[24px] text-center font-['SFProText-Bold']`}
              text={data?.position}
            />
            <div
              className={`${
                data?.text2
                  ? "bg-[--bg-f6] mt-[21rem] lg:mt-[20rem]"
                  : "mt-[20rem] lg:mt-[18rem]"
              } rounded-[20px]   max-w-[792px]`}
            >
              <FlexCenter customClass={`flex-col`}>
                <RoundedPicture
                  customClass={`mt-[-14rem]`}
                  picture={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.file}`}
                  img2={`/home/section5/linear.png`}
                  width={362}
                  height={362}
                  name={data?.text1}
                  doctor_img={`w-full h-full object-cover div_transition group-hover:scale-110`}
                />
                {data?.text2 && (
                  <H2Text
                    text={data?.text2}
                    customStyle={`py-[90px] px-[90px] xl:py-[40px] xl:px-[30px] lg:px-[20px] text-center font-['Montserrat'] text-[24px] 1xl:text-[25px] lg:text-[20px] text-[--color-blue]`}
                  />
                )}
              </FlexCenter>
            </div>
            <div className="my-[80px] w-full px-[80px] lg:px-0">
              <SharedDoctorForm
                name={placeholder_name}
                surname={placeholder_surname}
                birthday={placeholder_birthday}
                gender={placeholder_gender}
                came={placeholder_when_came}
                btn_name={btn_name}
                btn_sending={btn_sending}
                text1={form_text1}
                text2={form_text2}
                private_gender={private_gender}
                form_men={form_men}
                form_women={form_women}
                contact_form_1={contact_form_1}
                swal_error_8={swal_error_8}
                swal_error_1={swal_error_1}
                hekimadi={data?.title}
                hekimpozisiyasi={data?.text1}
              />
            </div>
            <div className="w-full mb-[180px] lg:mb-[100px]">
              <SharedDirections
                unis={data?.text3}
                text1={education}
                text2={treatment_directions}
                text3={doctor_reduqest}
                h2Class={`text-[20px]`}
                data1={data?.text4}
                data2={data?.text4_2}
                img={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.video_image}`}
                videoLink={data?.video}
              />
            </div>

            {data?.text5 && (
              <div className="border border-[--color-blue] rounded-[10px] w-full mb-[80px] relative">
                <span className="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#fff] border border-[--color-blue] absolute top-[-4rem] left-[40px]">
                  <Image width={18} height={18} alt="nida" src={`/nida.svg`} />
                </span>
                <Paragraph
                  text={data?.text5}
                  customStyle={`text-[20px] 1xl:text-[16px] md:text-[14px] text-[--color-5b] pb-[32px] pl-[32px] lg:pl-16px] lg:pr-[16px] pr-[32px] md:pl-[20px] md:pr-[20px] pt-[72px] md:pt-[55px]`}
                />
              </div>
            )}
          </FlexCenter>
        </Max1200>
        {data_doctors_random?.length > 0 && (
          <div className="bg-[--bg-f6] py-[80px] xl:py-[30px]">
            <Max1200>
              <div className="flex flex-col w-full mb-[80px] md:mb-[30px]">
                <div className="flex justify-between items-center w-full  ">
                  <H2Text
                    text={other_doctors}
                    customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold'] lg:mb-[20px] md:mb-0`}
                  />
                  <SharedLink
                    href={`/${params}/doctors`}
                    text={all}
                    customStyle={`flex items-center gap-[20px] border border-[--color-blue] h-max py-[17.5px] lg:py-[10px] md:py-[6px] px-[47px] md:px-[30px] rounded-[60px]`}
                    h2Class={`text-[--color-blue] h-max text-[14px] md:text-[13px] md:text-center`}
                    customImgClass={`filter1`}
                  />
                </div>
                <Paragraph
                  customStyle={`text-[16px] md:text-[13px] md:text-center text-[--color-5b] mt-[24px] w-[70%] lg:w-full`}
                  text={tr_doctors_long}
                />
              </div>

              <SharedDoctorSlice
                params={params}
                data_doctots={data_doctors_random}
                doctor_img={`w-full h-full object-cover div_transition group-hover:scale-110`}
              />
            </Max1200>
          </div>
        )}
      </Section>
    </Main>
  );
};

export default DcotorItem;
