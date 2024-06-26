'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

const Footer = () => {
  const [data, setData] = useState([]);
  const [isScrolledBottom, setIsScrolledBottom] = useState(true);

  useEffect(() => {
    loadData();
    window.addEventListener('scroll', handleScroll); // เพิ่ม event listener เมื่อ scroll
    return () => window.removeEventListener('scroll', handleScroll); // ลบ event listener เมื่อ unmount
  }, []);


  const loadData = async () => {
    await axios
      .post(API_URL + "/catalogby", {
        limit: 1,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const footerElement = document.getElementById('footer'); // ดึงข้อมูลของ footer element

    // ตรวจสอบว่าเลื่อนผ่าน id footer หรือไม่
    const isScrolledPastFooter = footerElement && scrollTop > footerElement.offsetTop;

    // ตั้งค่าตามเงื่อนไข
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolledBottom(false);
    } else if (isScrolledPastFooter) {
      setIsScrolledBottom(true);
    } else {
      setIsScrolledBottom(true);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight,
      behavior: "smooth",
    });

  };
  return (

    <main id="footer" className="relative mt-5 z-20 w-full">
      <section className="w-full bg-[#ED2024]">
        <nav className="grid grid-cols-4 md:grid-cols-6 w-full rounded-t-3xl bg-[#ED2024]  pt-6 px-4 duration-500 max-w-screen-xl mx-auto">
          <aside className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Link
              href={"/about"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              ตัวแทนจำหน่าย
            </Link>
            <Link
              href={"/about"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              เกี่ยวกับเรา
            </Link>
          </aside>
          <aside className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Link
              href={"/newproducts"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              สินค้า{" "}
              <span className="text-red-400 badge text-xs md:text-sm">
                ใหม่
              </span>
            </Link>
            <Link
              href={"/saleproducts"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              สินค้า{" "}
              <span className="text-red-400 badge text-xs md:text-sm">
                ลดราคา
              </span>
            </Link>
          </aside>
          <aside className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Link
              href={"/recomproducts"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              สินค้า{" "}
              <span className="text-red-400 badge text-xs md:text-sm">
                แนะนำ
              </span>
            </Link>

            <span className="flex flex-col justify-center">
              <Link href={"/allproducts"} className=" text-white text-center text-xs md:text-sm whitespace-normal">
                E-Catalog{" "}
              </Link>
              {data &&
                data.map((item) => (
                  <span key={item._id}>
                    <Link
                      href={`${URL_IMAGES}${item.file}`}
                      className="text-white text-xs md:text-sm text-center hover:underline whitespace-normal"
                    >
                      (ดาวน์โหลด PDF)
                    </Link>
                  </span>
                ))}
            </span>


          </aside>

          <aside className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Link
              href={"/doc"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              เอกสารรับรอง
            </Link>
            <Link
              href={"/job"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              สมัครงาน
            </Link>
          </aside>
          <aside className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <Link
              href={"/question"}
              className="mb-4 text-white text-xs md:text-sm"
            >
              คำถามที่พบบ่อย
            </Link>
          </aside>
          <aside className="col-span-4 md:col-span-1 flex flex-col items-center justify-center">
            <article className="flex flex-col items-center justify-center">
              <img
                src={`/images/qr.png`}
                alt="qr"
                className="w-24 h-auto object-fill object-center rounded-md mb-1"
                loading="lazy"
              />
              <div className="flex items-center justify-center space-x-3">
                <Link
                  href={"https://www.facebook.com/donmarkOfficial/"}
                  target="_blank"
                  className="hover:scale-125 duration-300"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.1154 18.0629C33.1154 9.75399 26.3719 3.0105 18.0629 3.0105C9.75399 3.0105 3.0105 9.75399 3.0105 18.0629C3.0105 25.3483 8.18854 31.4145 15.0525 32.8143V22.5787H12.042V18.0629H15.0525V14.2998C15.0525 11.3947 17.4157 9.03148 20.3208 9.03148H24.0839V13.5472H21.0734C20.2456 13.5472 19.5682 14.2246 19.5682 15.0525V18.0629H24.0839V22.5787H19.5682V33.0401C27.1697 32.2875 33.1154 25.8752 33.1154 18.0629Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href={"https://www.tiktok.com/@donmark.official/"}
                  target="_blank"
                  className="hover:scale-125 duration-300"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9871 8.76054C23.9581 7.58588 23.3911 6.07734 23.3915 4.51575H18.7403V23.1808C18.7044 24.1908 18.278 25.1476 17.5508 25.8495C16.8236 26.5514 15.8524 26.9438 14.8417 26.9439C12.7043 26.9439 10.9281 25.1978 10.9281 23.0303C10.9281 20.4412 13.4268 18.4995 16.0008 19.2972V14.5407C10.8077 13.8483 6.26184 17.8823 6.26184 23.0303C6.26184 28.0427 10.4163 31.6102 14.8267 31.6102C19.5532 31.6102 23.3915 27.7718 23.3915 23.0303V13.5623C25.2776 14.9168 27.542 15.6435 29.8641 15.6395V10.9883C29.8641 10.9883 27.0342 11.1238 24.9871 8.76054Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href={"https://www.youtube.com/@DONMARKOfficial"}
                  target="_blank"
                  className="hover:scale-125 duration-300"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.0525 22.5787L22.8647 18.063L15.0525 13.5472V22.5787ZM32.4531 10.7926C32.6488 11.5001 32.7842 12.4484 32.8746 13.6526C32.9799 14.8568 33.0251 15.8954 33.0251 16.7986L33.1154 18.063C33.1154 21.3594 32.8746 23.7829 32.4531 25.3333C32.0768 26.688 31.2037 27.5611 29.849 27.9374C29.1415 28.133 27.847 28.2685 25.8601 28.3588C23.9033 28.4642 22.1121 28.5094 20.4563 28.5094L18.0629 28.5997C11.756 28.5997 7.82728 28.3588 6.27688 27.9374C4.92216 27.5611 4.04912 26.688 3.67281 25.3333C3.47712 24.6258 3.34165 23.6775 3.25134 22.4733C3.14597 21.2691 3.10081 20.2305 3.10081 19.3274L3.0105 18.063C3.0105 14.7665 3.25134 12.343 3.67281 10.7926C4.04912 9.43791 4.92216 8.56486 6.27688 8.18855C6.98434 7.99287 8.27885 7.8574 10.2658 7.76708C12.2226 7.66172 14.0138 7.61656 15.6696 7.61656L18.0629 7.52625C24.3699 7.52625 28.2986 7.76708 29.849 8.18855C31.2037 8.56486 32.0768 9.43791 32.4531 10.7926Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href={"https://www.instagram.com/donmark_thailand/"}
                  target="_blank"
                  className="hover:scale-125 duration-300"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6103 2.76971C20.7087 2.76583 21.8072 2.77598 22.9053 2.80016L23.1973 2.80985C23.5345 2.82092 23.8671 2.83476 24.269 2.85137C25.8706 2.92058 26.9634 3.15311 27.9223 3.49499C28.9157 3.84656 29.7526 4.32271 30.5896 5.09228C31.3548 5.78381 31.947 6.62029 32.3251 7.54358C32.6969 8.42528 32.9498 9.43154 33.025 10.9043C33.0431 11.2724 33.0581 11.5797 33.0702 11.8898L33.0792 12.1583C33.106 13.1676 33.1175 14.1772 33.1138 15.1868L33.1153 16.2193V18.0325C33.1191 19.0426 33.1075 20.0527 33.0807 21.0624L33.0717 21.3309C33.0597 21.641 33.0446 21.9469 33.0265 22.3164C32.9513 23.7892 32.6954 24.794 32.3251 25.6757C31.9483 26.6 31.3559 27.4372 30.5896 28.1284C29.8369 28.832 28.9267 29.3766 27.9223 29.7243C26.9634 30.0662 25.8706 30.2987 24.269 30.3679C23.8671 30.3846 23.5345 30.3984 23.1973 30.4095L22.9053 30.4178C21.8072 30.4424 20.7087 30.453 19.6103 30.4496L18.4874 30.451H16.517C15.4186 30.4544 14.3201 30.4438 13.222 30.4192L12.93 30.4108C12.5727 30.3989 12.2154 30.3851 11.8583 30.3693C10.2567 30.3001 9.16389 30.0648 8.20355 29.7243C7.19907 29.3774 6.28923 28.8327 5.53776 28.1284C4.77166 27.4367 4.17886 26.5997 3.8007 25.6757C3.42891 24.794 3.17603 23.7892 3.10077 22.3164C3.084 21.988 3.06895 21.6595 3.05561 21.3309L3.04808 21.0624C3.02033 20.0527 3.00779 19.0426 3.01045 18.0325V15.1868C3.00625 14.1772 3.01729 13.1676 3.04357 12.1583L3.0541 11.8898C3.06615 11.5797 3.0812 11.2724 3.09926 10.9043C3.17452 9.43016 3.4274 8.42666 3.7992 7.54358C4.17758 6.61984 4.77153 5.78358 5.53926 5.09367C6.29022 4.3888 7.19949 3.8432 8.20355 3.49499C9.16389 3.15311 10.2552 2.92058 11.8583 2.85137L12.93 2.80985L13.222 2.80293C14.3196 2.77742 15.4176 2.76589 16.5155 2.76832L19.6103 2.76971ZM18.0629 9.69037C17.0657 9.6774 16.0756 9.84681 15.1502 10.1888C14.2248 10.5307 13.3826 11.0384 12.6724 11.6822C11.9622 12.3261 11.3983 13.0933 11.0134 13.9393C10.6285 14.7854 10.4302 15.6933 10.4302 16.6103C10.4302 17.5274 10.6285 18.4353 11.0134 19.2814C11.3983 20.1274 11.9622 20.8946 12.6724 21.5385C13.3826 22.1823 14.2248 22.69 15.1502 23.0319C16.0756 23.3739 17.0657 23.5433 18.0629 23.5303C20.059 23.5303 21.9733 22.8012 23.3847 21.5033C24.7962 20.2054 25.5891 18.4451 25.5891 16.6097C25.5891 14.7742 24.7962 13.0139 23.3847 11.716C21.9733 10.4181 20.059 9.69037 18.0629 9.69037ZM18.0629 12.4586C18.6628 12.4485 19.2588 12.5483 19.8162 12.7524C20.3736 12.9564 20.8812 13.2605 21.3094 13.647C21.7375 14.0334 22.0777 14.4945 22.3099 15.0031C22.5421 15.5118 22.6617 16.058 22.6618 16.6096C22.6619 17.1613 22.5425 17.7075 22.3104 18.2162C22.0784 18.725 21.7385 19.1861 21.3105 19.5727C20.8824 19.9593 20.3749 20.2636 19.8176 20.4678C19.2603 20.672 18.6643 20.772 18.0644 20.7621C16.8668 20.7621 15.7182 20.3246 14.8713 19.5458C14.0244 18.7671 13.5487 17.7109 13.5487 16.6097C13.5487 15.5084 14.0244 14.4522 14.8713 13.6735C15.7182 12.8947 16.8668 12.4573 18.0644 12.4573L18.0629 12.4586ZM25.9654 7.61417C25.4798 7.63205 25.0206 7.822 24.6839 8.14426C24.3472 8.46651 24.1591 8.89607 24.1591 9.34296C24.1591 9.78985 24.3472 10.2194 24.6839 10.5417C25.0206 10.8639 25.4798 11.0539 25.9654 11.0717C26.4645 11.0717 26.943 10.8895 27.2959 10.565C27.6488 10.2405 27.847 9.80044 27.847 9.34157C27.847 8.8827 27.6488 8.44263 27.2959 8.11816C26.943 7.79369 26.4645 7.61141 25.9654 7.61141V7.61417Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          </aside>

          <aside className="col-span-4 md:col-span-6 flex items-center justify-center">
            <Link href={"/"} className="btn btn-ghost normal-case text-xl">
              <svg
                width="113"
                height="13"
                viewBox="0 0 113 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M74.7208 2.34839H71.8004L65.5222 12.749H68.7579L70.0108 10.6312L71.4487 8.28945L73.2668 5.2752L75.075 8.2897L76.5104 10.6309L77.7636 12.749H80.9991L74.7208 2.34839Z"
                  fill="#fff"
                />
                <path
                  d="M94.7245 8.89111C94.8457 8.84752 94.9641 8.79872 95.0779 8.74522C95.4279 8.58124 95.737 8.35955 95.9973 8.08609C96.261 7.80892 96.4675 7.47428 96.611 7.09109C96.7515 6.71533 96.8229 6.28433 96.8229 5.81023C96.8229 4.7538 96.492 3.90171 95.8396 3.27751C95.1949 2.66099 94.3048 2.34814 93.1946 2.34814H82.1987V12.7488H84.7349V9.16804H91.847L94.3512 12.7347L94.3611 12.749H97.3491L94.725 8.89111H94.7245ZM94.2481 5.81073C94.2481 6.22885 94.0934 6.40372 93.9771 6.49908C93.766 6.67198 93.4249 6.75966 92.9634 6.75966H84.7347V4.75702H92.8223C94.0788 4.75702 94.2483 5.28957 94.2483 5.81048L94.2481 5.81073Z"
                  fill="#fff"
                />
                <path
                  d="M14.7915 5.48005C14.5221 4.82166 14.1304 4.25295 13.6275 3.78975C13.1295 3.33126 12.5185 2.9716 11.8116 2.72068C11.1141 2.47348 10.3239 2.34839 9.46258 2.34839H0V12.7493H9.75779C10.4845 12.7493 11.1763 12.6324 11.8141 12.402C12.4586 12.1694 13.0371 11.8244 13.5326 11.3778C14.0766 10.891 14.4938 10.3278 14.7726 9.70307C15.0517 9.07788 15.193 8.38803 15.193 7.65311C15.193 6.86246 15.0579 6.1315 14.7915 5.4798V5.48005ZM9.88644 10.3924H2.72605C2.58575 10.3924 2.47198 10.2792 2.47198 10.1393V4.95815C2.47198 4.81844 2.58575 4.705 2.72605 4.705H9.59123C10.0547 4.705 10.4771 4.77658 10.8469 4.91752C11.2088 5.05549 11.5226 5.25266 11.7792 5.50358C12.0347 5.75376 12.236 6.05867 12.3773 6.41016C12.5205 6.76635 12.5931 7.17134 12.5931 7.61397C12.5931 8.02243 12.5247 8.40166 12.3896 8.74076C12.2548 9.07887 12.0679 9.37363 11.8337 9.61637C11.6014 9.85714 11.3169 10.0484 10.9885 10.1846C10.6566 10.3223 10.286 10.3919 9.88644 10.3919V10.3924Z"
                  fill="#fff"
                />
                <path
                  d="M29.475 3.65376C28.918 3.24456 28.253 2.92082 27.4985 2.6912C26.8548 2.49552 26.1672 2.38282 25.4501 2.35532C25.3334 2.35086 22.8842 2.34863 22.7659 2.34863C21.9125 2.34863 21.1025 2.46406 20.3579 2.6917C19.6094 2.92082 18.9433 3.24382 18.3782 3.65227C16.9874 4.66115 16.282 5.97222 16.282 7.54907C16.282 9.12593 16.9787 10.4665 18.3539 11.4595C18.9104 11.8595 19.5766 12.1786 20.3336 12.4072C21.0861 12.6343 21.9044 12.7498 22.7657 12.7498C22.8522 12.7498 25.2701 12.7485 25.3557 12.7463C26.1213 12.726 26.8468 12.6143 27.5158 12.4136C28.2649 12.189 28.9269 11.8722 29.4844 11.4714C30.8588 10.4789 31.5556 9.15937 31.5556 7.54932C31.5556 5.93928 30.8551 4.66239 29.4745 3.65425L29.475 3.65376ZM22.7659 10.4912C22.1455 10.4912 21.5806 10.4152 21.0871 10.2648C20.6031 10.1177 20.1876 9.91089 19.852 9.65055C19.5258 9.39765 19.2713 9.09001 19.096 8.7363C18.9205 8.38233 18.8315 7.9828 18.8315 7.54907C18.8315 7.11535 18.9238 6.74529 19.1057 6.39306C19.2896 6.03687 19.5518 5.72477 19.8847 5.46568C20.2258 5.20064 20.6427 4.98935 21.1236 4.83826C21.6121 4.68468 22.1646 4.60691 22.7659 4.60691C22.8277 4.60691 25.2211 4.6079 25.2818 4.60963C25.7575 4.62325 26.2049 4.69063 26.6136 4.81027C27.0689 4.94353 27.4697 5.1293 27.8014 5.36041C28.6121 5.93631 29.0063 6.65216 29.0063 7.54932C29.0063 7.98329 28.9173 8.38283 28.7418 8.73654C28.566 9.09075 28.3132 9.39889 27.9902 9.65229C27.6588 9.91212 27.2479 10.1185 26.7688 10.2653C26.3538 10.3927 25.8858 10.4667 25.3745 10.4863C25.2835 10.4898 22.8594 10.4915 22.7657 10.4915L22.7659 10.4912Z"
                  fill="#fff"
                />
                <path
                  d="M45.4608 2.34839V9.11181C45.4608 9.22303 45.3341 9.28842 45.2416 9.22476L35.2484 2.34839H32.645V12.7493H35.1378V5.92516C35.1378 5.83872 35.2362 5.78794 35.3079 5.83748L45.3633 12.7493H47.9533V2.34839H45.4608Z"
                  fill="#fff"
                />
                <path
                  d="M61.4512 2.34839L56.6946 7.78117L51.9517 2.34839H49.0427V12.749H51.8045V5.95835C51.8045 5.92368 51.8481 5.90782 51.8709 5.93408L56.678 11.4702L61.5105 5.94944C61.5407 5.91501 61.598 5.93606 61.598 5.98164V12.749H64.3597V2.34839H61.4512Z"
                  fill="#fff"
                />
                <path
                  d="M101.742 7.31079L108.034 2.34839H113L106.281 7.26943L113 12.749H108.409L101.742 7.31079Z"
                  fill="#fff"
                />
                <path
                  d="M101.742 6.77997V2.34839H98.4377V12.749H101.742V9.64189V6.77997Z"
                  fill="#fff"
                />
                <path
                  d="M78.547 4.73353C77.2365 4.73353 76.1702 3.67189 76.1702 2.36677C76.1702 1.06164 77.2365 0 78.547 0C79.8574 0 80.9238 1.06164 80.9238 2.36677C80.9238 3.67189 79.8574 4.73353 78.547 4.73353ZM78.547 1.54936C78.0944 1.54936 77.726 1.91595 77.726 2.36677C77.726 2.81758 78.0944 3.18417 78.547 3.18417C78.9996 3.18417 79.3679 2.81758 79.3679 2.36677C79.3679 1.91595 78.9996 1.54936 78.547 1.54936Z"
                  fill="#fff"
                />
              </svg>
            </Link>
          </aside>
        </nav>
      </section>

      <section>
        <button
          onClick={scrollToBottom}
          className={` ${isScrolledBottom
            ? "fixed flex items-center justify-center bottom-0 left-1/2 -translate-x-1/2 z-50 text-white bg-[#ED2024] hover:bg-white group hover:ring ring-[#ED2024] px-5 rounded-t-lg duration-300"
            : "hidden"
            }`}
        >
          <ChevronDoubleDownIcon className="h-6 w-6" />
          <span>
            <img
              src={`/images/logoW.png`}
              alt="Logo-Donmark-White"
              className="w-9 md:w-11 h-auto duration-300 group-hover:hidden"
              loading="lazy" />
            <img
              src={`/images/logo.png`}
              alt="Logo-Donmark"
              className="w-9 md:w-11 h-auto group-hover:scale-125 group-hover:duration-500 duration-500 hidden group-hover:block"
              loading="lazy" />
          </span>
          <ChevronDoubleDownIcon className="h-6 w-6" />
        </button>
      </section>

    </main>

  );
};

export default Footer;
