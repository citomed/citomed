import Link from "next/link";
import ServiceGridITem from "./ServiceGridITem";

const ServicesGrid = ({
  services,
  customStyle,
  ngClass = "gap-6",
  read_more,
  params,
  services_slug,
  text2,
  href,
}) => {

 
  
  return (
    <>
      <div className={`grid grid-cols-12   ${ngClass}`}>
        {services?.map((item, i) => (
          <ServiceGridITem
            key={i}
            params={params}
            item={item}
            customStyle={customStyle}
            readMore={read_more}
            services_slug={services_slug}
          />
        ))}
      </div>
      <div className="hidden md:flex justify-center items-center">
        <Link
          href={`${href}`}
          className={` mt-[40px] flex items-center gap-[20px] border border-[#fff] w-max text-[#fff] rounded-[60px] text-[16px] py-[6px] px-[20px]`}
        >
          <h3>{text2}</h3>
          <img src="/right.svg" alt="right" className={``} />
        </Link>
      </div>
    </>
  );
};

export default ServicesGrid;
