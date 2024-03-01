"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/constants";

const AddJob = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    //console.log(name);
    e.preventDefault();
    if (
      !formData.name ||
      !formData.position ||
      !formData.format ||
      !formData.amount ||
      !formData.location ||
      !formData.salary ||
      !formData.dayOff ||
      !formData.time ||
      !formData.responsibilities ||
      !formData.sex ||
      !formData.age ||
      !formData.experience ||
      !formData.welfare ||
      !formData.ContactName ||
      !formData.ContactCall ||
      !formData.ContactEmail
    ) {
      Swal.fire("กรุณาใส่ข้อมูลให้ครบ!!");
      return;
    } else {
      await axios.post(API_URL + "/job", formData);
      Swal.fire("สำเร็จ!", "เพิ่มรายการสมัครงานแล้ว!", "success");
      router.push("/admin/adminjob");
      //setName("");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <aside className="mx-auto w-full max-w-screen-lg">
          <p className="text-center text-2xl font-bold text-blue-600 sm:text-3xl bg-white rounded-xl p-5 shadow-md">
            รายการสมัครงาน
          </p>

          <form
            onSubmit={handleSubmit}
            action="#"
            className="w-full mt-8 grid grid-cols-6 gap-6 bg-white p-10 rounded-2xl shadow-md"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                ชื่อบริษัท
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="- - บริษัท กรีนไลฟ์ เอ็นเตอร์ไพรส์ จำกัด"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="position"
                className="block text-sm font-semibold text-gray-700"
              >
                ตำแหน่ง
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="position"
                placeholder="- - พนักงานขายต่างจังหวัด"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="format"
                className="block text-sm font-semibold text-gray-700"
              >
                รูปแบบงาน
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="format"
                placeholder="- - งานประจำ"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-700"
              >
                จำนวนที่รับ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="amount"
                placeholder="- - 5 ตำแหน่ง"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="salary"
                className="block text-sm font-semibold text-gray-700"
              >
                เงินเดือน
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="salary"
                placeholder="- - 15,000 - 18,000"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700"
              >
                สถานที่ปฎิบัติงาน
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="location"
                placeholder="- - กรุงเทพมหานคร (เขตภาษีเจริญ / เขตบางแค / เขตหนองแขม)"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="dayOff"
                className="block text-sm font-semibold text-gray-700"
              >
                วันหยุด
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="dayOff"
                placeholder="- - วันอาทิตย์"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="time"
                className="block text-sm font-semibold text-gray-700"
              >
                เวลาทำงาน
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="time"
                placeholder="- - 08.00 - 17.00"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="timeOther"
                className="block text-sm font-semibold text-gray-700"
              >
                เวลาทำงานอื่นๆ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="timeOther"
                placeholder="- - ไม่ระบุ"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="responsibilities"
                className="block text-sm font-semibold text-gray-700"
              >
                หน้าที่ความรับผิดชอบ
              </label>

              <textarea
                onChange={handleChange}
                type="text"
                name="responsibilities"
                placeholder="- รับนโยบาย ปฏิบัติงาน "
                className="w-full textarea-lg rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="sex"
                className="block text-sm font-semibold text-gray-700"
              >
                เพศ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="sex"
                placeholder="- - ชาย - หญิง"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700"
              >
                อายุ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="age"
                placeholder="- - 30 - 40"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="education"
                className="block text-sm font-semibold text-gray-700"
              >
                ระดับการศึกษา
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="education"
                placeholder="- - ไม่ระบุ"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="experience"
                className="block text-sm font-semibold text-gray-700"
              >
                ประสบการณ์
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="experience"
                placeholder="- - 2ปี ขึ้นไป"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="- - ไม่ระบุ"
                className="block text-sm font-semibold text-gray-700"
              >
                คุณสมบัติ อื่นๆ
              </label>

              <textarea
                onChange={handleChange}
                type="text"
                name="other"
                placeholder="- - ไม่ระบุ"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="welfare"
                className="block text-sm font-semibold text-gray-700"
              >
                สวัสดิการ
              </label>

              <textarea
                onChange={handleChange}
                type="text"
                name="welfare"
                placeholder="- - เงินเดือน + ค่าคอมฯ 50,000 ขึ้นไป ยังไม่รวมค่าที่พัก"
                className="w-full textarea-lg rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="ContactName"
                className="block text-sm font-semibold text-gray-700"
              >
                ชื่อผู้ติดต่อ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="ContactName"
                placeholder="- - คุณภัทราพร"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="ContactCall"
                className="block text-sm font-semibold text-gray-700"
              >
                เบอร์ผู้ติดต่อ
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="ContactCall"
                placeholder="- - 082-519-6512"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="ContactEmail"
                className="block text-sm font-semibold text-gray-700"
              >
                อีเมลผู้ติดต่อ
              </label>

              <textarea
                onChange={handleChange}
                type="text"
                name="ContactEmail"
                placeholder="- - dm.recruit2023@gmail.com"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6 flex items-center justify-center">
              <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                เพิ่มข้อมูล
              </button>
            </div>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default AddJob;
