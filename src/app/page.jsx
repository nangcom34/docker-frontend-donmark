"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import axios from "axios";
import { API_URL, URL_IMAGES } from "../../config/constants";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import HomepageCard from "./components/HomepageCard";

export default function Home() {
  const [homepageTop, setHomepageTop] = useState([]);
  const [homepage, setHomepage] = useState([]);

  useEffect(() => {
    loadHomepageTop();
    loadHomepage();
  }, []);
  const loadHomepageTop = async () => {
    await axios
      .post(API_URL + "/homepagetoptrue")
      .then((res) => {
        //console.log(res.data);
        setHomepageTop(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadHomepage = async () => {
    await axios
      .post(API_URL + "/homepagetopfalse")
      .then((res) => {
        //console.log(res.data);
        setHomepage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <Header />
      <Navbar />
      <section
        className={`${
          homepage && homepageTop.length === 0 ? "h-full min-h-[68vh]" : ""
        }`}
      ></section>
      {homepageTop &&
        homepageTop.map((homepageTopItem) => (
          <section
            key={homepageTopItem._id}
            className="flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto mb-20 px-3"
          >
            <Image
              src={`${URL_IMAGES}${homepageTopItem.file}`}
              alt={homepageTopItem._id}
              width={1280}
              height={768}
              className="w-full object-fill object-center"
              style={{
                loading: "lazy",
              }}
            />
            <p className="text-xs md:text-lg font-semibold leading-relaxed mt-10">
              {homepageTopItem.description
                .split("\n" || "\r\n")
                .map((line, index) => (
                  <React.Fragment key={index}>{line}</React.Fragment>
                ))}
            </p>
          </section>
        ))}

      <section className="flex flex-wrap items-center justify-around gap-3 gap-y-8 md:gap-y-20 my-10 lg:gap-x-4 max-w-screen-xl mx-auto px-2">
        {homepage &&
          homepage.map((item) => (
            <article
              onClick={() => {
                document.getElementById(`my_modal_${item._id}`).showModal();
              }}
              key={item._id}
              className="w-[250px] h-[310px] hover:scale-105 duration-300 flex flex-col items-center justify-center cursor-pointer"
            >
              <aside className="w-[200px]">
                <Image
                  src={`${URL_IMAGES}${item.file}`}
                  alt="home"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover object-center shadow-md align-middle"
                  style={{
                    loading: "lazy",
                  }}
                />
              </aside>
              <aside className="w-full overflow-hidden">
                <p className="text-xs md:text-[16px] mt-3 leading-relaxed text-ellipsis">
                  {item.description
                    .split("\n" || "\r\n")
                    .slice(0, 3)
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index === 2 ? "..." : <br />}
                      </React.Fragment>
                    ))}
                </p>
              </aside>
              <dialog id={`my_modal_${item._id}`} className="modal">
                <div className="modal-box p-0 relative lg:max-w-[30%]">
                  <HomepageCard data={item} />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn bg-red-600 text-white hover:text-red-600 hover:bg-white mb-5 mr-5">
                        CLOSE
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </article>
          ))}
      </section>
      <Footer />
    </main>
  );
}
