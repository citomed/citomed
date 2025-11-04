"use client";
import Link from "next/link";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import SharedReklam from "../../Shared/SahredReklam/SharedReklam";

const Footer = ({
  params,
  footer_card_1,
  footer_card_2,
  footer_card_3,
  linkName,
  slug = "",
  special_bg = "bg-transparent border border-[#fff]",
  reserved,
  settings,
}) => {
  const socials = [
    {
      id: 1,
      link: settings?.facebook,
      icon: <FaFacebook className="" />,
    },
    {
      id: 2,
      link: settings?.instagram,
      icon: <FaInstagram />,
    },
    {
      id: 3,
      link: settings?.youtube,
      icon: <FaYoutube />,
    },
    {
      id: 4,
      link: settings?.linkedin,
      icon: <FaLinkedinIn />,
    },
  ];

  const pathName = usePathname();
  const showOnPaths = [
    `/${params}/services`,
    `/${params}/${slug}`,
    `/${params}/outpatient`,
    `/${params}/privateservives`,
    `/${params}/laboratory-tests`,
    `/${params}/doctors`,
  ];
  const year = new Date().getFullYear();
  return (
    <>
      {showOnPaths.includes(pathName) && (
        <SharedReklam
          linkBg={`${special_bg}`}
          h2Text={footer_card_1}
          linkText={footer_card_3}
          customClass={`beforesection relative after:bg-[url('/home/section3/bg.png')] bg-[#0d2a68] w-full py-[80px]`}
          link={`/${params}/${linkName}`}
          pText={footer_card_2}
        />
      )}
      <footer className="">
        <div className="bg-[--color-blue] py-[40px] md:py-[20px]">
          <Max1200>
            <div className="flex justify-between items-center  lg:flex-wrap lg:flex-col">
              <div className="logo lg:mb-[30px]">
                <Link href={`/${params}`}>
                  <Image
                    src={"/logo/logo_new_2.svg"}
                    width={180}
                    height={180}
                    alt="logo logo_white"
                    className="md:max-w-[100px]"
                  />
                </Link>
              </div>
              <div className="soials  w-full flex justify-center items-center lg:mb-[30px]">
                <ul className="flex items-center gap-4 justify-center  pl-[70px] lg:pl-0">
                  {socials?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={`${item?.link}`}
                        target="_blank"
                        className="rounded-full bg-[--bg-55] text-[--color-blue]  w-[34px] h-[34px] md:w-[25px] md:h-[25px]  md:text-[16px] text-[20px] flex items-center justify-center"
                      >
                        {item?.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex items-center gap-[10px]">
                <li>
                  <Image
                    src={"/footer/visa.svg"}
                    width={60}
                    height={60}
                    alt="visa"
                    className="md:max-w-[50px]"
                  />
                </li>
                <li>
                  <Image
                    src={"/footer/master1.svg"}
                    width={30}
                    height={30}
                    alt="master1"
                    className="md:max-w-[20px]"
                  />
                </li>
                <li>
                  <Image
                    src={"/footer/master2.svg"}
                    width={30}
                    height={30}
                    alt="master2"
                    className="md:max-w-[20px]"
                  />
                </li>
                <li>
                  <Image
                    src={"/footer/paypal.svg"}
                    width={120}
                    height={120}
                    alt="visa"
                    className="md:max-w-[90px]"
                  />
                </li>
              </ul>
            </div>
          </Max1200>
        </div>
        <div className="bg-[--bg-b4] p-[8px] flex items-center justify-center text-center text-[#fff] text-[14px]">
          {reserved} <span className="pl-[10px]">{year}</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
