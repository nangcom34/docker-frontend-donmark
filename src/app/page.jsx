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
      .post(API_URL + "/homepageby", {
        limit: 1,
        sort: "countView",
        order: "desc",
      })
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
      .post(API_URL + "/homepageby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setHomepage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCountViews = async (id, countView) => {
    const updatedCount = countView + 1;
    const value = {
      id: id,
      countView: updatedCount,
    };
    //console.log(value);

    await axios
      .post(API_URL + "/change-view", value)
      .then((res) => {
        //console.log(res);
        setHomepage((prevHomepage) =>
          prevHomepage.map((item) =>
            item._id === id ? { ...item, countView: updatedCount } : item
          )
        );
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <Header />
      <Navbar />
      <section
        className={`${
          homepage && homepageTop.length === 0 ? "h-full min-h-[63vh] mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
        }`}
      >
        <Image
          src={`/images/logo.png`}
          alt="logo"
          width={100}
          height={100}
          className="w-[100px] object-cover animate-spin"
          style={{
            loading: "lazy",
          }}
        />
      </section>
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
          homepage.map((item) => {
            if (item._id !== homepageTop[0]?._id) {
              return (
                <>
                  <article
                    onClick={() => {
                      handleCountViews(item._id, item.countView);
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal();
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
                  </article>

                  <dialog id={`my_modal_${item._id}`} className="modal m-auto">
                    <div className="modal-box p-0 relative max-h-[90vh] overflow-hidden flex">
                      <HomepageCard data={item} />
                     
                    </div>
                  </dialog>
                </>
              );
            }
            return null; // ไม่แสดง item ที่ตรงกับ homepageTop
          })}
      </section>

      <Footer />
    </main>
  );
}
