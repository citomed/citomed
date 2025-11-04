import SearchCard from "./SearchCard";

const NewsResults = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`xeberler`} cur={cur} />
        ))}
    </>
  );
};

export default NewsResults;
