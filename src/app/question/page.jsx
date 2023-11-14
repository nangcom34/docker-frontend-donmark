'use client'
import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { API_URL } from "../../../config/constants";
import axios from "axios";
import Image from "next/image";

const Question = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions();
  }, []);
  const loadQuestions = async () => {
    await axios
      .post(API_URL + "/questionby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Navbar />
      <section
        className={`${
          questions && questions.length === 0 ? "h-full min-h-[63vh] mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
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
      <main className={`${
          questions && questions.length === 0 ?"hidden":" min-h-[63vh]"}`}>
        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center mt-16 mb-5 w-full">
          ❓ คำถามที่พบบ่อย ❔
        </h1>
        <section className="mx-auto px-5 max-w-screen-xl my-10 space-y-1">
          {questions &&
            questions.map((item) => (
              <article key={item._id} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
                  {item.question.split("\n" || "\r\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </aside>
                <aside className="collapse-content">
                  <p className="text-sm md:text-lg lg:text-xl px-5">
                    {item.answer.split("\n" || "\r\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </aside>
              </article>
            ))}


        </section>
      </main>
      <Footer />
    </>
  );
};

export default Question;
