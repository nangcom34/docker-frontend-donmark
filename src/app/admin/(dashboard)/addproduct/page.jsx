"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/constants";

const AddProduct = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    loadCategory();
  }, []);

  const loadCategory = async () => {
    await axios
      .get(API_URL + "/category")
      .then((res) => {
        setCategories(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    //console.log(name, description, file.file);
    e.preventDefault();

    if (!name || !description || !file || !category) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file.file);
      formData.append("category", category);
      //console.log(formData);
      await axios.post(API_URL + "/product", formData);
      Swal.fire("สำเร็จ!", "เพิ่มสินค้าแล้ว!", "success");
      router.push("/admin/adminallproduct");
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
            สินค้าทั้งหมด
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
          >
            <p className="text-center text-lg font-medium">เพิ่มสินค้า</p>

            <div>
              <label htmlFor="name" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="ชื่อสินค้า"
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
                    <span className="label-text">รูปสินค้า</span>
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

            <div>
              <label htmlFor="description" className="sr-only">
                description
              </label>
              <div className="relative">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
                  placeholder="รายละเอียดสินค้า"
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="category" className="sr-only">
                category
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-primary w-full h-14 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  defaultValue=""
                >
                  <option disabled selected>
                    เลือกหมวดหมู่
                  </option>
                  {categories.length > 0 &&
                    categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              เพิ่มสินค้า
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default AddProduct;
