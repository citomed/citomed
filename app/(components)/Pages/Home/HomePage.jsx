import Main from "../../ChildComponent/Main/Main";
import Section_1 from "../../PagesComponent/HomePage/Section1/Section_1";
import Section2 from "../../PagesComponent/HomePage/Section2/Section2";
import Section3 from "../../PagesComponent/HomePage/Section3/Section3";
import Section4 from "../../PagesComponent/HomePage/Section4/Section4";
import Section5 from "../../PagesComponent/HomePage/Section5/Section5";

const HomePage = ({
  data_sldier,
  data_translate,
  data_insatgram,
  data_services_cats,
  params,
  data_doctots,
  home_doctor_text_1,
  home_doctor_text_2,
  data_xestelikler,
  all_btn,
  home_sections,
}) => {
  return (
    <Main>
      {home_sections?.section1 === 1 && (
        <Section_1
          ins={home_sections?.ins}
          data_sldier={data_sldier}
          data_insatgram={data_insatgram}
        />
      )}

      {home_sections?.section2 === 1 && (
        <Section2
          data_translate={data_translate}
          data_services_cats={data_services_cats}
          params={params}
        />
      )}
      {home_sections?.section3 === 1 && (
        <Section3
          hid={home_sections?.section2}
          data_translate={data_translate}
          params={params}
        />
      )}

      {home_sections?.section4 === 1 && (
        <Section4
          data_translate={data_translate}
          data={data_xestelikler}
          params={params}
        />
      )}
      {home_sections?.section5 === 1 && (
        <Section5
          data_doctots={data_doctots}
          home_doctor_text_1={home_doctor_text_1}
          home_doctor_text_2={home_doctor_text_2}
          all_btn={all_btn}
          params={params}
          mb={"mb-[80px] md:mb-[40px]"}
        />
      )}
    </Main>
  );
};

export default HomePage;
