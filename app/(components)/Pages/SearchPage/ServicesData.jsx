import SearchCard from "./SearchCard";

const ServicesData = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`servis`} cur={cur} />
        ))}
    </>
  );
};

export default ServicesData;
