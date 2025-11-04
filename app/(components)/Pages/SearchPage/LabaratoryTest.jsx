import SearchCard from "./SearchCard";

const LabaratoryTest = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`lab`} cur={cur} />
        ))}
    </>
  );
};

export default LabaratoryTest;
