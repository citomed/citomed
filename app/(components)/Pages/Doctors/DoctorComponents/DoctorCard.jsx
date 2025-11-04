import { toSlug2 } from "@/app/(components)/Shared/SharedToSlug/SharedToSlug";
import H2Text from "@/app/(components)/Shared/Texts/H2Text";
import Link from "next/link";

import Paragraph from "@/app/(components)/Shared/Paragraph/Paragraph";

const DoctorCard = ({ doctor, params, doctor_img }) => {
  const convertToSLug = toSlug2(doctor?.name);

  return (
    <Link
      href={`/${params}/hekimler/${doctor?.id}/${convertToSLug}`}
      className={`flex-col flex col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12`}
    >
      <div className="flex justify-center items-center group  ">
        <div
          className={`border-[10px] bg-[--bg-55] w-[250px] flex justify-center items-center h-[250px] border-[#a9d7ea] rounded-full overflow-hidden relative `}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_PICTURE}/${doctor?.file}`}
            alt={doctor?.name}
            className={`${doctor_img}`}
          />
          <img
            src={"/home/section5/linear.png"}
            alt={doctor?.name}
            className="absolute top-0  left-0 right-0 w-full h-full "
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[24px]">
        <H2Text
          text={doctor?.name}
          customStyle={`text-[--color-blue] text-center text-[18px] font-['SFProText-Bold']`}
        />
        <Paragraph
          customStyle={`mt-[12px] text-center text-[--color-5b] text-[14px]`}
          text={doctor?.position}
        />
      </div>
    </Link>
  );
};

export default DoctorCard;
