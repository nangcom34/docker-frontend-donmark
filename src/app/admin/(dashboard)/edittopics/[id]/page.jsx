"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditTopics = ({ params }) => {
  const router = useRouter();
  const [topics, setTopics] = useState({
    title: "",
    thumb: "",
  });

  const [fileOld, setFileOld] = useState();

  useEffect(() => {

    axios
      .get(API_URL + "/topics/" + params.id)
      .then((res) => {
        setTopics(res.data);
        setFileOld(res.data.thumb);
      })
      .catch((error) => console.log("error", error));
      
  }, []);

  
  // console.log(product);
  const { title } = topics;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(product);
    //console.log(fileOld);

    const formData = new FormData();
    for (const key in topics) {
      formData.append(key, topics[key]);
    }
    formData.append("fileOld", fileOld);
    //console.log(formData);

    await axios
      .put(API_URL + "/topics/" + params.id, formData)
      .then((res) => {
        Swal.fire("สำเร็จ!", "แก้ไขหัวข้อบทความแล้ว!", "success");
        router.push("/admin/adminarticles");
      })
      .catch((error) => console.log(error));
  };
  const handleChange = async (e) => {
    // console.log(e.target.files[0]);
    if (e.target.name === "file") {
      setTopics({ ...topics, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          บทความ
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
          >
            <p className="text-center text-lg font-medium">หัวข้อบทความ</p>

            <div>
              <label htmlFor="title" className="sr-only">
                title
              </label>

              <div className="relative">
                <textarea
                  onChange={(e) => {
                    setTopics((topics) => ({
                      ...topics,
                      title: e.target.value,
                    }));
                  }}
                  value={title}
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="ชื่อบทความ"
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
              แก้ไขหัวข้อบทความ
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditTopics ;
