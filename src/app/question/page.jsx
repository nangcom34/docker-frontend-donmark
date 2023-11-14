'use client'
import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const Question = () => {
  return (
    <>
      {" "}
      <Header />
      <Navbar/>
      <main className=" min-h-[73vh]">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center mt-16 mb-5 w-full">
          คำถามที่พบบ่อย ?
        </h1>
        <section className="mx-auto px-5 max-w-screen-xl my-10 space-y-1">
          <article className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
              1. คำถาม..........................................
            </aside>
            <aside className="collapse-content">
              <p className="text-sm md:text-lg lg:text-xl px-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                atque vel itaque eaque. Eligendi natus consectetur doloremque
                harum delectus, aliquid optio sit eum. Amet repudiandae ullam
                aliquam delectus nostrum voluptate!
              </p>
            </aside>
          </article>

          <article className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
              2. คำถาม..........................................
            </aside>
            <aside className="collapse-content">
              <p className="text-sm md:text-lg lg:text-xl px-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                atque vel itaque eaque. Eligendi natus consectetur doloremque
                harum delectus, aliquid optio sit eum. Amet repudiandae ullam
                aliquam delectus nostrum voluptate!
              </p>
            </aside>
          </article>

          <article className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
              3. คำถาม..........................................
            </aside>
            <aside className="collapse-content">
              <p className="text-sm md:text-lg lg:text-xl px-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                atque vel itaque eaque. Eligendi natus consectetur doloremque
                harum delectus, aliquid optio sit eum. Amet repudiandae ullam
                aliquam delectus nostrum voluptate!
              </p>
            </aside>
          </article>

          <article className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
              4. คำถาม..........................................
            </aside>
            <aside className="collapse-content">
              <p className="text-sm md:text-lg lg:text-xl px-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                atque vel itaque eaque. Eligendi natus consectetur doloremque
                harum delectus, aliquid optio sit eum. Amet repudiandae ullam
                aliquam delectus nostrum voluptate!
              </p>
            </aside>
          </article>

          <article className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <aside className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
              5. คำถาม..........................................
            </aside>
            <aside className="collapse-content">
              <p className="text-sm md:text-lg lg:text-xl px-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                atque vel itaque eaque. Eligendi natus consectetur doloremque
                harum delectus, aliquid optio sit eum. Amet repudiandae ullam
                aliquam delectus nostrum voluptate!
              </p>
            </aside>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Question;
