import Link from "next/link";
import React from "react";
import SearchCard from "./SearchCard";

const XidmetlerData = ({ data, params }) => {
  return (
    <>
      {data &&
        data?.map((cur, i) => (
          <SearchCard key={i} params={params} link={`ozel-xidmetler`} cur={cur} />
        ))}
    </>
  );
};

export default XidmetlerData;
