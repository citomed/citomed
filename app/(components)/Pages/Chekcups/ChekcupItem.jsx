"use client";
import { useDispatch, useSelector } from "react-redux";
import IsNew from "../../Shared/IsNew/IsNew";
import SharedButton from "../../Shared/SharedButton/SharedButton";
import H2Text from "../../Shared/Texts/H2Text";
import { addToCardCheckup } from "../../Store/cart";
import { useMemo } from "react";
import { toSlug2 } from "../../Shared/SharedToSlug/SharedToSlug";

const ChekcupItem = ({ cur, tr_includes, added, add, valyuta }) => {
  const dispatch = useDispatch();

  const carts = useSelector((store) => store.cart.items_checkup);

  const isProductInCart = useMemo(() => {
    if (!cur || typeof cur?.id === "undefined") return false;
    return carts.some((item) => item?.productId === cur?.id);
  }, [carts, cur]);

  const slugItem = toSlug2(cur?.title);

  const handleAddToCard = () => {
    if (!isProductInCart && cur?.id) {
      dispatch(
        addToCardCheckup({
          productId: cur?.id,
          slug: slugItem,
          quantity: 1,
          price: cur?.price,
          checkup_id: cur?.checkup_id,
          checkup_name: (cur?.basketItem).toLowerCase(),
          valyuta: valyuta,
        })
      );
    }
  };

  const buttonText = isProductInCart ? added : add;
  const buttonStyle = `capitalize text-[14px] text-[#fff] rounded-[60px] px-[15px] py-[10.5px] ${
    isProductInCart ? "bg-[--bg-wp] cursor-default" : "bg-[--bg-55]"
  }`;

  return (
    <>
      <div className="col-span-4 lg:col-span-6 md:col-span-12 relative group overflow-hidden rounded-[10px] checkup h-full">
        <div className="border border-[--bg-b4] rounded-[10px] flex flex-col  overflow-hidden div_transition h-full">
          <div className="flex justify-between lg:flex-wrap items-center border-b border-[--bg-b4] p-[32px] 1xl:p-[20px] md:p-[14px] div_transition top_card">
            <H2Text
              text={cur?.title}
              customStyle={`text-[--color-blue] text-[22px] lg:text-[18px] md:text-[16px] font-['SFProText-Medium'] lg:mb-4`}
            />
            {cur?.label && (
              <IsNew
                text={cur?.label}
                customStyle={`bg-[#f32735] text-[12px] h-max  rounded-3xl uppercase text-white font-semibold  px-[14px] py-[3px] border-[4px] border-[--bg-b4]`}
              />
            )}
          </div>

          <div className="flex flex-col p-[32px] h-full justify-between  1xl:p-[20px] md:p-[14px] div_transition bottom_card">
            <div>
              <H2Text
                text={tr_includes}
                customStyle={`text-[--color-blue] text-[20px] md:text-[16px] font-['SFProText-Regular'] tr_includes`}
              />
              <div
                className="text-[--color-blue] inc_li !list-disc pl-6 pt-4 text-[15px] md:text-[14px] bottom_list"
                dangerouslySetInnerHTML={{ __html: `${cur?.text}` }}
              />
            </div>
            <div className="flex  justify-between flex-wrap items-center mt-[40px] gap-[10px] relative  z-[200] ">
              <div className="border border-[--color-blue] text_bottom_1  1xl:text-[16px]    font-[600] text-[20px] h-max rounded-[10px] py-[4px] px-[15px] price flex items-center gap-[12px] ">
                <h3 className="w-max  trans_1">{cur?.price}</h3>
                <span className=" trans_1">{valyuta}</span>
              </div>
              <SharedButton
                handleAddToCard={handleAddToCard}
                text={buttonText}
                customStyle={`flex justify-between ${buttonStyle}`}
                disabled={isProductInCart}
                addedText={added}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-100%] w-full h-0 div_transition2 bg-[--color-blue] group-hover:bottom-0 group-hover:h-full rounded-[10px] p-[32px]">
          <div className="flex justify-between flex-col h-full">
            <div>
              <H2Text
                text={tr_includes}
                customStyle={`text-[#ffff] text-[20px] font-['SFProText-Regular'] tr_includes`}
              />
              <div
                className="text-[#ffff] inc_li !list-disc pl-6 pt-4 text-[15px] bottom_list"
                dangerouslySetInnerHTML={{ __html: `${cur?.text}` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChekcupItem;
