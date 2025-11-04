"use client";
import { useSelector } from "react-redux";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import Main from "../../ChildComponent/Main/Main";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import Section from "../../ChildComponent/Section/Section";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import H2Text from "../../Shared/Texts/H2Text";
import { Provider } from "react-redux";
import { store } from "../../Store";
import ChekcupItem from "./ChekcupItem";
import SharedBasketIcon from "../../Shared/SharedBasketIcon/SharedBasketIcon";
import CkecupIocn from "./CkecupIocn";

const Chekcups = ({
  tr_checkup,
  chekcups_long,
  tr_includes,
  data,
  params,
  added,
  add,
  valyuta,
}) => {
  return (
    <>
      <Provider store={store}>
        <Main>
          <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
            <Max1200>
              <FlexCenter customClass={`flex-col`}>
                <H2Text
                  text={tr_checkup}
                  customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
                />
                <Paragraph
                  customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
                  text={chekcups_long}
                />
              </FlexCenter>

           
              <div className="my-[80px] md:my-[30px]">
                <div className="grid grid-cols-12 gap-[24px]">
                  {data &&
                    data.map((cur, i) => (
                      <ChekcupItem
                        tr_includes={tr_includes}
                        key={i}
                        cur={cur}
                        params={params}
                        added={added}
                        add={add}
                        valyuta={valyuta}
                      />
                    ))}
                </div>
              </div>
            </Max1200>

            <CkecupIocn params={params} />
          </Section>
        </Main>
      </Provider>
    </>
  );
};

export default Chekcups;
