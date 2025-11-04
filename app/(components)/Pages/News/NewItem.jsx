import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import SharedBlogAndNewsItemCart from "../../Shared/SharedBlogAndNewsItemCart";

const NewItem = ({
  data,
  instagram,
  random_data,
  similar_news,
  params,
  single_images,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen md:min-h-max md:px-[10px]">
        <Max1200>
          <SharedBlogAndNewsItemCart
            h2Class={`text-[26px] 1xl:text-[20px] lg:text-[18px] md:text-[16px]`}
            img={instagram}
            data={data}
            params={params}
            similar_news={similar_news}
            random_data={random_data}
            single_images={single_images}
            hrefName="xeberler"
          />
        </Max1200>
      </Section>
    </Main>
  );
};

export default NewItem;
