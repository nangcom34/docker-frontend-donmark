"use client";
import React from "react";
import Image from "next/image";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const About = () => {
  return (
    <>
      {" "}
      <Header />
      <Navbar/>
      <main className=" w-full h-auto">
        <section className="flex items-center justify-center w-full max-w-screen-lg px-5 md:px-20 md:mt-24 md:mb-10 mx-auto mt-16">
          <ul>
            <li>
              <p className="text-sm md:text-md lg:text-lg">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เราเป็นจัดจำหน่ายอุปกรณ์ที่ใช้ในห้องน้ำสุขภัณฑ์เริ่มต้นก่อตั้งในปี2548ประกอบธุรกิจจำหน่ายและ
                อุปกรณ์ห้องน้ำและเครื่องใช้ภายในบ้านภายใต้ชื่อห้างหุ่้นส่วนจำกัดกรีนไลฟ์เอ็นเตอร์ไพรส์ตลอดระยะเวลาที่ผ่านมา
              </p>
            </li>
            <li>
              <p className="text-sm md:text-md lg:text-lg">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                เราสั่งสมประสบการณ์ในการจัดจำหน่ายอุปกรณ์ห้องน้ำเรื่อยมาและธุรกิจขยายเติบโตและได้เป็น
                รูปแบบบริษัท ในปี 2557 เป็น บริษัท กรีนไลฟ์ เอ็นเตอร์ไพรส์ จำกัด
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col items-center justify-center">
          <aside className="w-full max-w-screen-md px-8 my-5">
            <Image
              src="/images/about1.png"
              alt="about"
              width={802}
              height={356}
              className="w-full h-full object-fill object-center"
              style={{
                loading: "lazy",
              }}
            />
          </aside>
          <aside className="w-full max-w-screen-lg px-4 mt-16">
            <p className="text-sm md:text-md lg:text-lg">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ตลอดจนปัจจุบันเราเป็นผู้นำเข้าและเป็นจำหน่ายสินค้าจากผู้ผลิตนานาประเทศจากทั่วทุกมุมโลกเนื่องจากเราเป็นผู้นำเข้าเองจาก
              หลายประเทศเราจึงเลือกโรงงานที่ผลิตสินค้าให้เราและเราเองเป็นผู้ควบคุมคุณภาพตลอดจนกาลเวลาที่ผ่านมาเราสะสมประสบการณ์จนเราสามารถพูดได้ว่า
              “มีความชำนาญเกี่ยวกับสินค้าที่ทำ” สินค้าแต่ละรายการ
              เราใส่ในกระบวนการผลิตการออกแบบเพื่อให้ใช้งานได้ง่าย ไม่ติดขัด
              และเกิดปัญหาระหว่างใช้งานลูกค้าจึงมั่นใจได้เลยว่าสินค้าของเราทุกรายการประสิทธิภาพจัดเต็มแน่นอนและเรามีสินค้ามากมายหลายหมวดหมู่ที่พร้อมซัพพอร์ตในทุกความต้องการของท่าน
              พร้อมยินดีให้บริการท่านที่ต้องการใช้ และขอขอบคุณทุกความไว้วางใจเรา
            </p>
          </aside>
        </section>

        <section className="grid grid-cols-10 w-full max-w-screen-lg mx-auto px-5 my-10">
          <aside className="col-span-10 sm:col-span-7 w-full">
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/about.png"
                alt="about"
                width={50}
                height={50}
                className="w-10 h-10 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ">
                มี QC ตรวจสอบคุณภาพสินค้า ทุกขั้นตอน ก่อนออกจากโรงงาน
              </p>
            </div>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/about.png"
                alt="about"
                width={50}
                height={50}
                className="w-10 h-10 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ">
                ทดสอบคุณภาพคุณภาพสินค้าสมบูรณ์ 100%
              </p>
            </div>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/about.png"
                alt="about"
                width={50}
                height={50}
                className="w-10 h-10 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ">
                ผลิตภัณฑ์พร้อมใช้งานได้จริงทันที
              </p>
            </div>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/about.png"
                alt="about"
                width={50}
                height={50}
                className="w-10 h-10 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ">
                แพคกิ้งที่ได้มาตรฐาน
              </p>
            </div>
          </aside>
          <aside className="col-span-10 sm:col-span-3 w-full flex items-center">
            {" "}
            <Image
              src="/images/about2.png"
              alt="about"
              width={576}
              height={356}
              className="w-auto h-auto object-fill object-center"
              style={{
                loading: "lazy",
              }}
            />
          </aside>
        </section>
        <h1 className="text-lg md:text-xl lg:text-3xl font-semibold text-center mt-16 mb-5 w-full">
          เกี่ยวกับเรา
        </h1>
        <section className="grid grid-cols-10 max-w-s min-h-[400px] lg:h-[550px] px-5 md:px-16 gap-5 md:gap-16 mx-auto max-w-screen-2xl mt-10">
          <article className="col-span-5 max-md:col-span-10 w-full overflow-hidden rounded-2xl shadow-lg shadow-gray-500 min-h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.4887426637147!2d100.34451917584022!3d13.688822786696534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bdf00000000f%3A0xb82fe10fae60cb15!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4geC4o-C4teC4meC5hOC4peC4n-C5jCDguYDguK3guYfguJnguYDguJXguK3guKPguYzguYTguJ7guKPguKrguYwg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1698143505234!5m2!1sth!2sth"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                allowfullscreen: true,
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
              }}
            ></iframe>
          </article>
          <article className="col-span-5 max-md:col-span-10 w-full ml-10">
            <p className="text-md md:text-lg lg:text-xl font-medium mb-2 md:mt-8">
              บริษัท กรีนไลฟ์ เอ็นเตอร์ไพรส์ จำกัด
            </p>
            <p className="text-sm md:text-md lg:text-lg">
              เลขที่ 15 ซอยมาเจริญ 3 แยก 4 แขวงหนองแขม เขตหนองแขม กทม. 10160
            </p>
            <p className="text-sm md:text-md lg:text-lg">โทร 02-8121008</p>
            <p className="text-sm md:text-md lg:text-lg">แฟกซ์ 02-8121098</p>
            <p className="text-md md:text-lg lg:text-xl font-medium mb-2 mt-2 md:mt-20">
              เวลาทำการ
            </p>
            <p className="text-sm md:text-md lg:text-lg">
              วันจันทร์ – วันเสาร์ 8.00 -17.00 น.
            </p>
          </article>
        </section>

        <p className="text-lg md:text-xl lg:text-3xl font-semibold mt-28 mb-5 w-full px-5   max-w-screen-xl mx-auto text-center">
          ติดต่อสอบถามข้อมูลสินค้า ขอใบเสนอราคา
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 px-5 md:px-10 gap-5 md:gap-x-5 max-w-screen-xl mx-auto">
          <article className="flex flex-col items-center justify-start gap-2 bg-[#D9D9D9] bg-opacity-60 w-full p-10 rounded-2xl shadow-lg mx-auto max-w-[28rem]">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold w-full mb-2">
              คุณเบียร์
            </h3>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/call.png"
                alt="call"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">0928205577</p>
            </div>{" "}
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/line.png"
                alt="line"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">0928205577</p>
            </div>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/mail.png"
                alt="mail"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">
                donmarkonline@gmail.com
              </p>
            </div>
          </article>

          <article className="flex flex-col items-center justify-start gap-2 bg-[#D9D9D9] bg-opacity-60 w-full p-10 rounded-2xl shadow-lg mx-auto max-w-[28rem]">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold w-full mb-2">
              คุณเจน
            </h3>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/call.png"
                alt="call"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">0632161358</p>
            </div>{" "}
            <div className="flex items-center justify-start w-full ">
              <Image
                src="/images/line.png"
                alt="line"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">
                saledonmark904
              </p>
            </div>
            <div className="flex items-center justify-start w-full">
              <Image
                src="/images/mail.png"
                alt="mail"
                width={36}
                height={36}
                className="w-8 h-8 object-fill object-center"
                style={{
                  loading: "lazy",
                }}
              />
              <p className="text-sm md:text-md lg:text-lg ml-5">
                donmarkonline@gmail.com
              </p>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-3 gap-5 md:gap-10 items-center content-center justify-center w-full max-w-screen-2xl mx-auto px-5 lg:px-[15rem] my-10">
          <article className="flex items-center justify-center w-full max-w-[200px] shadow-lg overflow-hidden mx-auto rounded-lg">
            {" "}
            <Image
              src="/images/Donmark.jpg"
              alt="donmark"
              width={560}
              height={64}
              className="w-auto h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className=" flex items-center justify-center w-full max-w-[200px] shadow-lg overflow-hidden mx-auto rounded-lg">
            {" "}
            <Image
              src="/images/DMG.png"
              alt="dmg"
              width={360}
              height={200}
              className="w-auto h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className=" flex items-center justify-center w-full max-w-[200px] shadow-lg overflow-hidden mx-auto rounded-lg">
            {" "}
            <Image
              src="/images/Fenix.png"
              alt="fenix"
              width={346}
              height={88}
              className="w-auto h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
        </section>

        <p
          id="sale"
          className="text-lg md:text-xl lg:text-3xl text-center font-semibold mt-16 mb-5 w-full"
        >
          ตัวแทนจำหน่าย
        </p>
        <p className="text-sm md:text-lg lg:text-xl text-red-600 font-semibold my-2 w-full max-w-screen-lg mx-auto px-10">
          จัดจำหน่ายตามร้านตัวแทน และร้านค้าวัสดุทั่วประเทศ
        </p>
        <section className="grid grid-cols-3 md:grid-cols-6 gap-5 lg:gap-20 w-full mx-auto px-5 lg:px-[15rem] my-10 max-w-screen-xl">
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/HP.png"
              alt="HP"
              width={500}
              height={500}
              className="w-[500px] h-auto "
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/SCG.png"
              alt="scg"
              width={500}
              height={500}
              className="w-[500px] h-auto "
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/DH.png"
              alt="dohome"
              width={500}
              height={500}
              className="w-[500px] h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/MH.png"
              alt="megahome"
              width={500}
              height={500}
              className="w-[500px] h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/GB.png"
              alt="gobal"
              width={500}
              height={500}
              className="w-[500px] h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
          <article className="col-span-1 flex items-center justify-center w-[100px] shadow-sm shadow-slate-600 rounded-xl max-w-[100px] mx-auto">
            {" "}
            <Image
              src="/images/HS.png"
              alt="sukkapan"
              width={500}
              height={500}
              className="w-[500px] h-auto"
              style={{
                loading: "lazy",
              }}
            />
          </article>
        </section>
        
        <section className="grid grid-cols-1 px-5 mx-auto max-w-screen-lg my-10">
          <Image
            src="/images/map.png"
            alt="map"
            width={1024}
            height={500}
            className="w-full h-auto"
            style={{
              loading: "lazy",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
