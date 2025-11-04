import SearchSpinner from "../../Shared/SearchSpinner/SearchSpinner";
import NewsResults from "./NewsResults";
import DosctorsResults from "./DosctorsResults";
import LabaratoryTest from "./LabaratoryTest";

import ServicesData from "./ServicesData";
import XidmetlerData from "./XidmetlerData";
import BlogResults from "./BlogResults";
import CareerResults from "./CareerResults";

const SearchPage = ({
  notFound,
  category,
  xidmetler,
  laboratorytests,
  teams,
  news,
  blogs,
  loading,
  inputValue,
  netice,
  params,
  career,
}) => {
  const isAllDataEmpty =
    !category.length &&
    !xidmetler.length &&
    !laboratorytests.length &&
    !teams.length &&
    !news.length &&
    !career.length &&
    !blogs.length;


  return (
    <>
      {inputValue?.trim() !== "" && (
        <div className="absolute left-0 right-0 top-[60px] bg-[#fff] border border-[--bg-55] rounded-[15px] overflow-hidden">
          {loading && <SearchSpinner />}
          {!loading && notFound && inputValue?.trim() !== "" && (
            <p className="px-2 py-4  text-[--color-blue] text-[16px] w-full flex items-center justify-center  font-semibold">
              {netice}
            </p>
          )}
        </div>
      )}

      {!isAllDataEmpty && (
        <div className="absolute left-0 right-0 top-[56px] md:top-[50px] md:mx-3 border border-[--bg-55] rounded-b-[10px] bg-[#fff]">
          {(!!category.length ||
            !!xidmetler.length ||
            !!laboratorytests.length ||
            !!teams.length ||
            !!news.length ||
            !!career.length ||
            !!blogs.length) && (
            <ul
              className={`flex flex-col ${
                category?.length < 4 &&
                xidmetler?.length < 4 &&
                laboratorytests?.length < 4 &&
                career?.length < 4 &&
                teams?.length < 4 &&
                news?.length < 4 &&
                blogs?.length < 4
                  ? ""
                  : "h-[200px] overflow-y-scroll"
              }`}
            >
              <ServicesData params={params} data={category} />
              <XidmetlerData params={params} data={xidmetler} />
              <LabaratoryTest params={params} data={laboratorytests} />
              <DosctorsResults params={params} data={teams} />
              <NewsResults params={params} data={news} />
              <BlogResults params={params} data={blogs} />
              <CareerResults params={params} data={career} />
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
