"use client";
import H2Text from "../Texts/H2Text";
import Paragraph from "../Paragraph/Paragraph";
import SharedInput from "../SahredInput/SharedInput";
import SharedButton from "../SharedButton/SharedButton";
import SharedInputWithtext from "../Sharedprefix/SharedInputWithtext";
import SharedPrefix from "../Sharedprefix/SharedPrefix";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import SharedDataPicker from "../SharedDataPicker/SharedDataPicker";

const SharedDoctorForm = ({
  customClass = "",
  text1,
  text2,
  name,
  surname,
  birthday,
  came,
  private_gender,
  btn_name,
  form_men,
  form_women,
  btn_sending,
  contact_form_1,
  swal_error_8,
  swal_error_1,
  params,
  hekimadi,
  hekimpozisiyasi,
}) => {
  const genders = [
    {
      id: 1,
      selectedItem: 1,
      text: form_men,
    },
    {
      id: 2,
      selectedItem: 2,
      text: form_women,
    },
  ];

  const stripHTML = (html) => html?.replace(/<[^>]*>/g, "").trim();

  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    number: "",
    sirket_adi: "",
    cinsi: "",
    number_prefix: "",
    dogum_tarixi: "",
    gelmek_istediyiniz_tarix: "",
    hekim_adi: hekimadi,
    hekim_pozisiyasi: stripHTML(hekimpozisiyasi),
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
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/hekim-form`,
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
            ad: "",
            soyad: "",
            number: "",
            sirket_adi: "",
            cinsi: "",
            number_prefix: "",
            dogum_tarixi: "",
            gelmek_istediyiniz_tarix: "",
            hekim_adi: "",
            hekim_pozisiyasi: "",
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
    <form
      onSubmit={handleSubmit}
      className={`${customClass} bg-[--color-blue] rounded-[20px] p-[32px] lg:p-[20px] w-full`}
    >
      <H2Text
        text={text1}
        customStyle={`text-[#fff] text-[24px] lg:text-[20px] font-[600] font-['SFProText-Semibold'] mb-[16px]`}
      />
      <Paragraph
        text={text2}
        customStyle={`text-[#fff] text-[18px] lg:text-[16px]`}
      />
      <div className="grid grid-cols-12 gap-x-[28px] gap-y-[16px] mt-[40px]">
        <div className="col-span-6 lg:col-span-12 flex flex-col gap-y-[16px]">
          <SharedInput
            customStyle={`w-full px-[13px] py-[16px] rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
            placeholder={name}
            value={form.ad}
            type={`text`}
            id={`name`}
            name={`ad`}
            onChange={handleChange}
          />
          <SharedInput
            customStyle={`w-full px-[13px] py-[16px] rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
            placeholder={surname}
            value={form.soyad}
            type={`text`}
            id={`surname`}
            name={`soyad`}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-6 lg:col-span-12">
          <div className="">
            <SharedPrefix
              data={genders}
              roundedPrefix={`rounded-[10px]  py-[16px]`}
              numberprefix={private_gender}
              absoluteClass={`top-[4.6rem] w-full  left-0`}
              id={`cinsi`}
              name={`cinsi`}
              type={`text`}
              onChange={handleChange}
              value={form.cinsi}
              onSelect={(selectedPrefix) => {
                setForm((prev) => ({
                  ...prev,
                  cinsi: selectedPrefix,
                }));
              }}
            />
          </div>
          <div className="">
            <SharedInputWithtext
              width="top-[6rem] w-[120px]"
              numberprefix={`(0XX)`}
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
        <div className=" col-span-6 lg:col-span-12 ">
          <div className="  user_select">
            <SharedDataPicker
              text={birthday}
              setForm={setForm}
              customClass={`w-full px-[13px] py-[14px] text-[18px] outline-none rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
              customStyle="absolute right-[15px] top-[14px] "
              form_type={form?.dogum_tarixi}
              onChange={(date) =>
                setForm((prev) => ({
                  ...prev,
                  dogum_tarixi: date?.toISOString().split("T")[0],
                }))
              }
            />
          </div>
        </div>
        <div className=" col-span-6 lg:col-span-12 user_select">
          <SharedDataPicker
            setForm={setForm}
            text={came}
            form_type={form?.gelmek_istediyiniz_tarix}
            customClass={`w-full px-[13px] py-[14px] text-[18px] outline-none rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
            customStyle="absolute right-[15px] top-[14px] "
            onChange={(date) =>
              setForm((prev) => ({
                ...prev,
                gelmek_istediyiniz_tarix: date?.toISOString().split("T")[0], // sadece "YYYY-MM-DD"
              }))
            }
          />
        </div>
      </div>
      <div className="flex justify-end items-center mt-[32px]">
        <SharedButton
          text={loading ? btn_sending : btn_name}
          customStyle={`bg-[--bg-55]  capitalize text-[16px] text-[#fff] rounded-[60px] px-[45px] py-[17.5px] md:py-[8px]`}
        />
      </div>
    </form>
  );
};

export default SharedDoctorForm;
