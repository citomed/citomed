"use client";
import { useEffect, useState } from "react";
import H2Text from "../../Shared/Texts/H2Text";
import Image from "next/image";
import SharedPrice from "../../Shared/SharedPrice/SharedPrice";
import { removeTestFromCart } from "../../Store/cart";
import { useDispatch } from "react-redux";

const BasketTestItem = ({ data, params }) => {
  const { productId, lab_id, lab_slug, valyuta, lab_cat_name } = data;
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/lab/${lab_id}/${lab_slug}`
    )
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, [lab_id, lab_slug, valyuta, params]);

  useEffect(() => {
    if (productId && Array.isArray(allData?.data)) {
      const findDetail = allData.data?.find((item) => item.id === productId);
      setDetail(findDetail || null);
    }
  }, [productId, allData]);

  const handleRemoveItem = () => {
    if (productId) {
      dispatch(removeTestFromCart({ productId }));
    }
  };

  return (
    <div className=" px-[32px] xl:p-[20px] py-[30px] lg:py-[15px] md:py-[10px] basketItem ">
      <div className="flex justify-between w-full items-center">
        <H2Text
          text={detail?.basketItem}
          long_text={lab_cat_name}
          customStyle={`text-[--color-blue] text-[22px] 1xl:text-[18px] lg:text-[14px] font-['SFProText-Bold'] w-[68%]  line-clamp-1`}
        />
        <div className="flex items-center gap-[16px]">
          <SharedPrice text1={detail?.price} text2={data?.valyuta} />
          <button
            onClick={handleRemoveItem}
            className="w-[52px] bg-[--bg-red] h-[52px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center"
          >
            <Image
              width={24}
              height={24}
              alt="delete"
              src={`/delete.svg`}
              className="xl:w-[18px]  h-[18px] lg:w-[12px] lg:h-[12px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketTestItem;
