"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/constants";

const AddCategory = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    //console.log(name);
    e.preventDefault();
    if (!name) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      await axios.post(API_URL + "/category", { name: name });
      Swal.fire("สำเร็จ!", "หมวดหมู่แล้ว!", "success");
      router.push("/admin/admincategory");
      //setName("");
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            หมวดหมู่สินค้า
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
          >
            <p className="text-center text-lg font-medium">หมวดหมู่สินค้า</p>

            <div>
              <label htmlFor="name" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="ชื่อสินค้า"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              เพิ่มหมวดหมู่สินค้า
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default AddCategory;
