"use client";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ButtonLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Swal.fire("ออกจากระบบแล้ว", "", "success");

    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="btn btn-error absolute bottom-16 left-1/2 -translate-x-1/2 px-8 text-white w-10/12 lg:w-2/3 bg-red-600"
    >
      ออกจากระบบ
    </button>
  );
};

export default ButtonLogout;
