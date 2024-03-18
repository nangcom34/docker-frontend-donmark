"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../config/constants";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(value);
    await axios
      .post(API_URL + "/login", value)
      .then((res) => {
        //console.log(res.data);
        Swal.fire(
          `${res.data.payload.user.username} เข้าสู่ระบบสำเร็จ`,
          "",
          "success"
        );

        localStorage.setItem("donmarktoken", res.data.token);
        router.push("/admin");
      })
      .catch((error) => {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: `ชื่อผู้ใช้หรือรหัสผ่านผิด!!!`,
        });
      });
  };

  return (
    <main>
      <div className="mx-auto max-w-screen-xl h-screen px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center -translate-y-20">
        <div className="mx-auto max-w-lg min-w-fit">
         

          <form
            onSubmit={handleSubmit}
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
             <img
            src={`/images/donmark.png`}
            alt="donmark"
            className="w-full h-auto object-fill object-center"
            loading= "lazy"
          />
            <p className="text-center text-lg font-medium">
              เข้าสู่ระบบจัดการข้อมูล
            </p>

            <div>
              <label htmlFor="username" className="sr-only">
                username
              </label>

              <div className="relative">
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Username"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
