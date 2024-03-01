'use client'
import { Noto_Sans_Thai } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";



const notosansthai = Noto_Sans_Thai({ subsets: ["latin"] });



export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire("ออกจากระบบแล้ว", "", "success");

    localStorage.removeItem("donmarktoken");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
      <head>
        <title>Donmark || Admin</title>
      </head>
      <body className={notosansthai.className}>
        <div className="flex h-screen overflow-auto">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 z-10 flex flex-col w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${isSidebarOpen ? '' : '-translate-x-full lg:translate-x-0 lg:w-20'
              }`}

          >

            {/* Sidebar header */}
            <header className={`flex flex-col items-center justify-center p-2 `}>
              <aside className={`${!isSidebarOpen ? 'lg:hidden' : 'avatar w-full mx-auto px-16 lg:px-12 mt-2'}`}>
                <div className="w-full rounded-full ring ring-red-600   ">
                  <Image
                    src={`/images/logo.png`}
                    alt="donmark"
                    width={300}
                    height={300}
                    className="w-full h-auto object-fill object-center p-3"
                    loading='lazy'
                  />
                </div>
              </aside>

              <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
                <div className={`${isSidebarOpen ? 'hidden' : 'w-full rounded-full  '}`}>
                  <Image
                    src={`/images/logo.png`}
                    alt="donmark"
                    width={300}
                    height={300}
                    className="w-full h-auto object-fill object-center p-3"
                    loading='lazy'
                  />
                </div>

              </span>
              <span className={`${!isSidebarOpen ? 'lg:hidden' : 'text-sm md:text-xl font-bold text-slate-700 text-center'}`}>ระบบจัดการข้อมูล</span>
              <span className={`${!isSidebarOpen ? 'lg:hidden' : 'text-sm md:text-xl font-bold text-slate-700 text-center'}`}>DONMARK</span>
              <button onClick={toggleSidebar} className=" absolute top-0 right-0 p-2 rounded-md lg:hidden">
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            {/* Sidebar links */}
            <nav className="flex-grow hover:overflow-y-auto">
              <ul className="p-2 overflow-hidden">
                <li>
                  <Link
                    href="/admin"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin' ? 'bg-red-100' : 'bg-white'} `}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Dashboard</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/adminhomepage"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminhomepage' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M3 1H1v18h18V1H3zm14 2v14H3V3h14zm4 18H5v2h18V5h-2v16zM15 5H5v2h10V5zM5 9h10v2H5V9zm7 4H5v2h7v-2z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>บทความ</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/adminimageslide"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminimageslide' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 15.118 15.107"
                        version="1.1"
                        viewBox="0 0 15.118 15.107"
                        xmlSpace="preserve"
                      >
                        <path
                          fill="#9CA3AF "
                          d="M14.059 5.436V3.245l-2.204-1.102L9.712 0 7.559.538 5.406 0 3.263 2.143 1.059 3.245v2.191L0 7.554l1.059 2.118v2.191l2.204 1.102 2.143 2.143 2.153-.538 2.153.538 2.143-2.143 2.204-1.102V9.672l1.059-2.118-1.059-2.118zm-1 4v1.809l-1.724.862L9.406 14l-1.847-.462L5.712 14l-1.8-1.8-1.854-.956V9.436l-.94-1.882.941-1.882V3.863l1.724-.862 1.93-1.894 1.847.462 1.847-.462 1.8 1.8 1.854.956v1.809L14 7.554l-.941 1.882z"
                        ></path>
                        <path
                          fill="#9CA3AF"
                          d="M3.316 7.054H11.800999999999998V8.054H3.316z"
                          transform="rotate(-45.001 7.559 7.554)"
                        ></path>
                        <path
                          fill="#9CA3AF"
                          d="M5.559 7.054c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5-1.5.673-1.5 1.5.673 1.5 1.5 1.5zm0-2a.5.5 0 110 1 .5.5 0 010-1zM9.559 8.054c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm0 2a.5.5 0 110-1 .5.5 0 010 1z"
                        ></path>
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Promotion</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/admincategory"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/admincategory' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>หมวดหมู่สินค้า</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/adminimageproduct"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminimageproduct' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>สินค้าใหม่ / ลดราคา</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/adminallproduct"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminallproduct' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"

                      >
                        <path
                          d="M4 15.8294V15.75V8C4 7.69114 4.16659 7.40629 4.43579 7.25487L4.45131 7.24614L11.6182 3.21475L11.6727 3.18411C11.8759 3.06979 12.1241 3.06979 12.3273 3.18411L19.6105 7.28092C19.8511 7.41625 20 7.67083 20 7.94687V8V15.75V15.8294C20 16.1119 19.8506 16.3733 19.6073 16.5167L12.379 20.7766C12.1451 20.9144 11.8549 20.9144 11.621 20.7766L4.39267 16.5167C4.14935 16.3733 4 16.1119 4 15.8294Z"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                        />
                        <path d="M12 21V12" stroke="#9CA3AF" strokeWidth="2" />
                        <path d="M12 12L4 7.5" stroke="#9CA3AF" strokeWidth="2" />
                        <path d="M20 7.5L12 12" stroke="#9CA3AF" strokeWidth="2" />
                      </svg>

                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>สินค้าทั้งหมด</span>
                  </Link>

                </li>


                <li>
                  <Link
                    href="/admin/adminjob"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminjob' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        version="1.1"
                        viewBox="0 0 16.933 16.933"
                      >
                        <g>
                          <path
                            fill="#9CA3AF"
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
                              WebkitTextDecorationColor: "#9CA3AF",
                              textDecorationColor: "#9CA3AF",
                              WebkitTextTransform: "none",
                              textTransform: "none",
                              WebkitTextOrientation: "mixed",
                              textOrientation: "mixed",
                              whiteSpace: "normal",
                              shapePadding: "0",
                              isolation: "auto",
                              mixBlendMode: "normal",
                              solidColor: "#9CA3AF",
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
                            color="#9CA3AF"
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
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>สมัครงาน</span>
                  </Link>

                </li>

                <li>
                  <Link
                    href="/admin/adminquestion"
                    className={`${isSidebarOpen ? 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-start' : 'flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 justify-center'} ${pathname === '/admin/adminquestion' ? 'bg-red-100' : 'bg-white'}`}
                  >
                    <span>
                      <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9CA3AF">
                        <path d="M11.967 12.75C12.967 11.75 13.967 11.3546 13.967 10.25C13.967 9.14543 13.0716 8.25 11.967 8.25C11.0351 8.25 10.252 8.88739 10.03 9.75M11.967 15.75H11.977M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>คำถามที่พบบ่อย</span>
                  </Link>

                </li>



              </ul>
            </nav>
            {/* Sidebar footer */}
            <footer className="flex-col justify-center items-center p-2 border-t">
              <Link href={"/"} className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium text-center hover:bg-green-100  rounded-xl mb-2 text-lg duration-300">
                <span>
                  🌎
                </span>
                <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>เข้าชมเว็บไซต์</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase text-white bg-red-600 border rounded-md focus:outline-none focus:ring">
                <span>
                  <svg
                    className="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Logout</span>
              </button>
            </footer>
          </aside>


          {/* Header */}
          <aside className="flex flex-col flex-1 h-full overflow-hidden">
            {/* Navbar */}
            <header className="flex-shrink-0 border-b">
              <div className="flex items-center justify-between p-2">
                {/* Navbar Start */}
                <div className="flex items-center space-x-3">
                  <button onClick={toggleSidebar} className="btn btn-ghost cursor-default normal-case text-xl w-24 sm:w-36 md:w-56 relative duration-500 lg:hidden">
                    <svg
                      width="170"
                      height="170"
                      viewBox="0 0 113 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white absolute px-8 md:px-2"
                    >
                      <path
                        d="M74.7208 2.34839H71.8004L65.5222 12.749H68.7579L70.0108 10.6312L71.4487 8.28945L73.2668 5.2752L75.075 8.2897L76.5104 10.6309L77.7636 12.749H80.9991L74.7208 2.34839Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M94.7245 8.89111C94.8457 8.84752 94.9641 8.79872 95.0779 8.74522C95.4279 8.58124 95.737 8.35955 95.9973 8.08609C96.261 7.80892 96.4675 7.47428 96.611 7.09109C96.7515 6.71533 96.8229 6.28433 96.8229 5.81023C96.8229 4.7538 96.492 3.90171 95.8396 3.27751C95.1949 2.66099 94.3048 2.34814 93.1946 2.34814H82.1987V12.7488H84.7349V9.16804H91.847L94.3512 12.7347L94.3611 12.749H97.3491L94.725 8.89111H94.7245ZM94.2481 5.81073C94.2481 6.22885 94.0934 6.40372 93.9771 6.49908C93.766 6.67198 93.4249 6.75966 92.9634 6.75966H84.7347V4.75702H92.8223C94.0788 4.75702 94.2483 5.28957 94.2483 5.81048L94.2481 5.81073Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M14.7915 5.48005C14.5221 4.82166 14.1304 4.25295 13.6275 3.78975C13.1295 3.33126 12.5185 2.9716 11.8116 2.72068C11.1141 2.47348 10.3239 2.34839 9.46258 2.34839H0V12.7493H9.75779C10.4845 12.7493 11.1763 12.6324 11.8141 12.402C12.4586 12.1694 13.0371 11.8244 13.5326 11.3778C14.0766 10.891 14.4938 10.3278 14.7726 9.70307C15.0517 9.07788 15.193 8.38803 15.193 7.65311C15.193 6.86246 15.0579 6.1315 14.7915 5.4798V5.48005ZM9.88644 10.3924H2.72605C2.58575 10.3924 2.47198 10.2792 2.47198 10.1393V4.95815C2.47198 4.81844 2.58575 4.705 2.72605 4.705H9.59123C10.0547 4.705 10.4771 4.77658 10.8469 4.91752C11.2088 5.05549 11.5226 5.25266 11.7792 5.50358C12.0347 5.75376 12.236 6.05867 12.3773 6.41016C12.5205 6.76635 12.5931 7.17134 12.5931 7.61397C12.5931 8.02243 12.5247 8.40166 12.3896 8.74076C12.2548 9.07887 12.0679 9.37363 11.8337 9.61637C11.6014 9.85714 11.3169 10.0484 10.9885 10.1846C10.6566 10.3223 10.286 10.3919 9.88644 10.3919V10.3924Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M29.475 3.65376C28.918 3.24456 28.253 2.92082 27.4985 2.6912C26.8548 2.49552 26.1672 2.38282 25.4501 2.35532C25.3334 2.35086 22.8842 2.34863 22.7659 2.34863C21.9125 2.34863 21.1025 2.46406 20.3579 2.6917C19.6094 2.92082 18.9433 3.24382 18.3782 3.65227C16.9874 4.66115 16.282 5.97222 16.282 7.54907C16.282 9.12593 16.9787 10.4665 18.3539 11.4595C18.9104 11.8595 19.5766 12.1786 20.3336 12.4072C21.0861 12.6343 21.9044 12.7498 22.7657 12.7498C22.8522 12.7498 25.2701 12.7485 25.3557 12.7463C26.1213 12.726 26.8468 12.6143 27.5158 12.4136C28.2649 12.189 28.9269 11.8722 29.4844 11.4714C30.8588 10.4789 31.5556 9.15937 31.5556 7.54932C31.5556 5.93928 30.8551 4.66239 29.4745 3.65425L29.475 3.65376ZM22.7659 10.4912C22.1455 10.4912 21.5806 10.4152 21.0871 10.2648C20.6031 10.1177 20.1876 9.91089 19.852 9.65055C19.5258 9.39765 19.2713 9.09001 19.096 8.7363C18.9205 8.38233 18.8315 7.9828 18.8315 7.54907C18.8315 7.11535 18.9238 6.74529 19.1057 6.39306C19.2896 6.03687 19.5518 5.72477 19.8847 5.46568C20.2258 5.20064 20.6427 4.98935 21.1236 4.83826C21.6121 4.68468 22.1646 4.60691 22.7659 4.60691C22.8277 4.60691 25.2211 4.6079 25.2818 4.60963C25.7575 4.62325 26.2049 4.69063 26.6136 4.81027C27.0689 4.94353 27.4697 5.1293 27.8014 5.36041C28.6121 5.93631 29.0063 6.65216 29.0063 7.54932C29.0063 7.98329 28.9173 8.38283 28.7418 8.73654C28.566 9.09075 28.3132 9.39889 27.9902 9.65229C27.6588 9.91212 27.2479 10.1185 26.7688 10.2653C26.3538 10.3927 25.8858 10.4667 25.3745 10.4863C25.2835 10.4898 22.8594 10.4915 22.7657 10.4915L22.7659 10.4912Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M45.4608 2.34839V9.11181C45.4608 9.22303 45.3341 9.28842 45.2416 9.22476L35.2484 2.34839H32.645V12.7493H35.1378V5.92516C35.1378 5.83872 35.2362 5.78794 35.3079 5.83748L45.3633 12.7493H47.9533V2.34839H45.4608Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M61.4512 2.34839L56.6946 7.78117L51.9517 2.34839H49.0427V12.749H51.8045V5.95835C51.8045 5.92368 51.8481 5.90782 51.8709 5.93408L56.678 11.4702L61.5105 5.94944C61.5407 5.91501 61.598 5.93606 61.598 5.98164V12.749H64.3597V2.34839H61.4512Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M101.742 7.31079L108.034 2.34839H113L106.281 7.26943L113 12.749H108.409L101.742 7.31079Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M101.742 6.77997V2.34839H98.4377V12.749H101.742V9.64189V6.77997Z"
                        fill="#ED2024"
                      />
                      <path
                        d="M78.547 4.73353C77.2365 4.73353 76.1702 3.67189 76.1702 2.36677C76.1702 1.06164 77.2365 0 78.547 0C79.8574 0 80.9238 1.06164 80.9238 2.36677C80.9238 3.67189 79.8574 4.73353 78.547 4.73353ZM78.547 1.54936C78.0944 1.54936 77.726 1.91595 77.726 2.36677C77.726 2.81758 78.0944 3.18417 78.547 3.18417C78.9996 3.18417 79.3679 2.81758 79.3679 2.36677C79.3679 1.91595 78.9996 1.54936 78.547 1.54936Z"
                        fill="#ED2024"
                      />
                    </svg></button>
                  {/* Toggle sidebar button */}
                  <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none focus:ring">
                    <svg
                      className={`w-4 h-4 text-gray-600 ${isSidebarOpen ? 'transform transition-transform -rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>
            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-slate-300">
              {children}
            </main>
          </aside>

        </div>
      </body>
    </html>
  );
}
