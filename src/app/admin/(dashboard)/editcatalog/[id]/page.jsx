"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditCatalog = ({ params }) => {
  const router = useRouter();
  const [catalog, setCatalog] = useState({
    file: "",
  });

  const [fileOld, setFileOld] = useState();

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    axios
      .get(API_URL + "/catalog/" + params.id)
      .then((res) => {
        setFileOld(res.data.file);
      })
      .catch((error) => console.log("error", error));
  }, []);
 
  // console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fileOld);

    if (!catalog.file) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      const formData = new FormData();
      for (const key in catalog) {
        formData.append(key, catalog[key]);
      }
      formData.append("fileOld", fileOld);
      //console.log(formData);

      await axios
        .put(API_URL + "/catalog/" + params.id, formData)
        .then((res) => {
          Swal.fire("สำเร็จ!", "แก้ไข Catalog แล้ว!", "success");
          router.push("/admin");
        })
        .catch((error) => console.log(error));
    }
  };
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.name === "file") {
        setCatalog({ ...catalog, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          E-Catalog
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
          >
            <p className="text-center text-lg font-medium">
            Catalog
            </p>

            <div>
              <label htmlFor="file" className="sr-only">
              file
              </label>

              <div className="relative">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">ไฟล์ Catalog</span>
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
              แก้ไขไฟล์ Catalog
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditCatalog;
