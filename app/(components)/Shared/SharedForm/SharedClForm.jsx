"use client";
import H2Text from "../Texts/H2Text";
import SharedInput from "../SahredInput/SharedInput";
import Paragraph from "../Paragraph/Paragraph";
import SharedButton from "../SharedButton/SharedButton";
import SharedInputWithtext from "../Sharedprefix/SharedInputWithtext";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const SharedClForm = ({
  customClass,
  text1,
  text2,
  pl_name,
  pl_surname,
  btn_name,
  pl_company,
  btn_sending,
  contact_form_1,
  swal_error_8,
  swal_error_1,
  params,
}) => {
  const [form, setForm] = useState({
    form_type: text1,
    ad: "",
    soyad: "",
    number: "",
    sirket_adi: "",
    number_prefix: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      // Yalnızca rakamlara izin ver
      const newValue = value.replace(/[^0-9]/g, "");
      setForm({
        ...form,
        [name]: newValue,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/korporativ-form`,
      data: form,
    })
      .then((response) => {
        if (response.data.message) {
          Swal.fire({
            icon: "success",
            title: `${contact_form_1}`,
            confirmButtonText: `${swal_error_8}`,
            customClass: { confirmButton: "text-black-700" },
          });
          setForm({
            form_type: "",
            ad: "",
            soyad: "",
            number: "",
            sirket_adi: "",
            number_prefix: "",
          });
          setLoading(false);
        }
      })
      .catch(() => {
        Swal.fire(`${swal_error_1}`, ``, "error");
        setLoading(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${customClass} bg-[--color-blue] rounded-[20px] p-[32px] md:p-[16px] w-full`}
      >
        <H2Text
          text={text1}
          customStyle={`text-[#fff] text-[24px] lg:text-[18px] font-[600] font-['SFProText-Semibold'] mb-[16px]`}
        />
        <Paragraph text={text2} customStyle={`text-[#fff] text-[18px] md:text-[14px]`} />
        <div className="grid grid-cols-12 gap-x-[28px] md:gap-x-[14px] gap-y-[16px] mt-[40px]">
          <div className="col-span-6 lg:col-span-12 flex flex-col gap-y-[16px]">
            <SharedInput
              customStyle={`w-full px-[13px] py-[16px] rounded-[10px] placeholder:text-[16px]`}
              placeholder={pl_name}
              value={form.ad}
              type={`text`}
              id={`name`}
              name={`ad`}
              onChange={handleChange}
            />
            <SharedInput
              customStyle={`w-full px-[13px] py-[16px] rounded-[10px] placeholder:text-[16px]`}
              placeholder={pl_surname}
              value={form.soyad}
              type={`text`}
              id={`surname`}
              name={`soyad`}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-6 lg:col-span-12 ">
            <SharedInput
              customStyle={`w-full px-[13px] py-[16px] rounded-[10px] placeholder:text-[16px]`}
              placeholder={pl_company}
              value={form.sirket_adi}
              type={`text`}
              id={`company`}
              name={`sirket_adi`}
              onChange={handleChange}
            />
            <SharedInputWithtext
              numberprefix={`(0XX)`}
              width="w-full top-[6rem]"
              placeholder={"123 45 67"}
              id={`number`}
              name={`number`}
              type={`text`}
              onChange={handleChange}
              value={form.number}
              onPrefixSelect={(selectedPrefix) => {
                setForm((prev) => ({
                  ...prev,
                  number_prefix: selectedPrefix,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-[32px]">
          <SharedButton
            text={loading ? btn_sending : btn_name}
            customStyle={`bg-[--bg-55]  capitalize text-[16px] text-[#fff] rounded-[60px] px-[45px] py-[17.5px] md:py-[8px] md:px-[30px]`}
          />
        </div>
      </form>
    </>
  );
};

export default SharedClForm;
