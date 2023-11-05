"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditJob = ({ params }) => {
  const router = useRouter();
  const [job, setJob] = useState({
    name: "",
    position: "",
    format: "",
    amount: "",
    location: "",
    salary: "",
    dayOff: "",
    time: "",
    timeOther: "",
    responsibilities: "",
    sex: "",
    age: "",
    education: "",
    experience: "",
    other: "",
    welfare: "",
    ContactName: "",
    ContactCall: "",
    ContactEmail: "",
  });

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
    axios
      .get(API_URL + "/job/" + params.id)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // console.log(product);
  const {
    name,
    position,
    format,
    amount,
    location,
    salary,
    dayOff,
    time,
    timeOther,
    responsibilities,
    sex,
    age,
    education,
    experience,
    other,
    welfare,
    ContactName,
    ContactCall,
    ContactEmail,
  } = job;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(product);

    await axios
      .put(API_URL + "/job/" + params.id, job)
      .then((res) => {
        Swal.fire("สำเร็จ!", "แก้ไขข้อมูลแล้ว!", "success");
        router.push("/admin/adminjob");
      })
      .catch((error) => console.log(error));
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    name: e.target.value,
                  }));
                }}
                type="text"
                value={name}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    position: e.target.value,
                  }));
                }}
                type="text"
                value={position}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    format: e.target.value,
                  }));
                }}
                type="text"
                value={format}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    amount: e.target.value,
                  }));
                }}
                type="text"
                value={amount}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    salary: e.target.value,
                  }));
                }}
                type="text"
                value={salary}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    location: e.target.value,
                  }));
                }}
                type="text"
                value={location}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    dayOff: e.target.value,
                  }));
                }}
                type="text"
                value={dayOff}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    time: e.target.value,
                  }));
                }}
                type="text"
                value={time}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    timeOther: e.target.value,
                  }));
                }}
                type="text"
                value={timeOther}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    responsibilities: e.target.value,
                  }));
                }}
                type="text"
                value={responsibilities}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    sex: e.target.value,
                  }));
                }}
                type="text"
                value={sex}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    age: e.target.value,
                  }));
                }}
                type="text"
                value={age}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    education: e.target.value,
                  }));
                }}
                type="text"
                value={education}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    experience: e.target.value,
                  }));
                }}
                type="text"
                value={experience}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    other: e.target.value,
                  }));
                }}
                type="text"
                value={other}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    welfare: e.target.value,
                  }));
                }}
                type="text"
                value={welfare}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    ContactName: e.target.value,
                  }));
                }}
                type="text"
                value={ContactName}
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
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    ContactCall: e.target.value,
                  }));
                }}
                type="text"
                value={ContactCall}
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

              <input
                onChange={(e) => {
                  setJob((job) => ({
                    ...job,
                    ContactEmail: e.target.value,
                  }));
                }}
                type="text"
                value={ContactEmail}
                name="ContactEmail"
                placeholder="- - dm.recruit2023@gmail.com"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md"
              />
            </div>

            <div className="col-span-6 flex items-center justify-center">
              <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                แก้ไขข้อมูล
              </button>
            </div>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditJob;
