"use client";
import { Provider } from "react-redux";
import { store } from "../../Store";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import BasketItem from "./BasketItem";
import H2Text from "../../Shared/Texts/H2Text";

const Basket = ({
  params,
  tr_basket,
  basket_long,
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
  return (
    <Provider store={store}>
      <Main>
        <Section ngClass="min-h-screen">
          <Max1200>
            <H2Text
              text={tr_basket}
              customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] font-['SFProText-Bold']`}
            />
            <Paragraph
              customStyle={`text-[16px] text-[--color-5b] mt-[24px]  w-[50%] lg:w-full`}
              text={basket_long}
            />
            <div className="w-full lg:mb-[80px]">
              <BasketItem
                params={params}
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
                valyuta={valyuta}
                final_price={final_price}
                cart_is_empty={cart_is_empty}
                contact_form_1={contact_form_1}
                swal_error_8={swal_error_8}
                swal_error_1={swal_error_1}
              />
            </div>
          </Max1200>
        </Section>
      </Main>
    </Provider>
  );
};

export default Basket;
