import Image from "next/image";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import SharedContactForm from "../../Shared/SharedForm/SharedContactForm";
import H2Text from "../../Shared/Texts/H2Text";
import Link from "next/link";

import ServiceGridITem from "../../Shared/ServicesGrid/ServiceGridITem";

const Contact = ({
  contact_text_1,
  contact_text_1_long,
  tr_offer,
  tr_comment,
  tr_fullname,
  tr_message,
  btn_send,
  btn_sending,
  write_on_whatsapp,
  contact_blue_card_text1,
  contact_blue_card_text2,
  data,
  params,
  read_more,
  contact_form_1,
  swal_error_1,
  swal_error_8,
  contact_time,
}) => {
  const contacts = [
    {
      id: 1,
      icon: "/contact/phone.svg",
      text: `${data?.settings?.number}`,
      link: `${data?.settings?.number}`,
    },
    {
      id: 2,
      icon: "/contact/mail.svg",
      text: `${data?.settings?.email}`,
      link: `${data?.settings?.email}`,
    },
    {
      id: 3,
      icon: "/contact/loc.svg",
      text: data?.settings?.adresslang,
      link: data?.settings?.map,
    },
    {
      id: 4,
      icon: "/contact/clock.svg",
      text: `${contact_time}`,
      link: null, // Bu öğe bir H3 etiketi olarak oluşturulacak
    },
  ];

  return (
    <Main>
      <Section ngClass="">
        <Max1200>
          <FlexCenter customClass={`flex-col md:px-[10px]`}>
            <H2Text
              text={contact_text_1}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
              text={contact_text_1_long}
            />
          </FlexCenter>
          <div className="mt-[80px] md:mt-[20px] md:px-[10px]">
            <div className="grid grid-cols-12  gap-[24px]">
              <div className="col-span-7 xl:col-span-12 ">
                <SharedContactForm
                  params={params}
                  tr_offer={tr_offer}
                  tr_comment={tr_comment}
                  tr_fullname={tr_fullname}
                  tr_message={tr_message}
                  btn_send={btn_send}
                  btn_sending={btn_sending}
                  contact_form_1={contact_form_1}
                  swal_error_8={swal_error_8}
                  swal_error_1={swal_error_1}
                />
              </div>
              <div className="col-span-5 xl:col-span-12">
                <div className="flex justify-between h-full flex-col">
                  <div className=" bg-[--bg-55] rounded-[20px] p-[32px] md:p-[16px]">
                    <ul className="flex flex-col justify-between h-full gap-[32px] md:gap-[16px]">
                      {contacts?.map((item, i) => {
                        const displayText = item.text;
                        let element;

                        // YENİ: link'in null olup olmadığını kontrol et
                        if (item.link === null) {
                          element = (
                            <h3 className="text-[#fff] text-[22px] md:text-[18px]">
                              {displayText}
                            </h3>
                          );
                        } else if (
                          item.link?.startsWith("http://") ||
                          item.link?.startsWith("https://")
                        ) {
                          element = (
                            <a
                              className="text-[#fff] text-[22px] md:text-[18px]"
                              target="_blank"
                              href={item.link}
                              rel="noopener noreferrer"
                            >
                              {displayText}
                            </a>
                          );
                        } else if (item.link?.includes("@")) {
                          const mailLink = item.link;
                          element = (
                            <a
                              className="text-[#fff] text-[22px] md:text-[18px]"
                              target="_blank"
                              href={`mailto:${mailLink}`}
                              rel="noopener noreferrer"
                            >
                              {displayText}
                            </a>
                          );
                        } else {
                          const telLink = item.link?.replace(/\s+/g, "");
                          element = (
                            <a
                              target="_blank"
                              href={`tel:${telLink}`}
                              className="text-[#fff] text-[22px] md:text-[18px]"
                            >
                              {displayText}
                            </a>
                          );
                        }

                        return (
                          <li
                            key={item.id || i}
                            className="flex items-center  gap-[24px]"
                          >
                            <span className=" flex justify-center items-center   ">
                              <div className="w-[48px] h-[48px] rounded-full flex bg-[#fff] justify-center items-center ">
                                <Image
                                  width={24}
                                  height={24}
                                  src={item?.icon}
                                  alt={item?.text}
                                />
                              </div>
                            </span>
                            <div className="col-span-10 flex items-center ">
                              {element}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="xl:mt-[30px]  h-max rounded-[20px] bg-[--bg-wp] w-full">
                    <Link
                      href={`https://wa.me/${data?.settings?.number}`}
                      target="_blank"
                      className="flex justify-between items-center w-full h-full  p-[32px] md:p-[16px]"
                    >
                      <div className="flex items-center gap-[24px]">
                        <Image
                          width={48}
                          height={48}
                          src={`/contact/whatsapp.svg`}
                          alt="whatsapp number"
                          className="lg:w-[35px] lg:h-[35px]"
                        />
                        <h3 className="text-[#fff] text-[22px] lg:text-[18px] capitalize font-[500] w-max">
                          {write_on_whatsapp}
                        </h3>
                      </div>
                      <span className="border border-[#fff] rounded-[60px] px-[40px] py-[12px] h-max flex items-center justify-center ">
                        <Image
                          width={12}
                          height={12}
                          src={`/right.svg`}
                          alt="whatsapp number"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Max1200>
        <div className="mt-[80px] bg-[--color-blue] py-[80px] lg:py-[40px]">
          <Max1200>
            <H2Text
              text={contact_blue_card_text1}
              customStyle={`text-[#fff] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px] md:text-[14px]  w-[70%] lg:w-full`}
              text={contact_blue_card_text2}
            />
            <div className="mt-[80px]">
              <ul className="grid grid-cols-12 gap-10 ">
                {data &&
                  data?.random_services?.map((item, i) => (
                    <ServiceGridITem
                      key={i}
                      item={item}
                      customStyle={
                        "col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12"
                      }
                      params={params}
                      readMore={read_more}
                      services_slug={"ozel-xidmetler"}
                    />
                  ))}
              </ul>
            </div>
          </Max1200>
        </div>
      </Section>
    </Main>
  );
};

export default Contact;
