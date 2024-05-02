import React from 'react'
import { useSwiper } from "swiper/react";
import { ChevronLeftIcon,ChevronRightIcon } from "@heroicons/react/20/solid";

const ButtonSlide = () => {
    const swiper = useSwiper()
    return (
        <main className='flex items-center justify-between gap-8'>
            <button
                onClick={() => swiper.slidePrev()}
                className="inline-block border border-red-600 bg-red-600 p-3 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring focus:ring-red-500 active:text-red-500 rotate-45"
            >
                <span className="sr-only"> slidePrev </span>

                <ChevronLeftIcon className="h-6 w-6 -rotate-45" />
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="inline-block border border-red-600 bg-red-600 p-3 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring focus:ring-red-500 active:text-red-500 rotate-45"
            >
                <span className="sr-only"> slideNext </span>

                <ChevronRightIcon className="h-6 w-6 -rotate-45" />
            </button></main>
    )
}

export default ButtonSlide