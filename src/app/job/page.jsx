"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import { DateTime } from "luxon";
import JobCard from "@/app/components/JobCard";

const Job = () => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    loadJob();
  }, []);
  const loadJob = async () => {
    await axios
      .post(API_URL + "/jobby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setJob(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <Header />
      <Navbar />
      <section className="flex items-center justify-center w-full max-w-screen-xl mx-auto mb-20">
        <Image
          src={`/images/jobtop.png`}
          alt="jobtop"
          width={1280}
          height={768}
          className="w-full h-auto object-cover object-center"
          style={{
            loading: "lazy",
          }}
        />
      </section>
      {job &&
        job.map((item) => (
          <aside
            onClick={() => {
              document.getElementById(`my_modal_${item._id}`).showModal();
            }}
            key={item._id}
            className="w-full duration-500 flex items-center justify-center mb-2 px-1"
          >
            <div className="w-full px-10 max-w-screen-lg h-auto relative rounded-[10px] border border-red-600 flex items-center justify-start overflow-auto py-5 bg-white">
              <div className="w-[30%] max-sm:hidden flex items-center justify-center mx-5 cursor-pointer">
                <Image
                  src={`/images/job.png`}
                  alt={item.name}
                  width={188}
                  height={188}
                  className="w-full object-fill"
                  style={{
                    loading: "lazy",
                  }}
                />
              </div>
              <div className="flex flex-col flex-wrap justify-center mr-5 overflow-auto w-full">
                <div className="flex flex-wrap items-center justify-between cursor-pointer">
                  <p className=" text-neutral-700 text-base font-semibold">
                    {item.name}
                  </p>
                  <p className="text-right text-neutral-700 text-base font-semibold ">
                    {DateTime.fromISO(item.createdAt)
                      .setZone("Asia/Bangkok")
                      .toRelative({ locale: "th" })}
                  </p>
                </div>
                <p className="  text-neutral-700 text-sm font-semibold mb-1 cursor-pointer">
                  ตำแหน่ง : {item.position}
                </p>
                <p className="  text-neutral-700 text-[13px] font-normal mb-3 block cursor-pointer">
                  {item.responsibilities
                    .split("\n" || "\r\n")
                    .slice(0, 3)
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index === 2 ? "..." : <br />}
                      </React.Fragment>
                    ))}
                </p>

                <div className="flex flex-col justify-center cursor-pointer">
                  <p className="  text-neutral-700 text-[13px] font-semibold mb-1">
                    เงินเดือน(บาท) : {item.salary}
                  </p>
                  <p className="  text-neutral-700 text-[13px] font-semibold mb-1">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
            <dialog id={`my_modal_${item._id}`} className="modal m-auto">
              <div className="modal-box p-0 relative max-w-screen-xl overflow-hidden flex">
                <JobCard data={item} />
                
              </div>
            </dialog>
          </aside>
        ))}
      <Footer />
    </main>
  );
};

export default Job;
