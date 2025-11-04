"use client";
import { useSelector } from "react-redux";
import BasketItemCart from "./BasketItemCart";
import BasketTestItem from "./BasketTestItem";
import { useState, useEffect, useMemo } from "react";
import H2Text from "../../Shared/Texts/H2Text";
import SharedbasketForm from "../../Shared/SharedForm/SharedbasketForm";

const BasketItem = ({
  params,
  private_name,
  private_surname,
  private_birth,
  private_gender,
  private_when_came,
  form_men,
  form_women,
  form_text1,
  form_text2,
  btn_name,
  btn_sending,
  valyuta,
  final_price,
  cart_is_empty,
  contact_form_1,
  swal_error_8,
  swal_error_1,
}) => {
  const [isClient, setIsClient] = useState(false);

  const carts = useSelector((store) => store.cart.items_checkup);
  const tests = useSelector((store) => store.test.items_tests);

  const checkup_ids = carts.map((item) => item.productId);
  const tests_ids = tests.map((item) => item.productId);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const combinedItems = useMemo(() => {
    if (!carts || !tests) {
      return [];
    }
    const items = [];
    if (carts.length > 0) {
      carts.forEach((item) =>
        items.push({ ...item, type: "checkup", originalData: item })
      );
    }
    if (tests.length > 0) {
      tests.forEach((item) =>
        items.push({ ...item, type: "test", originalData: item })
      );
    }
    return items;
  }, [carts, tests]);

  const totalPrice = useMemo(() => {
    if (!carts || !tests) {
      return 0;
    }
    let total = 0;
    if (carts.length > 0) {
      total += carts.reduce((accumulator, currentItem) => {
        const price = Number(currentItem.price) || 0;
        const quantity = Number(currentItem.quantity) || 0;
        return accumulator + price * quantity;
      }, 0);
    }
    if (tests.length > 0) {
      total += tests.reduce((accumulator, currentItem) => {
        const price = Number(currentItem.price) || 0;
        const quantity = Number(currentItem.quantity) || 0;
        return accumulator + price * quantity;
      }, 0);
    }
    return total;
  }, [carts, tests]);

  const displayItems = isClient && combinedItems.length > 0;
  const displayEmptyMessage = isClient && combinedItems.length === 0;

  return (
    <div className="grid grid-cols-12 gap-[24px] mt-[40px]">
      <div
        className={`${
          displayItems ? "col-span-7 lg:col-span-12" : "col-span-12"
        }`}
      >
        {!isClient && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="loading">
              <svg width="64px" height="48px">
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="back"
                ></polyline>
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="front"
                ></polyline>
              </svg>
            </div>
          </div>
        )}

        {displayItems && (
          <>
            <div
              className={`flex flex-col bg-[--bg-f6] border border-[--bg-b4] rounded-[20px] overflow-hidden mb-4 ${
                combinedItems?.length > 4 ? "h-[500px] lg:h-[300px] overflow-y-scroll" : ""
              }`}
            >
              {combinedItems.map((item, i) => {
                if (item.type === "checkup") {
                  return (
                    <BasketItemCart
                      params={params}
                      key={`checkup-${item.productId}-${i}`}
                      data={item.originalData}
                    />
                  );
                } else if (item.type === "test") {
                  return (
                    <BasketTestItem
                      params={params}
                      key={`test-${item.productId}-${i}`}
                      data={item.originalData}
                    />
                  );
                }
                return null;
              })}
            </div>
            <div className="bg-[--bg-55] w-full flex justify-between items-center py-[40px] 1xl:py-[20px] lg:py-[10px] px-[32px] mt-[24px] rounded-[20px]">
              <h3 className="text-[--color-blue] text-[20px] 1xl:text-[16px] capitalize">
                {final_price}
              </h3>
              <H2Text
                text={`${totalPrice.toFixed(0)} ${valyuta}`}
                customStyle={`text-[--color-blue] text-[26px] 1xl:text-[20px] font-['SFProText-Bold']`}
              />
            </div>
          </>
        )}

        {displayEmptyMessage && (
          <div className="text-center py-8 ">
            <H2Text
              text={cart_is_empty}
              customStyle={`text-[--color-blue] text-[26px] font-['SFProText-Bold']`}
            />
          </div>
        )}
      </div>

      {displayItems && (
        <div className="col-span-5 lg:col-span-12">
          <div className="bg-[--color-blue] w-full  rounded-[20px] p-[32px] 1xl:p-[20px] h-max">
            <SharedbasketForm
              private_name={private_name}
              private_surname={private_surname}
              private_birth={private_birth}
              private_gender={private_gender}
              private_when_came={private_when_came}
              form_men={form_men}
              form_women={form_women}
              form_text1={form_text1}
              form_text2={form_text2}
              btn_name={btn_name}
              btn_sending={btn_sending}
              checkup_ids={checkup_ids}
              tests_ids={tests_ids}
              contact_form_1={contact_form_1}
              swal_error_8={swal_error_8}
              swal_error_1={swal_error_1}
              params={params}
              toplam_qiymet={totalPrice.toFixed(0)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketItem;
