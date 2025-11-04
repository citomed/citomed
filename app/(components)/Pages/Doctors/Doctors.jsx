"use client";
import { useState, useMemo } from "react";
import DcotorsCategory from "../../Shared/DcotorsCategory/DcotorsCategory";
import Main from "../../ChildComponent/Main/Main";
import Section from "../../ChildComponent/Section/Section";
import Max1200 from "../../ChildComponent/Max1200/Max1200";
import FlexCenter from "../../ChildComponent/FlexCenter/FlexCenter";
import H2Text from "../../Shared/Texts/H2Text";
import Paragraph from "../../Shared/Paragraph/Paragraph";

import DoctorCard from "./DoctorComponents/DoctorCard";

export default function OurDoctorsPage({
  params,
  data,
  tr_doctor,
  tr_doctors_long,
  doctor_cats,
  not_found,
}) {
  const ALL_CATEGORIES_ID = null;

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(ALL_CATEGORIES_ID);

  const dropdownCategories = useMemo(() => {
    return [
      {
        id: ALL_CATEGORIES_ID,
        categoryName: doctor_cats,
        category: "all",
      },
      ...data?.map((cat) => ({
        id: cat?.category?.id,
        categoryName: cat?.category?.name,
        category: cat?.name?.toLowerCase(),
      })),
    ];
  }, []);

  const doctorsToDisplay = useMemo(() => {
    if (selectedCategoryId === ALL_CATEGORIES_ID) {
      return data.flatMap((docs) =>
        docs?.category?.doctors?.map((doc) => ({
          ...doc,
          uniqueId: `${docs?.category?.id}-${doc.id}`,
        }))
      );
    }

    const selectedCategory = data?.find(
      (cat) => cat?.category?.id === selectedCategoryId
    );

    return selectedCategory
      ? selectedCategory?.category?.doctors.map((doc) => ({
          ...doc,
          uniqueId: `${selectedCategory?.category?.id}-${doc?.id}`,
        }))
      : [];
  }, [selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <Main>
        <Section ngClass="mb-[80px] md:px-[10px] min-h-[60vh]">
          <Max1200>
            <FlexCenter customClass={`flex-col`}>
              <H2Text
                text={tr_doctor}
                customStyle={`text-[--color-blue] text-[36px] 1xl:text-[30px]  lg:text-[25px] md:text-[20px] font-['SFProText-Bold']`}
              />
              <Paragraph
                customStyle={`text-[16px] md:text-[14px] text-[--color-5b] mt-[24px] md:mt-[10px] text-center w-[50%] lg:w-full`}
                text={tr_doctors_long}
              />
              <div className="flex justify-center items-center my-[80px] lg:my-[40px] md:my-[20px] flex-col w-full ">
                <DcotorsCategory
                  categoriesData={dropdownCategories}
                  selectedCategoryId={selectedCategoryId}
                  onCategorySelect={handleCategorySelect}
                  doctor_cats={doctor_cats}
                />
              </div>
            </FlexCenter>
            <div>
              {doctorsToDisplay.length > 0 ? (
                <div className="grid grid-cols-12 gap-x-[32px] gap-y-[80px] lg:gap-y-[30px] ">
                  {doctorsToDisplay?.map((doctor) => (
                    <DoctorCard
                      key={doctor?.uniqueId}
                      doctor={doctor}
                      params={params}
                      doctor_img={`w-full h-full object-cover div_transition group-hover:scale-110`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 text-[25px]">
                  {not_found}
                </p>
              )}
            </div>
          </Max1200>
        </Section>
      </Main>
    </>
  );
}
