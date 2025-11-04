"use client";
import { useEffect, useState } from "react";
import H2Text from "../../Shared/Texts/H2Text";
import Image from "next/image";
import { useDispatch } from "react-redux";
import SharedPrice from "../../Shared/SharedPrice/SharedPrice";
import { removeCheckupFromCart } from "../../Store/cart";

const BasketItemCart = ({ data, params }) => {
  const { productId, valyuta } = data;
  const [detail, setDetail] = useState([]);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/checkups`)
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, [valyuta, params]);

  useEffect(() => {
    if (productId) {
      if (Array.isArray(allData)) {
        const findDetail = allData?.find((item) => item.id === productId);
        setDetail(findDetail || null);
      } else {
        console.warn("Chekcups data is not available or not an array.");
        setDetail(null);
      }
    }
  }, [productId, allData]);

  const handleRemoveItem = () => {
    if (productId) {
      dispatch(removeCheckupFromCart({ productId }));
    }
  };

  return (
    <div className=" px-[32px] py-[30px] xl:px-[20px] lg:py-[15px] md:py-[10px] basketItem ">
      <div className="flex justify-between w-full items-center">
        <H2Text
          text={detail?.basketItem}
          long_text={detail?.title}
          customStyle={`text-[--color-blue] text-[22px]  1xl:text-[18px] lg:text-[14px]  w-[68%] font-['SFProText-Bold'] line-clamp-1`}
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

export default BasketItemCart;
