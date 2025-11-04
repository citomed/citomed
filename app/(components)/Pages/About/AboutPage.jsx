import React from "react";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import AboutSection1 from "../../PagesComponent/AboutPage/AboutSection1";
import Main from "../../ChildComponent/Main/Main";
import AboutSection2 from "../../PagesComponent/AboutPage/AboutSection2";
import AboutSection3 from "../../PagesComponent/AboutPage/AboutSection3";

const AboutPage = ({ data, our_goal, out_values }) => {
  return (
    <Main>
      <Section>
        <Max1200>
          <AboutSection1 data={data} />
        </Max1200>
        <AboutSection2 our_goal={our_goal} data={data} />
        <Max1200>
          <AboutSection3 data={data} out_values={out_values} />
        </Max1200>
      </Section>
    </Main>
  );
};

export default AboutPage;
