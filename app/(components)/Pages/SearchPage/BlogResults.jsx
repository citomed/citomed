import SearchCard from "./SearchCard";

const BlogResults = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`bloq`} cur={cur} />
        ))}
    </>
  );
};

export default BlogResults;
