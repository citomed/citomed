"use client";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";
import { Provider } from "react-redux";
import { store } from "../../Store";
import LabCartitem from "./LabCartitem";
import LabIcon from "./LabIcon";

const LabSingle = ({
  head_title,
  head_title2,
  data,
  valyuta,
  added,
  add,
  params,
}) => {
  return (
    <Provider store={store}>
      <Main>
        <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
          <Max1200>
            <FlexCenter customClass={`flex-col`}>
              <H2Text
                text={head_title}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <Paragraph
                customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
                text={head_title2}
              />
            </FlexCenter>
            <div className="my-[80px] md:my-[40px] grid grid-cols-12 gap-[24px]">
              {data &&
                data?.map((item, i) => (
                  <LabCartitem
                    added={added}
                    add={add}
                    valyuta={valyuta}
                    key={i}
                    cur={item}
                    params={params}
                    head_title={head_title}
                  />
                ))}
            </div>
          </Max1200>
          <LabIcon params={params} />
        </Section>
      </Main>
    </Provider>
  );
};

export default LabSingle;
