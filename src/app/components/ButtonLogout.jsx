"use client";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ButtonLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Swal.fire("ออกจากระบบแล้ว", "", "success");

    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <>
    <Link href={"/"} className="text-center hover:bg-green-100 my-5 rounded-2xl py-2 mx-5 text-lg duration-300">🌎 เข้าชมเว็บไซต์ 🚿</Link>
      <button
        onClick={handleLogout}
        className="btn btn-error relative bottom-0 left-1/2 -translate-x-1/2 px-8 text-white w-10/12 lg:w-2/3 bg-red-600 mb-10"
      >
        ออกจากระบบ
      </button>
    </>
  );
};

export default ButtonLogout;
