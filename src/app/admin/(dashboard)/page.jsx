"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, URL_IMAGES } from "../../../../config/constants";
import axios from "axios";
import { DateTime } from "luxon";
import Barchart from "@/app/components/Barchart";
import Link from "next/link";

const Admin = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [visitor, setVisitor] = useState([]);
  const [homepage, setHomepage] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [job, setJob] = useState([]);
  const [catalog, setCatalog] = useState([]);
  useEffect(() => {

    loadProduct();
    loadCategory();
    loadImages();
    loadJob();
    loadVisitors();
    loadHomepage();
    loadPromotion();
    loadCatalog()
  }, []);
  const loadProduct = async () => {
    await axios
      .get(API_URL + "/product")
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadCategory = async () => {
    await axios
      .get(API_URL + "/category")
      .then((res) => {
        //console.log(res.data);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadImages = async () => {
    await axios
      .get(API_URL + "/imageProduct")
      .then((res) => {
        //console.log(res.data);
        setImages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadJob = async () => {
    await axios
      .get(API_URL + "/job")
      .then((res) => {
        //console.log(res.data);
        setJob(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadVisitors = async () => {
    await axios
      .get(API_URL + "/visitors")
      .then((res) => {
        //console.log(res.data);
        setVisitor(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadHomepage = async () => {
    await axios
      .get(API_URL + "/topics")
      .then((res) => {
        //console.log(res.data);
        setHomepage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadPromotion = async () => {
    await axios
      .get(API_URL + "/imageSlide")
      .then((res) => {
        //console.log(res.data);
        setPromotion(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadCatalog = async () => {
    await axios
      .post(API_URL + "/catalogby", {
        limit: 1,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setCatalog(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //console.log(visitor);
  //console.log(homepage);
  //console.log(promotion);
  //console.log(job);
  //console.log(category);
  //console.log(product);
  //console.log(images);
  //นับสินค้าลดราคา
  const saleImages = images.filter((image) => image.sale === true);
  const saleCount = saleImages.length;
  //นับสินค้าใหม่
  const newImages = images.filter((image) => image.sale === false);
  const newCount = newImages.length;
  //นับสินค้าแนะนำ
  const recommendProduct = product.filter(
    (products) => products.recommend === true
  );
  const recommendCount = recommendProduct.length;

  // ใช้ฟังก์ชัน Array.reduce() เพื่อหาค่า updatedAt ที่มีค่ามากที่สุด

  let imagesUpdatedAt = ""; //วันอัพเดทล่าสุดของรูปสินค้าลดราคา / ใหม่
  if (images.length > 0) {
    imagesUpdatedAt = images.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let saleImagesUpdatedAt = ""; //วันอัพเดทล่าสุดของรูปสินค้าลดราคา
  if (saleImages.length > 0) {
    saleImagesUpdatedAt = saleImages.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let newImagesUpdatedAt = ""; //วันอัพเดทล่าสุดของรูปสินค้าใหม่
  if (newImages.length > 0) {
    newImagesUpdatedAt = newImages.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let productUpdatedAt = ""; //วันอัพเดทล่าสุดของสินค้าทั้งหมด
  if (product.length > 0) {
    productUpdatedAt = product.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let recommendProductUpdatedAt = ""; //วันอัพเดทล่าสุดของสินค้าแนะนำ
  if (recommendProduct.length > 0) {
    recommendProductUpdatedAt = recommendProduct.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let HomepageUpdatedAt = "";//วันอัพเดทล่าสุดของบทความ
  if (homepage.length > 0) {
    HomepageUpdatedAt = homepage.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let PromotionUpdatedAt = "";//วันอัพเดทล่าสุดของpromotion
  if (promotion.length > 0) {
    PromotionUpdatedAt = promotion.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }
  let JobUpdatedAt = "";//วันอัพเดทล่าสุดของรายการสมัครงาน
  if (job.length > 0) {
    JobUpdatedAt = job.reduce((prev, current) => {
      return new Date(prev.updatedAt) > new Date(current.updatedAt)
        ? prev
        : current;
    });
  }

  const percenRecommend = (recommendCount / product.length) * 100; //เปอร์เซ็นสินค้าแนะนำ

  return (
    <>
      <main>
        <section className="pt-10 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
          <p className="text-2xl font-bold px-10 lg:col-span-2">Dashboard</p>
        </section>
        <section className="p-4">
          <article className="mt-12">
            <aside className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              {visitor && visitor.map((item) => (
                <div
                  key={item._id}
                  className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
                >
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-red-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      fill="none"
                      height="27"
                      viewBox="0 0 35 27"
                      width="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                      <path
                        d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                      <path
                        d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                      <path
                        d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                      <path
                        d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                      <path
                        d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased  text-[16px] leading-normal font-normal ">
                      ยอดเข้าชมเว็บไซต์
                    </p>

                    <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                      {item.visitors}
                    </h4>
                  </div>
                  <div className="border-t  p-4">
                    <p className="block antialiased  text-base leading-relaxed font-normal ">
                      <strong className="text-green-500">
                        {DateTime.fromISO(item.updatedAt)
                          .setZone("Asia/Bangkok")
                          .toRelative({ locale: "th" })}
                      </strong>
                      &nbsp;อัพเดท
                    </p>
                  </div>
                </div>
              ))}

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sky-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center p-4">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 1H1v18h18V1H3zm14 2v14H3V3h14zm4 18H5v2h18V5h-2v16zM15 5H5v2h10V5zM5 9h10v2H5V9zm7 4H5v2h7v-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    บทความ
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {homepage.length}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(HomepageUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600 to-amber-400 text-white shadow-amber-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 15.118 15.107"
                    version="1.1"
                    viewBox="0 0 15.118 15.107"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#fff"
                      d="M14.059 5.436V3.245l-2.204-1.102L9.712 0 7.559.538 5.406 0 3.263 2.143 1.059 3.245v2.191L0 7.554l1.059 2.118v2.191l2.204 1.102 2.143 2.143 2.153-.538 2.153.538 2.143-2.143 2.204-1.102V9.672l1.059-2.118-1.059-2.118zm-1 4v1.809l-1.724.862L9.406 14l-1.847-.462L5.712 14l-1.8-1.8-1.854-.956V9.436l-.94-1.882.941-1.882V3.863l1.724-.862 1.93-1.894 1.847.462 1.847-.462 1.8 1.8 1.854.956v1.809L14 7.554l-.941 1.882z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M3.316 7.054H11.800999999999998V8.054H3.316z"
                      transform="rotate(-45.001 7.559 7.554)"
                    ></path>
                    <path
                      fill="#fff"
                      d="M5.559 7.054c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5-1.5.673-1.5 1.5.673 1.5 1.5 1.5zm0-2a.5.5 0 110 1 .5.5 0 010-1zM9.559 8.054c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm0 2a.5.5 0 110-1 .5.5 0 010 1z"
                    ></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รูป Promotion
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {promotion.length}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(PromotionUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 text-white shadow-fuchsia-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    version="1.1"
                    viewBox="0 0 16.933 16.933"
                  >
                    <g>
                      <path
                        fill="#fff"
                        d="M7.937.53a.265.265 0 00-.263.263v.793h-.53a.265.265 0 00-.187.453l1.587 1.588c.104.103.27.103.374 0l1.588-1.588a.265.265 0 00-.188-.453h-.53V.793a.265.265 0 00-.263-.264zM5.826 2.642a.265.265 0 00-.27.267v.375c.008.345.521.345.53 0V2.91a.265.265 0 00-.26-.267zm5.81 0a.265.265 0 00-.26.267v.375c.009.345.522.345.53 0V2.91a.265.265 0 00-.27-.267zM4.382 3.697l.194.194c.262.247.617-.129.373-.373l-.194-.194a.264.264 0 00-.182-.08.265.265 0 00-.19.453zm8.325-.373l-.194.194c-.244.244.111.62.373.373l.194-.194a.265.265 0 00-.191-.453.264.264 0 00-.182.08zm-8.036 3.19a1.307 1.307 0 00-.967-.43A1.323 1.323 0 002.63 8.181c-.477.36-.778.948-.778 1.609v.263c0 .443.358.793.793.794h1.697c.09.211.198.412.315.606l-2.843 2.295c-.683.551-.62 1.588-.021 2.185.597.598 1.634.664 2.185-.019l2.295-2.845a4.73 4.73 0 002.457.689 4.766 4.766 0 004.39-2.911h1.697a.793.793 0 00.793-.794V9.79c0-.661-.301-1.25-.778-1.609a1.323 1.323 0 00-1.073-2.097c-.386 0-.728.168-.968.43a4.754 4.754 0 00-8.12 0zm-.7-2.016a.265.265 0 100 .53h.376c.345-.009.345-.522 0-.53zm9.144 0c-.345.008-.345.521 0 .53h.376a.265.265 0 100-.53zm-4.385.264a4.237 4.237 0 014.235 4.234 4.234 4.234 0 01-8.467 0c0-2.34 1.9-4.234 4.232-4.234zm0 .53a3.704 3.704 0 10.003 7.407 3.704 3.704 0 00-.003-7.408zm0 .528a3.18 3.18 0 013.176 3.176 3.176 3.176 0 01-6.35 0A3.177 3.177 0 018.73 5.82zM7.408 7.672c0 .29.09.556.25.775-.477.36-.78.948-.78 1.608v.264c0 .442.359.793.794.793H9.79a.793.793 0 00.793-.793v-.264c0-.66-.302-1.249-.779-1.608a1.323 1.323 0 10-2.397-.775zM3.704 8.73c.096 0 .19-.012.28-.032-.007.099-.016.197-.016.297 0 .46.069.902.19 1.322H2.645a.263.263 0 01-.264-.265V9.79c0-.54.268-1.001.65-1.244.196.115.427.185.673.185zM15.08 9.79v.263a.263.263 0 01-.264.265h-1.513c.121-.42.19-.863.19-1.322 0-.1-.009-.198-.015-.297.09.02.183.032.28.032.245 0 .476-.07.672-.185.382.243.65.704.65 1.244zM8.06 8.812c.195.115.426.184.672.184.246 0 .477-.07.672-.184.383.242.651.704.651 1.243v.264a.263.263 0 01-.264.264c-.727 0-1.442.002-2.118 0a.263.263 0 01-.264-.264v-.264c0-.54.268-1 .65-1.243z"
                        style={{
                          lineHeight: "normal",
                          fontVariantLigatures: "normal",
                          fontVariantPosition: "normal",
                          fontVariantCaps: "normal",
                          fontVariantNumeric: "normal",
                          fontVariantAlternates: "normal",
                          fontFeatureSettings: "normal",
                          WebkitTextIndent: "0",
                          textIndent: "0",
                          WebkitTextAlign: "start",
                          textAlign: "start",
                          WebkitTextDecorationLine: "none",
                          textDecorationLine: "none",
                          WebkitTextDecorationStyle: "solid",
                          textDecorationStyle: "solid",
                          WebkitTextDecorationColor: "#fff",
                          textDecorationColor: "#fff",
                          WebkitTextTransform: "none",
                          textTransform: "none",
                          WebkitTextOrientation: "mixed",
                          textOrientation: "mixed",
                          whiteSpace: "normal",
                          shapePadding: "0",
                          isolation: "auto",
                          mixBlendMode: "normal",
                          solidColor: "#fff",
                          solidOpacity: "1",
                        }}
                        fillOpacity="1"
                        fillRule="nonzero"
                        stroke="none"
                        strokeDasharray="none"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="4"
                        strokeOpacity="1"
                        strokeWidth="0.529"
                        baselineShift="baseline"
                        clipRule="nonzero"
                        color="#fff"
                        colorInterpolation="sRGB"
                        colorInterpolationFilters="linearRGB"
                        colorRendering="auto"
                        direction="ltr"
                        display="inline"
                        dominantBaseline="auto"
                        enableBackground="accumulate"
                        fontFamily="sans-serif"
                        fontSize="medium"
                        fontStretch="normal"
                        fontStyle="normal"
                        fontVariant="normal"
                        fontWeight="normal"
                        imageRendering="auto"
                        letterSpacing="normal"
                        opacity="1"
                        overflow="visible"
                        shapeRendering="auto"
                        textAnchor="start"
                        textDecoration="none"
                        textRendering="auto"
                        vectorEffect="none"
                        visibility="visible"
                        wordSpacing="normal"
                        writingMode="lr-tb"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รายการสมัครงาน
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {job.length}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(JobUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>
            </aside>

            <aside className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    width="800px"
                    height="800px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      d="M4 15.8294V15.75V8C4 7.69114 4.16659 7.40629 4.43579 7.25487L4.45131 7.24614L11.6182 3.21475L11.6727 3.18411C11.8759 3.06979 12.1241 3.06979 12.3273 3.18411L19.6105 7.28092C19.8511 7.41625 20 7.67083 20 7.94687V8V15.75V15.8294C20 16.1119 19.8506 16.3733 19.6073 16.5167L12.379 20.7766C12.1451 20.9144 11.8549 20.9144 11.621 20.7766L4.39267 16.5167C4.14935 16.3733 4 16.1119 4 15.8294Z"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <path d="M12 21V12" stroke="#fff" strokeWidth="2" />
                    <path d="M12 12L4 7.5" stroke="#fff" strokeWidth="2" />
                    <path d="M20 7.5L12 12" stroke="#fff" strokeWidth="2" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รายการสินค้าทั้งหมด
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {product.length}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(productUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รูปสินค้าใหม่ / ลดราคา
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {images.length}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(imagesUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M42.3,24l3.4-5.1a2,2,0,0,0,.2-1.7A1.8,1.8,0,0,0,44.7,16l-5.9-2.4-.5-5.9a2.1,2.1,0,0,0-.7-1.5,2,2,0,0,0-1.7-.3L29.6,7.2,25.5,2.6a2.2,2.2,0,0,0-3,0L18.4,7.2,12.1,5.9a2,2,0,0,0-1.7.3,2.1,2.1,0,0,0-.7,1.5l-.5,5.9L3.3,16a1.8,1.8,0,0,0-1.2,1.2,2,2,0,0,0,.2,1.7L5.7,24,2.3,29.1a2,2,0,0,0,1,2.9l5.9,2.4.5,5.9a2.1,2.1,0,0,0,.7,1.5,2,2,0,0,0,1.7.3l6.3-1.3,4.1,4.5a2,2,0,0,0,3,0l4.1-4.5,6.3,1.3a2,2,0,0,0,1.7-.3,2.1,2.1,0,0,0,.7-1.5l.5-5.9L44.7,32a2,2,0,0,0,1-2.9ZM18,31.1l-4.2-3.2L12.7,27h-.1l.6,1.4,1.7,4-2.1.8L9.3,24.6l2.1-.8L15.7,27l1.1.9h0a11.8,11.8,0,0,0-.6-1.3l-1.6-4.1,2.1-.9,3.5,8.6Zm3.3-1.3-3.5-8.7,6.6-2.6.7,1.8L20.7,22l.6,1.6L25.1,22l.7,1.7L22,25.2l.7,1.9,4.5-1.8.7,1.8Zm13.9-5.7-2.6-3.7-.9-1.5h-.1a14.7,14.7,0,0,1,.4,1.7l.8,4.5-2.1.9-5.9-7.7,2.2-.9,2.3,3.3,1.3,2h0a22.4,22.4,0,0,1-.4-2.3l-.7-4,2-.8L33.8,19,35,20.9h0s-.2-1.4-.4-2.4L34,14.6l2.1-.9,1.2,9.6Z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รูปสินค้าใหม่
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {newCount}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(newImagesUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    fill="#ffffff"
                    width="800px"
                    height="800px"
                    viewBox="0 0 581.4 581.4"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M97.92,188.956v-55.98c7.484-6.454,12.24-15.982,12.24-26.64c0-19.434-15.756-35.19-35.19-35.19 s-35.19,15.756-35.19,35.19c0-10.658,4.755-20.187,12.24-26.64v55.98H97.92z" />
                    <path d="M526.32,188.956v-55.98c7.484-6.454,12.24-15.982,12.24-26.64c0-19.434-15.756-35.19-35.19-35.19 c-19.434,0-35.189,15.756-35.189,35.19c0-10.658,4.755-20.187,12.239-26.64v55.98H526.32z" />
                    <polygon points="222.964,375.616 251.526,375.616 237.171,328.87" />
                    <path d="M480.42,204.255H97.92h-45.9H0v306h581.4v-306h-55.08H480.42z M152.774,405.653c-4.612,7.037-11.059,12.373-19.336,16.01 c-8.277,3.635-18.715,5.455-31.31,5.455c-22.115,0-37.43-4.256-45.946-12.771c-8.516-8.518-13.335-19.338-14.458-32.465 l38.229-2.393c-0.83,6.209-2.513,10.939-5.055,14.193c-4.14,5.262-10.052,7.895-17.739,7.895c-5.735,0-10.156-1.348-13.259-4.037 c-3.103-2.689-4.657-5.811-4.657-9.357c-0-3.369-1.478-6.387-4.434-9.049s-9.816-5.174-20.578-7.539 c-17.623-3.963-30.187-9.227-37.696-15.789c-7.57-6.564-11.353-14.93-11.353-25.102c-0-6.684,1.937-12.996,5.811-18.939 c-3.874-5.941,9.697-10.614,17.472-14.014c-7.776-3.4-18.434-5.102-31.977-5.102c-16.616,0-29.284,3.091-38.008,9.27 c-8.721,6.181-13.911,16.01-15.566,29.492l-37.874,2.219c-1.007-5.855-3.118-10.111-6.344-12.773 c-3.222-2.662-7.671-3.99-13.348-3.99c-4.672,0-8.188,0.992-10.554,2.971c-2.365-1.98-3.547,4.393-3.547,7.232 c-0-2.068,0.977-3.932,2.929-5.586c-1.891-1.715-6.386-3.312-13.482-4.789c-17.561-3.785-30.144-7.613-37.742-11.488 c-7.598-3.873-13.127-8.678-16.585-14.412c-3.458-5.738-5.19-12.15-5.19-19.248C159.692,390.927,157.385,398.618,152.774,405.653z" />
                    <path d="M266.367,424.575l-6.506-21.42H214.24l-6.343,21.42h-41.019l48.874-128.52h43.829l48.859,128.52H266.367z" />
                    <path d="M425.34,424.575H321.3 v-128.52h39.78v97.92h64.26V424.575z" />
                    <path d="M550.8,296.056v27.539H483.48v18.361h61.2v27.539h-61.2v24.48H550.8v30.6H443.7v-128.52H550.8z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    รูปสินค้าลดราคา
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {saleCount}
                  </h4>
                </div>
                <div className="border-t  p-4">
                  <p className="block antialiased  text-base leading-relaxed font-normal ">
                    <strong className="text-green-500">
                      {DateTime.fromISO(saleImagesUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>
            </aside>
            <aside className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-2">

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md col-span-1">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    fill="#ffffff"
                    height="800px"
                    width="800px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-63 65 128 128"
                    xmlSpace="preserve"
                    stroke="#ffffff"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M46.8,154L18,160.6c-0.2,1.4-0.8,2.9-1.7,4.1c-1.7,2.6-4.3,4.5-7.3,5.3c-3,0.7-6.2,0.2-8.8-1.6l-24.8-15.8 c-1.2-0.7-1.4-2.1-0.7-3.2s2.1-1.4,3.1-0.7l24.9-15.8c3.3,2,7.6,1.1,9.7-2.1s1.1-7.6-2.1-9.7l-31-19.6c-5.1-3.2-11-5.7-16.6-2.9 L-63,144.8v29.4l18.4-13.7c2.9-0.7,6.1-0.1,8.8,1.6l21.6,13.6c5.3,3.3,11.8,4.1,17.4,2.6L50,167.6c3.7-0.8,6.2-4.5,5.3-8.5 C54.3,155.5,50.6,153.2,46.8,154z M26.4,81.3C8.2,81.3-6.5,96-6.5,114.2c0,18.2,14.7,32.9,32.9,32.9c18.2,0,32.9-14.7,32.9-32.9 C59.3,96,44.5,81.3,26.4,81.3z M45.1,102l-22.6,31.2L8,117.5c-1.6-1.8-1.5-4.5,0.2-6.2c1.8-1.6,4.5-1.5,6.2,0.2l7.3,7.9L38,96.9 c1.4-1.9,4.1-2.4,6.1-1C46,97.3,46.5,100.1,45.1,102z" />
                  </svg>
                </div>

                <div className="p-4 text-right">
                  <p className="block antialiased  text-[16px] leading-normal font-normal ">
                    สินค้าแนะนำ
                  </p>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {recommendCount}
                  </h4>
                </div>
                <div className="border-y p-4 w-full flex items-center justify-center sm:py-10">
                  <div
                    className="radial-progress bg-gradient-to-tr from-slate-300 to-slate-100s text-yellow-500"
                    style={{
                      "--value": `${percenRecommend.toFixed(0)}`,
                      "--size": "11rem",
                      "--thickness": "1.5rem",
                    }}
                  >
                    {percenRecommend.toFixed(0)}%
                  </div>
                </div>

                <div className="p-4">
                  <p className="block antialiased text-base leading-relaxed font-normal sm:mt-5">
                    <strong className="text-green-500">
                      {DateTime.fromISO(recommendProductUpdatedAt.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </strong>
                    &nbsp;อัพเดท
                  </p>
                </div>
              </div>
              {catalog && catalog.map((item) => (
                <div
                  key={item._id}
                  className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md col-span-1"
                >
                  <div className="p-4 text-center">
                    <p className="block antialiased text-lg font-semibold leading-normal">
                      E-Catalog
                    </p>
                  </div>
                  <div className="border-t  p-4 flex-grow flex items-center justify-center">
                    <Link
                      href={`${URL_IMAGES}${item.file}`}
                      className="block antialiased text-base leading-relaxed font-normal hover:text-red-600"
                    >
                      {item.file}
                    </Link>

                  </div>
                  <div className="border-t  p-4 grid grid-cols-col lg:grid-cols-2">
                    <p className="block antialiased  text-base leading-relaxed font-normal ">

                      &nbsp;อัพเดทเมื่อ {" "}
                      <strong className="text-green-500">
                        {DateTime.fromISO(item.updatedAt)
                          .setZone("Asia/Bangkok")
                          .toRelative({ locale: "th" })}
                      </strong>
                    </p>
                    <div className="flex items-center justify-center lg:justify-end"><Link
                      href={`/admin/editcatalog/${item._id}`}
                      className="btn btn-outline btn-primary btn-sm m-1"
                    >
                      แก้ไข
                    </Link></div>
                  </div>
                </div>
              ))}


            </aside>
            <aside className="mb-12 grid grid-cols-1 gap-6">


              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                  <div>
                    <h6 className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                      หมวดหมู่สินค้า
                    </h6>
                    <p className="antialiased  text-sm leading-normal flex items-center gap-1 font-normal ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        ></path>
                      </svg>
                      <strong>{category.length}</strong> รายการ
                    </p>
                  </div>
                </div>
                <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        <th className="border-b  py-3 px-6 text-left">
                          <p className="block antialiased  text-[14px] font-medium uppercase text-blue-gray-400">
                            ชื่อหมวดหมู่
                          </p>
                        </th>
                        <th className="border-b  py-3 px-6 text-left">
                          <p className="block antialiased  text-[14px] font-medium uppercase text-blue-gray-400 text-center">
                            จำนวนราการสินค้า
                          </p>
                        </th>
                        <th className="border-b  py-3 px-6 text-left">
                          <p className="block antialiased  text-[14px] font-medium uppercase text-blue-gray-400">
                            เปอร์เซ็นต์ / รายการสินค้า
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category &&
                        category.map((categoryItem) => {
                          // นับจำนวนสินค้าที่มีชื่อ category ตรงกับ categoryItem.name
                          const productCount = product.filter(
                            (productItem) =>
                              productItem.category?.name === categoryItem?.name
                          ).length;
                          const percentage =
                            (productCount / product.length) * 100;
                          return (
                            <tr key={categoryItem._id}>
                              <td className="py-3 px-5 border-b ">
                                <div className="flex items-center gap-4">
                                  <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
                                    {categoryItem.name}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-5 border-b ">
                                <p className="block antialiased text-xs font-medium  text-center">
                                  {productCount}
                                </p>
                              </td>
                              <td className="py-3 px-5 border-b ">
                                <div className="w-10/12">
                                  <p className="antialiased mb-1 block text-xs font-medium ">
                                    {percentage.toFixed(0)}%
                                  </p>
                                  <progress
                                    className="progress progress-accent w-full md:w-1/2"
                                    value={percentage.toFixed(0)}
                                    max="100"
                                  ></progress>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>


            </aside>

            <aside className="mb-12 grid gap-y-10 gap-x-6">
              <Barchart data={homepage} />
            </aside>
          </article>
        </section>
      </main>
    </>
  );
};

export default Admin;
