"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditImageProduct = ({ params }) => {
  const router = useRouter();
  const [imageProduct, setImageProduct] = useState({
    file: "",
  });

  const [fileOld, setFileOld] = useState();

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
    axios
      .get(API_URL + "/imageProduct/" + params.id)
      .then((res) => {
        setFileOld(res.data.file);
      })
      .catch((error) => console.log("error", error));
  }, []);
 
  // console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(fileOld);

    if (!imageProduct.file) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      const formData = new FormData();
      for (const key in imageProduct) {
        formData.append(key, imageProduct[key]);
      }
      formData.append("fileOld", fileOld);
      //console.log(formData);

      await axios
        .put(API_URL + "/imageProduct/" + params.id, formData)
        .then((res) => {
          Swal.fire("สำเร็จ!", "แก้ไขรูปสินค้าแล้ว!", "success");
          router.push("/admin/adminimageproduct");
        })
        .catch((error) => console.log(error));
    }
  };
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.name === "file") {
      setImageProduct({ ...imageProduct, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            รูปสินค้าใหม่ / ลดราคา
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              แก้ไขรูปสินค้าใหม่ / ลดราคา
            </p>

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

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              แก้ไขรูปสินค้า
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditImageProduct;
