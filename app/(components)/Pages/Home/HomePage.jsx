import Main from "../../ChildComponent/Main/Main";
import Section_1 from "../../PagesComponent/HomePage/Section1/Section_1";
import Section2 from "../../PagesComponent/HomePage/Section2/Section2";
import Section3 from "../../PagesComponent/HomePage/Section3/Section3";
import Section4 from "../../PagesComponent/HomePage/Section4/Section4";
import Section5 from "../../PagesComponent/HomePage/Section5/Section5";

const   HomePage = ({
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
}) => {
  return (
    <Main>
      <Section_1 data_sldier={data_sldier} data_insatgram={data_insatgram} />
      <Section2
        data_translate={data_translate}
        data_services_cats={data_services_cats}
        params={params}
      />
      <Section3 data_translate={data_translate} params={params} />
      <Section4
        data_translate={data_translate}
        data={data_xestelikler}
        params={params}
      />
      <Section5
        data_doctots={data_doctots}
        home_doctor_text_1={home_doctor_text_1}
        home_doctor_text_2={home_doctor_text_2}
        all_btn={all_btn}
        params={params}
        mb={"mb-[80px] md:mb-[40px]"}
      />
    </Main>
  );
};

export default HomePage;
