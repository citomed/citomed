import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import SharedBlogAndNewsItemCart from "../../Shared/SharedBlogAndNewsItemCart";

const BlogItem = ({
  instagram,
  data,
  similar_blogs,
  single_images,
  read_more,
}) => {
  return (
    <Main>
      <Section ngClass="min-h-screen">
        <Max1200>
          <SharedBlogAndNewsItemCart
            h2Class={`text-[26px] lg:text-[18px]`}
            img={instagram}
            data={data}
            text3={similar_blogs}
            single_images={single_images}
            hrefName="bloq"
          />
        </Max1200>
      </Section>
    </Main>
  );
};

export default BlogItem;
