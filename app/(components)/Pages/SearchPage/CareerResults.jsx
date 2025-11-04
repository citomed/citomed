import SearchCard from "./SearchCard";

const CareerResults = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`karyera`} cur={cur} />
        ))}
    </>
  );
};

export default CareerResults;
