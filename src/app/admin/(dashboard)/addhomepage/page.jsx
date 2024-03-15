"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/constants";

const AddHomepage = () => {
  const router = useRouter();
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    //console.log(name, description, file.file);
    e.preventDefault();

    if (!name || !description || !file) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file.file);
      //console.log(formData);
      await axios.post(API_URL + "/homepage", formData);
      Swal.fire("สำเร็จ!", "เพิ่มข้อมูลแล้ว!", "success");
      router.push("/admin/adminhomepage");
      //setName("");
      //setDescription("");
    }
  };
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.name === "file") {
      setFile({ [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-red-600 sm:text-3xl">
            บทความ
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
          >
            <p className="text-center text-lg font-medium">บทความ</p>
            <div>
              <label htmlFor="description" className="sr-only">
                description
              </label>

              <div className="relative">
                <textarea
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="ชื่อบทความ"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="sr-only">
                description
              </label>

              <div className="relative">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="ข้อมูล"
                />
              </div>
            </div>

            <div>
              <label htmlFor="file" className="sr-only">
                image
              </label>

              <div className="relative">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">รูป</span>
                  </label>
                  <input
                    name="file"
                    type="file"
                    onChange={(e) => handleChange(e)}
                    className="file-input w-full shadow-sm "
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              เพิ่มบทความ
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default AddHomepage;
