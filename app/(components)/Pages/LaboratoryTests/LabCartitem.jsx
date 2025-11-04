"use client";

import { useDispatch, useSelector } from "react-redux";
import SharedButton from "../../Shared/SharedButton/SharedButton";
import SharedPrice from "../../Shared/SharedPrice/SharedPrice";
import H2Text from "../../Shared/Texts/H2Text";
import { useMemo } from "react";
import { addToCardTest } from "../../Store/cart";
import { toSlug2 } from "../../Shared/SharedToSlug/SharedToSlug";

const LabCartitem = ({ cur, valyuta, added, add, head_title }) => {
  const dispatch = useDispatch();
  const tests = useSelector((store) => store.test.items_tests);

  const isProductInCart = useMemo(() => {
    if (!cur || typeof cur.id === "undefined") return false;
    return tests.some((item) => item.productId === cur.id);
  }, [tests, cur]);

  const slugItem = toSlug2(cur?.title);

  const handleAddToCard = () => {
    if (!isProductInCart && cur?.id) {
      dispatch(
        addToCardTest({
          productId: cur?.id,
          quantity: 1,
          price: cur?.price,
          slug: slugItem,
          lab_id: cur?.laboratory_id,
          lab_name: (cur?.basketItem).toLowerCase(),
          valyuta: valyuta,
          lab_cat_name: head_title,
        })
      );
    }
  };

  const buttonText = isProductInCart ? added : add;
  const buttonStyle = `capitalize text-[14px] text-[#fff] rounded-[60px]  px-[30px] py-[17.5px] md:py-[8px] ${
    isProductInCart ? "bg-[--bg-wp] cursor-default" : "bg-[#009ADE]"
  }`;
  return (
    <>
      <div className="col-span-4 lg:col-span-6 md:col-span-12 bg-[--bg-f6] rounded-[10px] p-[24px] flex flex-col justify-between">
        <div className="flex flex-col">
          <H2Text
            text={cur?.title}
            customStyle={`text-[--color-blue] text-[22px] 1xl:text-[18px] md:text-[15px] font-['SFProText-Bold'] line-clamp-3`}
          />
        </div>
        <div className="flex w-full items-center justify-between mt-[40px]">
          <SharedPrice text1={cur?.price} text2={valyuta} />

          <SharedButton
            handleAddToCard={handleAddToCard}
            text={buttonText}
            customStyle={`flex justify-between ${buttonStyle}`}
            disabled={isProductInCart}
            addedText={added}
          />
        </div>
      </div>
    </>
  );
};

export default LabCartitem;
