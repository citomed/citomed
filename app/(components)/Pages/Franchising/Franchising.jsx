import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import SharedPictureWithText from "../../Shared/SharedPictureWithText/SharedPictureWithText";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import Section_1_Video from "../../PagesComponent/HomePage/Section1/Section_1_Components/Section_1_Video";
import SharedFrForm from "../../Shared/SharedForm/SharedFrForm";

const Franchising = ({
  franchising,
  form_text1,
  form_text2,
  pl_name,
  pl_surname,
  btn_name,
  btn_sending,
  pl_company,
  params,
  contact_form_1,
  swal_error_8,
  swal_error_1,
}) => {
  return (
    <Main>
      <Section ngClass="md:px-[10px]">
        <Max1200>
          <FlexCenter customClass={`flex-col`}>
            <H2Text
              text={franchising?.data?.title}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <div className="mt-[80px] 1xl:mt-[40px] md:mt-[20px]">
              <SharedPictureWithText
                bgColor={`bg-[--bg-f6] `}
                h2Class={`text-[16px] text-[--color-blue] font-[400]`}
                maxWidth={`max-w-[792px]`}
                img={`${process.env.NEXT_PUBLIC_PICTURE}/${franchising?.data?.image}`}
                title={franchising?.data?.text1}
              />
            </div>
            <div className="px-[102px] xl:px-0 mt-[80px]  w-full">
              <SharedFrForm
                text1={form_text1}
                text2={form_text2}
                pl_name={pl_name}
                pl_surname={pl_surname}
                btn_name={btn_name}
                btn_sending={btn_sending}
                pl_company={pl_company}
                params={params}
                contact_form_1={contact_form_1}
                swal_error_8={swal_error_8}
                swal_error_1={swal_error_1}
              />
              <div className="mt-[80px] franchaising">
                <Paragraph
                  customStyle={`text-[16px] md:text-[14px] text-[--color-blue] mt-[24px]`}
                  text={franchising?.data?.text2}
                />
              </div>
            </div>
          </FlexCenter>

          <div className="my-[80px] md:my-[20px] overflow-hidden rounded-[20px]">
            <Section_1_Video
              linear={`/about/lineaar.png`}
              img={`${process.env.NEXT_PUBLIC_PICTURE}/${franchising?.data?.video_image}`}
              height={480}
              imgClass={`h-[480px] object-cover md:h-[300px]`}
              videoLink={franchising?.data?.video}
            />
          </div>
        </Max1200>
      </Section>
    </Main>
  );
};

export default Franchising;
