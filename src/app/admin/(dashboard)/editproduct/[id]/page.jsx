"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditProduct = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    file: "",
  });

  const [fileOld, setFileOld] = useState();

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
    axios
      .get(API_URL + "/product/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setFileOld(res.data.file);
      })
      .catch((error) => console.log("error", error));
  }, []);
  // console.log(product);
  const { name, description } = product;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(product);
    //console.log(fileOld);

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    formData.append("fileOld", fileOld);
    //console.log(formData);

    await axios
      .put(API_URL + "/product/" + params.id, formData)
      .then((res) => {
        Swal.fire("สำเร็จ!", "แก้ไขสินค้าแล้ว!", "success");
        router.push("/admin/adminallproduct");
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.name === "file") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            สินค้าทั้งหมด
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">แก้ไขสินค้า</p>

            <div>
              <label htmlFor="email" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      name: e.target.value,
                    }));
                  }}
                  value={name}
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
              <label htmlFor="password" className="sr-only">
                description
              </label>

              <div className="relative">
                <textarea
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      description: e.target.value,
                    }));
                  }}
                  value={description}
                  className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="รายละเอียดสินค้า"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              แก้ไขสินค้า
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditProduct;
