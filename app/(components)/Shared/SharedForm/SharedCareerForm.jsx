"use client";
import { useState, useRef } from "react";
import Paragraph from "../Paragraph/Paragraph";
import Swal from "sweetalert2";
import axios from "axios";

const SharedCareerForm = ({ career_id, params, career_form }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire(`${career_form[0]}`, `${career_form[1]}`, "error");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSelectedFile(null);
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire(`${career_form[0]}`, `${career_form[2]}`, "error");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      Swal.fire(`${career_form[3]}`, `${career_form[4]}`, "warning");
      return;
    }

    if (!career_id) {
      Swal.fire({
        icon: "error",
        title: `${career_form[5]}`,
        confirmButtonText: `${career_form[17]}`,
        customClass: { confirmButton: "bg-[--color-blue] text-[#fff]" },
      });
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile);

    formData.append("career_id", career_id);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/${params}/upload-cv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: `${career_form[6]}`,
          text: "citomed.az",
          confirmButtonText: `${career_form[18]}`,
          customClass: { confirmButton: "bg-[--color-blue] text-[#fff]" },
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        let backendMessage = response.data.message || `${career_form[8]}`;

        if (response.data.errors && response.data.errors.career_id) {
          backendMessage = response.data.errors.career_id[0];
        }
        Swal.fire(`${career_form[0]}`, backendMessage, "error");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      let errorMessage = `${career_form[9]}`;
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.errors) {
            if (error.response.data.errors.career_id) {
              errorMessage = error.response.data.errors.career_id[0];
            } else if (error.response.data.errors.cv) {
              errorMessage = error.response.data.errors.cv[0];
            } else {
              const firstErrorKey = Object.keys(error.response.data.errors)[0];
              if (firstErrorKey) {
                errorMessage =
                  error.response.data.errors[firstErrorKey][0] ||
                  error.response.data.message ||
                  `${career_form[10]}`;
              } else {
                errorMessage =
                  error.response.data.message || `${career_form[10]}`;
              }
            }
          } else {
            errorMessage =
              error.response.data.message ||
              error.response.data.error ||
              errorMessage;
          }
        }
        console.error("Server Response:", error.response.data);
      } else if (error.request) {
        errorMessage = `${career_form[11]}`;
      } else {
        errorMessage = error.message;
      }
      Swal.fire(`${career_form[12]}`, errorMessage, "error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[--bg-f6] p-[32px] lg:p-[20px] rounded-[20px] mt-[24px]">
          <div className="border border-[--bg-b4] rounded-[10px] p-[14px]">
            <label
              htmlFor="cv"
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="capitalize text-[--color-blue] text-[16px] font-['SFProText-Medium'] truncate max-w-[calc(100%-35px)]">
                {selectedFile ? selectedFile.name : `${career_form[13]}`}
              </h3>
              {!selectedFile && (
                <img width={24} height={24} src="/file.svg" alt="Fayl ikon" />
              )}
              {selectedFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-red-500 text-xs ml-2 hover:text-red-700"
                  aria-label={`${career_form[14]}`}
                >
                  X
                </button>
              )}
            </label>
            <input
              type="file"
              name="cv"
              id="cv"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
            />
          </div>

          <Paragraph
            customStyle={`text-[14px] text-[--color-5b] mt-[24px]  w-full`}
            text={`${career_form[15]}`}
          />
        </div>

        <div className="flex justify-end mt-[40px]">
          <button
            type="submit"
            className="bg-[--bg-55] text-[#fff] text-[16px] font-['SFProText-Medium'] flex items-center gap-[12px] py-[15px] px-[44px] rounded-[60px]"
          >
            <h2> {career_form[16]}</h2>
            <img src="/right.svg" alt="" />
          </button>
        </div>
      </form>
    </>
  );
};

export default SharedCareerForm;
