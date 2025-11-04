"use client";
import H2Text from "../Texts/H2Text";
import Paragraph from "../Paragraph/Paragraph";
import SharedInput from "../SahredInput/SharedInput";
import DateInputWithPlaceholder from "../SahredInput/SharedInputDate";
import SharedPrefix from "../Sharedprefix/SharedPrefix";
import SharedInputWithtext from "../Sharedprefix/SharedInputWithtext";
import SharedButton from "../SharedButton/SharedButton";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import SharedDataPicker from "../SharedDataPicker/SharedDataPicker";

const SharedbasketForm = ({
  private_name,
  private_surname,
  private_birth,
  private_gender,
  private_when_came,
  form_men,
  form_women,
  form_text1,
  form_text2,
  btn_name,
  btn_sending,
  contact_form_1,
  swal_error_8,
  swal_error_1,
  params,
  checkup_ids,
  tests_ids,
  toplam_qiymet,
}) => {
  const gender = [
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

  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    dogum_tarixi: "",
    cinsi: "",
    number_prefix: "",
    number: "",
    gelmek_istediyiniz_tarix: "",
    toplam_qiymet: toplam_qiymet,
    paket_id: tests_ids,
    checkup_id: checkup_ids,
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
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/sebet-form`,
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
            dogum_tarixi: "",
            cinsi: "",
            number_prefix: "",
            number: "",
            gelmek_istediyiniz_tarix: "",
            toplam_qiymet: "",
            paket_id: "",
            checkup_id: "",
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
    <form onSubmit={handleSubmit}>
      <H2Text
        text={form_text1}
        customStyle={`text-[#fff] text-[24px] 1xl:text-[20px] font-[600]`}
      />
      <Paragraph
        text={form_text2}
        customStyle={`text-[#fff] text-[18px] 1xl:text-[16px] mt-[16px]`}
      />
      <div className="mt-[40px]">
        <SharedInput
          customStyle={`w-full px-[13px] py-[10px] rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
          placeholder={private_name}
          type={`text`}
          value={form.ad}
          id={`name`}
          name={`ad`}
          onChange={handleChange}
        />
        <SharedInput
          customStyle={`w-full px-[13px] py-[10px] mt-[16px] rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
          placeholder={private_surname}
          value={form.soyad}
          type={`text`}
          id={`surname`}
          name={`soyad`}
          onChange={handleChange}
        />

        <div className="mt-[16px]">
          <div className="  user_select">
            <SharedDataPicker
              text={private_birth}
              setForm={setForm}
              customClass={`w-full px-[13px] py-[10px] text-[18px] outline-none rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
              customStyle="absolute right-[15px] top-[12px] "
              form_type={form?.dogum_tarixi}
              onChange={(date) =>
                setForm((prev) => ({
                  ...prev,
                  dogum_tarixi: date?.toISOString().split("T")[0], // sadece "YYYY-MM-DD"
                }))
              }
            />
          </div>

          <div className="pt-[10px] mt-[7px]">
            <SharedPrefix
              data={gender}
              roundedPrefix={`rounded-[10px]   py-[10px]`}
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

          <SharedInputWithtext
            numberprefix={`(0XX)`}
            placeholder={"123 45 67"}
            width="60px top-[5rem]"
            gap="gap-3"
            customStyle="py-[12px]"
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
          <div className="mt-[16px]">
            <div className="  user_select">
              <SharedDataPicker
                text={private_when_came}
                setForm={setForm}
                customClass={`w-full px-[13px] py-[10px] text-[18px] outline-none rounded-[10px] placeholder:text-[16px] placeholder:capitalize`}
                customStyle="absolute right-[15px] top-[12px] "
                form_type={form?.gelmek_istediyiniz_tarix}
                onChange={(date) =>
                  setForm((prev) => ({
                    ...prev,
                    gelmek_istediyiniz_tarix: date?.toISOString().split("T")[0], // sadece "YYYY-MM-DD"
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-[32px] flex justify-end">
            <SharedButton
              text={loading ? btn_sending : btn_name}
              customStyle={`bg-[--bg-55]  capitalize text-[16px] text-[#fff] rounded-[60px] px-[45px] py-[14.5px]`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SharedbasketForm;
