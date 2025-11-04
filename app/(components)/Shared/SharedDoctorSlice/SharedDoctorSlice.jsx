import RoundedPicture from "../RoundedPicture/RoundedPicture";
import H2Text from "../Texts/H2Text";

const SharedDoctorSlice = ({ data_doctots, params, doctor_img }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6  ">
        {data_doctots?.map((item, i) => (
          <div
            key={i}
            className="col-span-3 xl:col-span-4 lg:col-span-6 md:col-span-12 flex  flex-col items-center justify-center "
          >
            <RoundedPicture
              customClass={`group`}
              img2={`/home/section5/linear.png`}
              width={400}
              height={400}
              item={item}
              params={params}
              name={item?.id}
              doctor_img={doctor_img}
            />

            <div className="flex flex-col mt-6 items-center ">
              <H2Text
                text={item?.name}
                customStyle={`text-[18px] 1xl:text-[15px] text-[--color-blue] font-bold`}
              />
              <div
                className="mt-3 uppercase text-center text-[--color-5b] text-[14px]"
                dangerouslySetInnerHTML={{ __html: `${item?.position}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SharedDoctorSlice;
