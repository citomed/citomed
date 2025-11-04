"use client";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServicesData from "../SearchPage/ServicesData";
import XidmetlerData from "../SearchPage/XidmetlerData";
import LabaratoryTest from "../SearchPage/LabaratoryTest";
import DosctorsResults from "../SearchPage/DosctorsResults";
import NewsResults from "../SearchPage/NewsResults";
import BlogResults from "../SearchPage/BlogResults";
import CareerResults from "../SearchPage/CareerResults";

const SearchsPage = ({ params, found_search_1, found_search_2 }) => {
  const [category, setCategory] = useState([]);
  const [xidmetler, setXidmetler] = useState([]);
  const [laboratorytests, setLaboratoryTests] = useState([]);
  const [teams, setTeams] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [career, setCareer] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams?.get("q");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.category);
        setXidmetler(data?.xidmetler);
        setLaboratoryTests(data?.laboratorytests);
        setTeams(data?.teams);
        setNews(data?.news);
        setBlogs(data?.blogs);
        setCareer(data?.career);
      });
  }, [query]);

  return (
    <Main>
      <Section ngClass="min-h-[70vh] md:min-h-[50vh] md:px-[20px]">
        <Max1200>
          <div className="search_page relative pl-4 ">
            <div className="flex items-center text-[--color-blue] text-[32px] md:text-[20px]">
              <h3 className="font-[600] text-[--color-blue] text-[32px] md:text-[16px] pr-3">
                "{query}"
              </h3>
              <p className="text-[--color-blue] text-[32px] md:text-[20px]">
                {found_search_1}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-2xl text-[#003B71]">
              <div className="flex items-center gap-2">
                <p className="text-[--color-blue] text-[32px] md:text-[16px]">
                  {(category && category?.length) +
                    (xidmetler && xidmetler?.length) +
                    (laboratorytests && laboratorytests?.length) +
                    (teams && teams?.length) +
                    (news && news?.length) +
                    (blogs && blogs?.length) +
                    (career && career?.length)}
                </p>
                <p className="text-[--color-blue] text-[32px] md:text-[16px]">
                  {found_search_2}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-[44px] md:mt-[20px]">
            <ul className="flex flex-col ">
              <ServicesData params={params} data={category} />
              <XidmetlerData params={params} data={xidmetler} />
              <LabaratoryTest params={params} data={laboratorytests} />
              <DosctorsResults params={params} data={teams} />
              <NewsResults params={params} data={news} />
              <BlogResults params={params} data={blogs} />
              <CareerResults params={params} data={career} />
            </ul>
          </div>
        </Max1200>
      </Section>
    </Main>
  );
};

export default SearchsPage;
