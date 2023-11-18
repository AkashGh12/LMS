import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <>
      <footer className="relative h-[10vh] left-0 bottom-0 w-full py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
        <section className="text-lg">
          Copywrite 2023 | All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a
            href=""
            className="hover:text-blue-400 transition-all ease-in-out duration-300"
          >
            <BsFacebook />
          </a>
          <a
            href=""
            className="hover:text-pink-500 transition-all ease-in-out duration-300"
          >
            <BsInstagram />
          </a>
          <a
            href=""
            className="hover:text-blue-500 transition-all ease-in-out duration-300"
          >
            <BsLinkedin />
          </a>
          <a
            href=""
            className="hover:text-blue-500 transition-all ease-in-out duration-300"
          >
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
}

export default Footer;
