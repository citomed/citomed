import Image from "next/image";

import Link from "next/link";
import { toSlug } from "../SharedToSlug/SharedToSlug";

const RoundedPicture = ({
  item = "",
  name,
  width,
  height,
  params,
  picture,
  img2,
  customClass,
  roundedPicWidth = "w-[250px]  h-[250px] ",
  doctor_img,
}) => {
  const slug = toSlug(item?.name);

  return (
    <>
      {item?.file && (
        <Link
          href={`/${params}/hekimler/${item?.id}/${slug}`}
          className={`flex-col flex col-span-3`}
        >
          <div
            className={`border-[10px] bg-[--bg-55] border-[#a9d7ea] rounded-full overflow-hidden relative ${customClass}`}
          >
            {item?.file && (
              <div className="w-[250px]  h-[250px] 1xl:w-[200px] 1xl:h-[200px]  rounded-full overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_PICTURE}/${item?.file}`}
                  alt={name || item?.name}
                  width={width}
                  height={height}
                  className={`${doctor_img}`}
                />
                <Image
                  src={img2}
                  width={width}
                  alt={name || item?.name}
                  height={height}
                  className="absolute top-0  left-0 right-0 w-full h-max"
                />
              </div>
            )}
          </div>
        </Link>
      )}
      {picture && (
        <div className={`flex-col flex col-span-3`}>
          <div
            className={`border-[10px] bg-[--bg-55] border-[#a9d7ea] rounded-full overflow-hidden relative ${customClass}`}
          >
            {picture && (
              <div
                className={` ${roundedPicWidth} rounded-full overflow-hidden`}
              >
                <Image
                  src={picture}
                  alt={name || item?.name}
                  width={width}
                  height={height}
                  className={`${doctor_img} div_transition group-hover:scale-110`}
                />
                <Image
                  src={img2}
                  width={width}
                  alt={name || item?.name}
                  height={height}
                  className="absolute top-0  left-0 right-0 w-full h-max"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RoundedPicture;
