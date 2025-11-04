"use client";
import SharedInput from "../SahredInput/SharedInput";
import InputWithPrefix from "../InputWithPrefix/InputWithPrefix";
import SharedButton from "../SharedButton/SharedButton";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const SharedContactForm = ({
  tr_offer,
  tr_comment,
  tr_fullname,
  tr_message,
  btn_send,
  btn_sending,
  contact_form_1,
  swal_error_8,
  swal_error_1,
  params,
}) => {
  const [form, setForm] = useState({
    type: "",
    ad: "",
    number: "",
    number_prefix: "",
    mesajiniz: "",
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
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/contact-form`,
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
            type: "",
            ad: "",
            number: "",
            number_prefix: "",
            mesajiniz: "",
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
        className={`bg-[--bg-f6] rounded-[20px] p-[32px] md:p-[16px] w-full h-full `}
      >
        <div className="grid grid-cols-12 gap-[16px] ">
          <SharedInput
            ngClass={`col-span-4 md:col-span-6  border border-[#C5CEE0] contact_radio cursor-pointer flex justify-between px-[24px] py-[16px] md:py-[8px] rounded-[70px]`}
            text={tr_offer}
            customClass={`text-[#003B71] font-[600] text-[18px] cursor-pointer flex w-max`}
            value={"0"}
            type={`radio`}
            id={`radio_id_1`}
            name={`type`}
            onChange={handleChange}
          />
          <SharedInput
            ngClass={`col-span-4 md:col-span-6  border border-[#C5CEE0] contact_radio cursor-pointer flex justify-between px-[24px] py-[16px] md:py-[8px] rounded-[70px]`}
            text={tr_comment}
            customClass={`text-[#003B71] font-[600] text-[18px] cursor-pointer flex w-max`}
            value={"1"}
            type={`radio`}
            id={`radio_id_2`}
            name={`type`}
            onChange={handleChange}
          />
          <SharedInput
            ngClass={`col-span-12  `}
            customStyle={`w-full px-[16px] py-[20px] rounded-[60px] border border-[--bg-e5] placeholder:text-[16px] placeholder:text-[--color-blue]`}
            value={form.ad}
            placeholder={tr_fullname}
            type={`text`}
            id={`fullname`}
            name={`ad`}
            onChange={handleChange}
          />
          <div className="col-span-12 ">
            <InputWithPrefix
              placeholder={"123 45 67"}
              type={`text`}
              customClass=" border-none outline-none shadow-none rounded-r-[60px] text-[16px] text-[--color-blue]"
              gap={`0px  rounded-[60px] border border-[--bg-e5] `}
              id={`number`}
              name={`number`}
              onChange={handleChange}
              value={form.number}
              roundedPrefix="rounded-l-[60px]"
              customStyle={``}
              onPrefixSelect={(selectedPrefix) => {
                setForm((prev) => ({
                  ...prev,
                  number_prefix: selectedPrefix,
                }));
              }}
            />
          </div>
          <div className="col-span-12">
            <textarea
              name="mesajiniz"
              id="contact_message"
              placeholder={tr_message}
              onChange={handleChange}
              value={form.mesajiniz}
              className="w-full px-[24px] py-[16px] h-[150px] text-[16px] border-none outline-none rounded-[20px] border border-[--bg-e5] placeholder:text-[16px] placeholder:text-[--color-blue] resize-none"
            ></textarea>
          </div>
          <div className="col-span-12 flex justify-end">
            <SharedButton
              text={loading ? btn_sending : btn_send}
              customStyle={`bg-[--bg-55]  capitalize text-[16px] text-[#fff] rounded-[60px] px-[45px] py-[17.5px]`}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SharedContactForm;
