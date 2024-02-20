import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "../components/Search";
import { usePathname } from "next/navigation";
import axios from "axios";
import { API_URL } from "../../../config/constants";

const Header = () => {
  const pathname = usePathname();
  const [value, setValue] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadVisitor();
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5 วินาที

    return () => clearTimeout(timer);// รันเฉพาะครั้งแรกเท่านั้น
  }, []);

  const loadVisitor = async () => {
    await axios
      .get(API_URL + "/visitors")
      .then((res) => {
        //console.log(res.data[0].visitors);
        setVisitors(res.data[0]);

        const value = {
          id: res.data[0]._id,
          visitors: res.data[0].visitors + 1,
        };
        //console.log(value);

        axios
          .post(API_URL + "/change-visitors", value)
          .then((res) => {
            //console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(visitors);
  const toggleValue = () => {
    if (value === true) {
      setValue(false);
    } else {
      setValue(true);
    }
  };
  return (
    <header className="navbar bg-[#ED2024] sticky top-0 z-30 duration-500 w-full">
      <article className="flex-1 ml-5">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-xl w-24 sm:w-36 md:w-56 relative duration-500"
        >
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
      </article>

      <Search />
      <article className="flex-none mr-5">
        <ul className="menu menu-horizontal px-1 max-sm:hidden ">
          <li>
            <Link
              href={"/about#sale"}
              className={`text-xs md:text-sm lg:text-md  hover:text-[#ED2024] hover:bg-white focus:text-[#ED2024] focus:bg-white ${pathname === "/about#sale"
                  ? "text-[#ED2024] bg-white"
                  : "text-white"
                }`}
            >
              ตัวแทนจำหน่าย
            </Link>
          </li>
          <li>
            <Link
              href={"/job"}
              className={`text-xs md:text-sm lg:text-md  hover:text-[#ED2024] hover:bg-white ${pathname === "/job" ? "text-[#ED2024] bg-white" : "text-white"
                }`}
            >
              สมัครงาน
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className={`text-xs md:text-sm lg:text-md  hover:text-[#ED2024] hover:bg-white ${pathname === "/about" ? "text-[#ED2024] bg-white" : "text-white"
                }`}
            >
              เกี่ยวกับเรา
            </Link>
          </li>
        </ul>
        <aside className="dropdown dropdown-end sm:hidden">
          <label tabIndex={0} className="btn btn-ghost px-2 py-1">
            <div className="w-8 rounded-xl">
              <svg
                className="swap-off fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"} >
                ข่าวสาร
              </Link>
            </li>
            <li>
              <Link href={"/saleproducts"} >
                สินค้าลดราคา
              </Link>
            </li>
            <li>
              <Link href={"/newproducts"} >
                สินค้าใหม่
              </Link>
            </li>
            <li>
              <Link href={"/recomproducts"} >
                สินค้าแนะนำ

              </Link>
            </li>
            <li>
              <Link href={"/allproducts"} >
                สินค้าทั้งหมด
              </Link>
            </li>
            <li>
              <Link href={"/about#sale"} >
                ตัวแทนจำหน่าย
              </Link>
            </li>
            <li>
              <Link href={"/job"} >
                สมัครงาน
              </Link>
            </li>
            <li>
              <Link href={"/about"} >
                เกี่ยวกับเรา
              </Link>
            </li>
          </ul>
        </aside>
      </article>
      {isVisible && (
        <section>
          <button
            className="btn btn-circle swap swap-rotatee bg-white z-10 fixed bottom-[15rem] right-10 w-14 h-14 text-red-600 border-red-600 max-sm:hidden"
            onClick={toggleValue}
          >
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" defaultChecked={value} onChange={toggleValue} />

            {/* chat icon */}

            <svg
              id="Capa_1"
              style={{ enableBackground: "new 0 0 58 58" }}
              version="1.1"
              viewBox="0 0 58 58"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="swap-off fill-current"
            >
              <g>
                <path
                  d="M25,9.586C11.193,9.586,0,19.621,0,32c0,4.562,1.524,8.803,4.135,12.343C3.792,48.433,2.805,54.194,0,57c0,0,8.47-1.191,14.273-4.651c0.006-0.004,0.009-0.01,0.014-0.013c1.794-1.106,3.809-2.397,4.302-2.783c0.301-0.417,0.879-0.543,1.328-0.271c0.298,0.181,0.487,0.512,0.488,0.86c0.003,0.582-0.008,0.744-3.651,3.018c2.582,0.81,5.355,1.254,8.245,1.254c13.807,0,25-10.035,25-22.414S38.807,9.586,25,9.586z"
                  style={{ fill: "#0391FD" }}
                />
                <path
                  d="M58,23.414C58,11.035,46.807,1,33,1c-9.97,0-18.575,5.234-22.589,12.804C14.518,11.153,19.553,9.586,25,9.586c13.807,0,25,10.035,25,22.414c0,4.735-1.642,9.124-4.437,12.743C51.162,47.448,58,48.414,58,48.414c-2.805-2.805-3.792-8.566-4.135-12.657C56.476,32.217,58,27.976,58,23.414z"
                  style={{ fill: "#0F71D3" }}
                />
                <path
                  d="M32.5,26h-14c-0.552,0-1-0.447-1-1s0.448-1,1-1h14c-0.552,0-1-0.447-1-1s0.448-1,1-1z"
                  style={{ fill: "#FFFFFF" }}
                />
                <path
                  d="M38,33H13c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c-0.552,0-1-0.447-1-1s0.448-1,1-1z"
                  style={{ fill: "#FFFFFF" }}
                />
                <path
                  d="M38,40H13c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c-0.552,0-1-0.447-1-1s0.448-1,1-1z"
                  style={{ fill: "#FFFFFF" }}
                />
              </g>
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </button>
          <Link
            href={"https://page.line.me/donmark"}
            target="_black"
            className=" duration-500"
          >
            <Image
              src={`/images/line2.png`}
              alt="line"
              width={100}
              height={100}
              className={` ${value === true
                  ? "rounded-full shadow-lg flex items-center justify-center fixed bottom-[20rem] right-10 w-14 h-14 z-10 object-center text-white align-middle bg-red-600 hover:scale-105 duration-500 object-fill"
                  : "rounded-full shadow-lg flex items-center justify-center fixed bottom-[20rem] right-[1.5rem] w-14 h-14 z-10 object-center text-white align-middle bg-red-600 hover:scale-105 duration-500 translate-x-80 object-fill"
                }   
              
              `}
              loading= "lazy"
            />
          </Link>
        </section>
      )}
    </header>
  );
};

export default Header;
